import { useQuery } from '@apollo/client'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import Timeline from 'components/Timeline/Timeline'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { ChurchContext } from 'contexts/ChurchContext'
import React, { useContext } from 'react'
import { Container } from 'react-bootstrap'
import { TEAM_HISTORY } from './HistoryQueries'

function TeamHistory() {
  const { teamId } = useContext(ChurchContext)
  const { data, error, loading } = useQuery(TEAM_HISTORY, {
    variables: { id: teamId },
  })
  const team = data?.teams[0]

  return (
    <ApolloWrapper loading={loading} error={error} data={data}>
      <>
        <div className="text-center mb-5">
          <HeadingPrimary>{`${team?.name} ${team?.__typename}`}</HeadingPrimary>
          <HeadingSecondary>Team History</HeadingSecondary>
        </div>
        <Container>
          <Timeline record={team?.history} limit={100} />
        </Container>
      </>
    </ApolloWrapper>
  )
}

export default TeamHistory
