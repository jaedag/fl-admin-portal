import { useLazyQuery } from '@apollo/client'
import { MemberContext } from 'contexts/MemberContext'
import { ErrorMessage } from 'formik'
import { DEBOUNCE_TIMER, isAuthorised, throwToSentry } from 'global-utils'
import { permitMe } from 'permission-utils'
import React, { useContext, useEffect, useState } from 'react'
import Autosuggest from 'react-autosuggest'
import './react-autosuggest.css'
import { RoleBasedSearch } from './formik-types'
import { initialise } from './search-utils'
import {
  COUNCIL_FELLOWSHIP_SEARCH,
  GATHERINGSERVICE_FELLOWSHIP_SEARCH,
  STREAM_FELLOWSHIP_SEARCH,
  CONSTITUENCY_FELLOWSHIP_SEARCH,
  BACENTA_FELLOWSHIP_SEARCH,
  MEMBER_FELLOWSHIP_SEARCH,
} from './SearchFellowshipQueries'
import TextError from './TextError/TextError'

const SearchFellowship = (props: RoleBasedSearch) => {
  const { currentUser } = useContext(MemberContext)
  const [suggestions, setSuggestions] = useState([])
  const [searchString, setSearchString] = useState(props.initialValue ?? '')

  const [gatheringServiceSearch, { error: gatheringServiceError }] =
    useLazyQuery(GATHERINGSERVICE_FELLOWSHIP_SEARCH, {
      onCompleted: (data) => {
        setSuggestions(data.gatheringServices[0].fellowshipSearch)
        return
      },
    })
  const [streamSearch, { error: streamError }] = useLazyQuery(
    STREAM_FELLOWSHIP_SEARCH,
    {
      onCompleted: (data) => {
        setSuggestions(data.streams[0].fellowshipSearch)
        return
      },
    }
  )
  const [councilSearch, { error: councilError }] = useLazyQuery(
    COUNCIL_FELLOWSHIP_SEARCH,
    {
      onCompleted: (data) => {
        setSuggestions(data.councils[0].fellowshipSearch)
        return
      },
    }
  )

  const [constituencySearch, { error: constituencyError }] = useLazyQuery(
    CONSTITUENCY_FELLOWSHIP_SEARCH,
    {
      onCompleted: (data) => {
        setSuggestions(data.constituencies[0].fellowshipSearch)
        return
      },
    }
  )
  const [bacentaSearch, { error: bacentaError }] = useLazyQuery(
    BACENTA_FELLOWSHIP_SEARCH,
    {
      onCompleted: (data) => {
        setSuggestions(data.bacentas[0].fellowshipSearch)
        return
      },
    }
  )

  const [memberSearch, { error: memberError }] = useLazyQuery(
    MEMBER_FELLOWSHIP_SEARCH,
    {
      onCompleted: (data) => {
        setSuggestions(data.members[0].fellowshipSearch)
        return
      },
    }
  )

  const error =
    gatheringServiceError ||
    streamError ||
    councilError ||
    constituencyError ||
    bacentaError ||
    memberError
  throwToSentry('', error)

  const whichSearch = (searchString: string) => {
    memberSearch({
      variables: {
        id: currentUser.id,
        key: searchString?.trim(),
      },
    })
    if (props.roleBased) {
      if (isAuthorised(permitMe('GatheringService'), currentUser.roles)) {
        gatheringServiceSearch({
          variables: {
            id: currentUser.gatheringService,
            key: searchString?.trim(),
          },
        })
      } else if (isAuthorised(permitMe('Stream'), currentUser.roles)) {
        streamSearch({
          variables: {
            id: currentUser.stream,
            key: searchString?.trim(),
          },
        })
      } else if (isAuthorised(permitMe('Council'), currentUser.roles)) {
        councilSearch({
          variables: {
            id: currentUser.council,
            key: searchString?.trim(),
          },
        })
      } else if (isAuthorised(permitMe('Constituency'), currentUser.roles)) {
        constituencySearch({
          variables: {
            id: currentUser.constituency,
            key: searchString?.trim(),
          },
        })
      } else if (isAuthorised(permitMe('Bacenta'), currentUser.roles)) {
        bacentaSearch({
          variables: {
            id: currentUser.bacenta,
            key: searchString?.trim(),
          },
        })
      }
    }
  }

  useEffect(() => {
    setSearchString(initialise(searchString, props.initialValue))
  }, [props.initialValue])

  useEffect(() => {
    const timerId = setTimeout(() => {
      whichSearch(searchString)
    }, DEBOUNCE_TIMER)

    return () => {
      clearTimeout(timerId)
    }
  }, [searchString])

  return (
    <div>
      {props.label ? <label className="label">{props.label}</label> : null}
      {/*// @ts-ignore*/}
      <Autosuggest
        inputProps={{
          placeholder: props.placeholder,
          id: name,
          autoComplete: 'off',
          value: searchString,
          name: name,
          className: 'form-control',
          onChange: (_event, { newValue }) => {
            setSearchString(newValue)
          },
        }}
        suggestions={suggestions}
        onSuggestionsFetchRequested={async ({ value }) => {
          if (!value) {
            setSuggestions([])
          }
        }}
        onSuggestionsClearRequested={() => {
          setSuggestions([])
        }}
        onSuggestionSelected={(event, { suggestion, method }) => {
          if (method === 'enter') {
            event.preventDefault()
          }
          setSearchString(suggestion.name)

          props.setFieldValue(`${props.name}`, suggestion)
        }}
        getSuggestionValue={(suggestion: any) => suggestion.name}
        highlightFirstSuggestion={true}
        renderSuggestion={(suggestion) => (
          <div className="combobox-control">{suggestion.name}</div>
        )}
      />

      {props.error && <TextError>{props.error}</TextError>}
      {/*// @ts-ignore*/}
      {!props.error ?? <ErrorMessage name={name} component={TextError} />}
    </div>
  )
}

export default SearchFellowship
