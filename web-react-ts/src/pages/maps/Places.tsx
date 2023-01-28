import GooglePlacesCombobox from './components/GooglePlacesCombobox'

type PlacesProps = {
  setOffice: (position: google.maps.LatLngLiteral) => void
}

const Places = ({ setOffice }: PlacesProps) => {
  return (
    <GooglePlacesCombobox
      placeholder="Search an address"
      initialValue=""
      name="google-places-search"
    />
  )
}

export default Places
