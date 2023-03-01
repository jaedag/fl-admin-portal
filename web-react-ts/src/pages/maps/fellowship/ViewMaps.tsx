import { useLazyQuery } from '@apollo/client'
import { MEMBER_MEMBER_SEARCH } from 'components/formik/SearchMemberQueries'
import React from 'react'
import MapComponent from '../components/MapComponent'
import { MEMBER_PLACES_SEARCH } from './FellowshipGeoQueries'

const FellowshipMapsLandingPage = () => {
  const [memberSearch] = useLazyQuery(MEMBER_MEMBER_SEARCH)
  const [placesSearch] = useLazyQuery(MEMBER_PLACES_SEARCH)

  return (
    <MapComponent memberSearch={memberSearch} placesSearch={placesSearch} />
  )
}

export default FellowshipMapsLandingPage
