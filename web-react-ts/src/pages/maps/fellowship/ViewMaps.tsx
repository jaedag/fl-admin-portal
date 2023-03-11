import { useLazyQuery } from '@apollo/client'
import { MEMBER_MEMBER_SEARCH } from 'components/formik/SearchMemberQueries'
import MapComponent from '../components/MapComponent'
import {
  MEMBER_PLACES_SEARCH_BY_LOCATION,
  MEMBER_PLACES_SEARCH_BY_NAME,
} from './GeoQueries'

const ViewMaps = () => {
  const [memberSearch] = useLazyQuery(MEMBER_MEMBER_SEARCH)
  const [
    placesSearchByLocation,
    { loading: locationLoading, error: locationError },
  ] = useLazyQuery(MEMBER_PLACES_SEARCH_BY_LOCATION)
  const [placesSearchByName, { loading: nameLoading, error: nameError }] =
    useLazyQuery(MEMBER_PLACES_SEARCH_BY_NAME)

  const loading = locationLoading || nameLoading
  const error = locationError || nameError

  return (
    <MapComponent
      memberSearch={memberSearch}
      placesSearchByLocation={placesSearchByLocation}
      placesSearchByName={placesSearchByName}
      loading={loading}
      error={error}
    />
  )
}

export default ViewMaps
