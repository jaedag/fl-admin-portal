import { useMutation, useQuery } from '@apollo/client'
import React, { useContext } from 'react'
import { Container } from 'react-bootstrap'
import {
  SET_FELLOWSHIP_TO_HUB_FELLOWSHIP,
  SET_HUB_FELLOWSHIP_TO_REGULAR_FELLOWSHIP,
} from '../update/StatusChanges'
import { ChurchContext } from 'contexts/ChurchContext'
import { DISPLAY_FELLOWSHIP } from '../display/ReadQueries'
import { useNavigate } from 'react-router'
import ApolloWrapper from 'components/base-component/ApolloWrapper'

const MakeHubFellowship = () => {
  const { clickCard, fellowshipId } = useContext(ChurchContext)
  const { data, loading, error } = useQuery(DISPLAY_FELLOWSHIP, {
    variables: { id: fellowshipId },
  })

  const [MakeHubFellowship] = useMutation(SET_FELLOWSHIP_TO_HUB_FELLOWSHIP)
  const [RemoveHubFellowship] = useMutation(
    SET_HUB_FELLOWSHIP_TO_REGULAR_FELLOWSHIP
  )

  const navigate = useNavigate()
  const fellowship = data?.fellowships[0]

  return (
    <ApolloWrapper data={data} loading={loading} error={error}>
      <Container>{`${fellowship?.name} ${fellowship?.__typename}`}</Container>
    </ApolloWrapper>
  )
}

export default MakeHubFellowship
