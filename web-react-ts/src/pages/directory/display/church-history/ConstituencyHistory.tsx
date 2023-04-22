import { useQuery } from '@apollo/client'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import Timeline from 'components/Timeline/Timeline'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { ChurchContext } from 'contexts/ChurchContext'
import { CONSTITUENCY_HISTORY } from 'pages/directory/display/ReadQueries'
import React, { useContext } from 'react'
import { Container } from 'react-bootstrap'

function ConstituencyHistory() {
  const { constituencyId } = useContext(ChurchContext)
  const { data, error, loading } = useQuery(CONSTITUENCY_HISTORY, {
    variables: { id: constituencyId },
  })
  const constituency = data?.constituencies[0]

  return (
    <ApolloWrapper loading={loading} error={error} data={data}>
      <>
        <div className="text-center mb-5">
          <HeadingPrimary>{`${constituency?.name} ${constituency?.__typename}`}</HeadingPrimary>
          <HeadingSecondary>Constituency History</HeadingSecondary>
        </div>
        <Container>
          <Timeline record={constituency?.history} limit={10} />
        </Container>
      </>
    </ApolloWrapper>
  )
}

export default ConstituencyHistory
