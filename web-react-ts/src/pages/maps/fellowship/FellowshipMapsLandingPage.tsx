import { useLazyQuery } from '@apollo/client'
import { MEMBER_MEMBER_SEARCH } from 'components/formik/SearchMemberQueries'
import React from 'react'
import MapComponent from '../components/MapComponent'

const FellowshipMapsLandingPage = () => {
  const [memberSearch] = useLazyQuery(MEMBER_MEMBER_SEARCH)

  return <MapComponent memberSearch={memberSearch} />
}

export default FellowshipMapsLandingPage
