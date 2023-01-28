import { useEffect, useState } from 'react'
import Autosuggest from 'react-autosuggest'
import { FormikComponentProps } from '../../../components/formik/formik-types'
import 'components/formik/Formik.css'
import 'components/formik/react-autosuggest.css'
import usePlacesAutocomplete from 'use-places-autocomplete'

interface ComboBoxProps extends FormikComponentProps {
  initialValue: string
}

const GooglePlacesCombobox = (props: ComboBoxProps) => {
  const { label, name, placeholder, initialValue } = props

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
            setSuggestions(
              data.map((suggestion, index) => {
                if (index > 6) return null
                return {
                  description: suggestion.description,
                  place_id: suggestion.place_id,
                  name: suggestion.description,
                }
              })
            )
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
        getSuggestionValue={(suggestion: { name: string }) => suggestion.name}
        highlightFirstSuggestion={true}
        renderSuggestion={(suggestion) => (
          <div className="combobox-control">{suggestion.name}</div>
        )}
      />
    </div>
  )
}

export default GooglePlacesCombobox
