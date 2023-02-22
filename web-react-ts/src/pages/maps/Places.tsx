import { LazyQueryExecFunction, OperationVariables } from '@apollo/client'
import GooglePlacesCombobox from './components/GooglePlacesCombobox'

type PlacesProps = {
  setOffice: (position: google.maps.LatLngLiteral) => void
  memberSearch: LazyQueryExecFunction<any, OperationVariables>
  fellowshipSearch?: LazyQueryExecFunction<any, OperationVariables>
}

const Places = ({ setOffice, memberSearch, fellowshipSearch }: PlacesProps) => {
  return (
    <GooglePlacesCombobox
      placeholder="Search an address"
      initialValue=""
      name="google-places-search"
      setOffice={setOffice}
      memberSearch={memberSearch}
      fellowshipSearch={fellowshipSearch}
    />
  )
}

export default Places
