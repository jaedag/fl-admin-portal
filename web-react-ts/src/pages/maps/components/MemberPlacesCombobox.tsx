import { useContext, useEffect, useState } from 'react'
import Autosuggest from 'react-autosuggest'
import { FormikComponentProps } from '../../../components/formik/formik-types'
import 'components/formik/Formik.css'
import 'components/formik/react-autosuggest.css'
import { LazyQueryExecFunction, OperationVariables } from '@apollo/client'
import { MemberContext } from 'contexts/MemberContext'
import { DEBOUNCE_TIMER } from 'global-utils'

interface ComboBoxProps extends FormikComponentProps {
  initialValue: string
  setOffice: (position: google.maps.LatLngLiteral) => void
  memberSearch: LazyQueryExecFunction<any, OperationVariables>
  fellowshipSearch?: LazyQueryExecFunction<any, OperationVariables>
  handleClose: () => void
}

const MemberPlacesCombobox = (props: ComboBoxProps) => {
  const { label, name, placeholder, initialValue, handleClose } = props
  const { currentUser } = useContext(MemberContext)

  const [searchString, setSearchString] = useState(initialValue ?? '')
  const [suggestions, setSuggestions] = useState<any[]>([])

  // TODO: Suggestions are generated after the first keystroke.  This is not ideal.
  // They should be generated before the first keystroke.

  const searchFunctions = async () => {
    const memberResults = await props.memberSearch({
      variables: {
        id: currentUser.id,
        key: searchString.trim(),
      },
    })

    if (memberResults.data.members[0].memberSearch.length === 0) {
      return
    }

    setSuggestions(memberResults.data.members[0].memberSearch)

    if (props.fellowshipSearch) {
      props.fellowshipSearch({
        variables: {
          id: currentUser.id,
          key: searchString.trim(),
        },
      })
    }
  }

  useEffect(() => {
    const timerId = setTimeout(() => {
      searchFunctions()
    }, DEBOUNCE_TIMER)

    return () => {
      clearTimeout(timerId)
    }
  }, [searchString])

  return (
    <div>
      {label ? (
        <label className="label" htmlFor={name}>
          {label}
        </label>
      ) : null}
      <Autosuggest
        inputProps={{
          placeholder: placeholder,
          id: name,
          autoComplete: 'off',
          value: searchString,
          name: name,
          className: 'form-control',
          onChange: (_event: any, { newValue }: any) => {
            setSearchString(newValue)
          },
        }}
        suggestions={suggestions}
        onSuggestionsFetchRequested={async ({ value }: any) => {
          try {
          } catch {
            setSuggestions([])
          }
        }}
        onSuggestionsClearRequested={() => {
          setSuggestions([])
        }}
        onSuggestionSelected={(event, { suggestion, method }: any) => {
          if (method === 'enter') {
            event.preventDefault()
          }

          handleClose()
          const location: google.maps.LatLngLiteral = {
            lat: parseFloat(suggestion.location.latitude),
            lng: parseFloat(suggestion.location.longitude),
          }
          props.setOffice(location)
          setSearchString(suggestion.firstName + ' ' + suggestion.lastName)
        }}
        getSuggestionValue={(suggestion: any) => {
          if (suggestion.name) {
            return suggestion.name
          }

          if (suggestion.firstName) {
            return suggestion.firstName + ' ' + suggestion.lastName
          }

          if (suggestion) return
        }}
        highlightFirstSuggestion={true}
        renderSuggestion={(suggestion: any) => {
          if (suggestion.name) {
            return <div className="combobox-control">{suggestion.name}</div>
          }

          if (suggestion.firstName) {
            return (
              <div className="combobox-control">
                {suggestion.firstName + ' ' + suggestion.lastName}
              </div>
            )
          }
          return null
        }}
      />
    </div>
  )
}

export default MemberPlacesCombobox
