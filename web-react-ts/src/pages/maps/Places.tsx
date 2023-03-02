import { LazyQueryExecFunction, OperationVariables } from '@apollo/client'
import GooglePlacesCombobox from './components/GooglePlacesCombobox'
import MemberPlacesCombobox from './components/MemberPlacesCombobox'

type GooglePlacesProps = {
  setOffice: (position: google.maps.LatLngLiteral) => void
  handleClose: () => void
}

type MemberPlacesProps = {
  handleClose: () => void
  setOffice: (position: google.maps.LatLngLiteral) => void
  memberSearch: LazyQueryExecFunction<any, OperationVariables>
  placesSearchByLocation: LazyQueryExecFunction<any, OperationVariables>
  placesSearchByName: LazyQueryExecFunction<any, OperationVariables>
}

export const GooglePlaces = ({ setOffice, handleClose }: GooglePlacesProps) => {
  return (
    <GooglePlacesCombobox
      placeholder="Search an address"
      initialValue=""
      name="google-places-search"
      setOffice={setOffice}
      handleClose={handleClose}
    />
  )
}

export const MemberPlaces = ({
  setOffice,
  memberSearch,
  placesSearchByLocation,
  placesSearchByName,
  handleClose,
}: MemberPlacesProps) => {
  return (
    <MemberPlacesCombobox
      placeholder="Search an address"
      name="member-places-search"
      initialValue=""
      setOffice={setOffice}
      memberSearch={memberSearch}
      placesSearchByName={placesSearchByName}
      handleClose={handleClose}
    />
  )
}
