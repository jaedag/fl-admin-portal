import { useEffect, useState } from 'react'
import Autosuggest from 'react-autosuggest'
import { FormikComponentProps } from '../../../components/formik/formik-types'
import 'components/formik/Formik.css'
import 'components/formik/react-autosuggest.css'
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete'

interface ComboBoxProps extends FormikComponentProps {
  initialValue: string
  setOffice: (position: google.maps.LatLngLiteral) => void
  handleClose: () => void
}

const GooglePlacesCombobox = (props: ComboBoxProps) => {
  const { label, name, placeholder, initialValue, handleClose } = props

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

  useEffect(() => {}, [searchString])

  const handleSelect = async (val: string) => {
    setValue(val, false)
    clearSuggestions()

    const results = await getGeocode({ address: val })
    const { lat, lng } = await getLatLng(results[0])
    props.setOffice({ lat, lng })
  }

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

          const places = data.map(
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
          )
          try {
            setSuggestions(places)
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
          handleSelect(suggestion.description)
          handleClose()
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
          return <div className="combobox-control">{suggestion.name}</div>
        }}
      />
    </div>
  )
}

export default GooglePlacesCombobox
