import RoleView from 'auth/RoleView'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import { permitMeAndThoseAbove } from 'global-utils'
import React from 'react'
import { Container } from 'react-bootstrap'
import BacentaArrivals from './BacentaArrivals'
import ConstituencyArrivals from './ConstituencyArrivals'

const Arrivals = () => {
  return (
    <Container>
      <HeadingPrimary>Arrivals</HeadingPrimary>
      {/* This Page will require a redesign. Possibly by Basoah */}
      <div>
        The Arrivals Feature is still being worked on. Will update soon!
      </div>
      <RoleView roles={['adminConstituency', 'adminConstituencyArrivals']}>
        <ConstituencyArrivals />
      </RoleView>
      <RoleView roles={permitMeAndThoseAbove('Bacenta')}>
        <BacentaArrivals />
      </RoleView>
    </Container>
  )
}

export default Arrivals
