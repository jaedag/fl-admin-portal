import { useContext, useEffect, useState } from 'react'
import Autosuggest from 'react-autosuggest'
import { FormikComponentProps } from '../../../components/formik/formik-types'
import 'components/formik/Formik.css'
import 'components/formik/react-autosuggest.css'
import usePlacesAutocomplete from 'use-places-autocomplete'
import { LazyQueryExecFunction, OperationVariables } from '@apollo/client'
import { MemberContext } from 'contexts/MemberContext'

interface ComboBoxProps extends FormikComponentProps {
  initialValue: string
  setOffice: (position: google.maps.LatLngLiteral) => void
  memberSearch: LazyQueryExecFunction<any, OperationVariables>
  fellowshipSearch?: LazyQueryExecFunction<any, OperationVariables>
}

const GooglePlacesCombobox = (props: ComboBoxProps) => {
  const { label, name, placeholder, initialValue } = props
  const { currentUser } = useContext(MemberContext)

  const {
    ready,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete()

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

    setSuggestions([...memberResults.data.members[0].memberSearch])

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
    searchFunctions()
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
            !ready && clearSuggestions()

            setSearchString(newValue)
            setValue(newValue)
          },
        }}
        suggestions={suggestions}
        onSuggestionsFetchRequested={async ({ value }: any) => {
          if (!status) {
            clearSuggestions()
          }

          try {
            setSuggestions([
              ...suggestions,
              ...data.map(
                (
                  suggestion: { description: any; place_id: any },
                  index: number
                ) => {
                  if (index > 6) return null
                  return {
                    description: suggestion.description,
                    place_id: suggestion.place_id,
                    name: suggestion.description,
                  }
                }
              ),
            ])
            console.log(suggestions)
          } catch {
            clearSuggestions()
          }
        }}
        onSuggestionsClearRequested={clearSuggestions}
        onSuggestionSelected={(event, { suggestion, method }: any) => {
          if (method === 'enter') {
            event.preventDefault()
          }
          setSearchString(suggestion.description)
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

export default GooglePlacesCombobox
