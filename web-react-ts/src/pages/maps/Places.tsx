import { LazyQueryExecFunction, OperationVariables } from '@apollo/client'
import GooglePlacesCombobox from './components/GooglePlacesCombobox'
import MemberPlacesCombobox from './components/MemberPlacesCombobox'

type GooglePlacesProps = {
  setOffice: (position: google.maps.LatLngLiteral) => void
}

type MemberPlacesProps = {
  setOffice: (position: google.maps.LatLngLiteral) => void
  memberSearch: LazyQueryExecFunction<any, OperationVariables>
  fellowshipSearch?: LazyQueryExecFunction<any, OperationVariables>
}

export const GooglePlaces = ({ setOffice }: GooglePlacesProps) => {
  return (
    <GooglePlacesCombobox
      placeholder="Search an address"
      initialValue=""
      name="google-places-search"
      setOffice={setOffice}
    />
  )
}

export const MemberPlaces = ({
  setOffice,
  memberSearch,
  fellowshipSearch,
}: MemberPlacesProps) => {
  return (
    <MemberPlacesCombobox
      placeholder="Search an address"
      name="member-places-search"
      initialValue=""
      setOffice={setOffice}
      memberSearch={memberSearch}
      fellowshipSearch={fellowshipSearch}
    />
  )
}
