import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import React from 'react'
import { Container } from 'react-bootstrap'

import ChurchList from 'pages/services/ChurchList'
import HeadingSecondary from 'components/HeadingSecondary'

const Maps = () => {
  return (
    <Container>
      <HeadingPrimary>Maps</HeadingPrimary>
      <HeadingSecondary>Click on one of churches below</HeadingSecondary>
      <div className="py-3" />
      <ChurchList color="maps" />
    </Container>
  )
}

export default Maps
