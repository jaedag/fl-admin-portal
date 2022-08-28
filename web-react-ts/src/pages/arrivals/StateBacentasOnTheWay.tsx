import { useLazyQuery } from '@apollo/client'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import MemberDisplayCard from 'components/card/MemberDisplayCard'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import { ChurchContext } from 'contexts/ChurchContext'
import useChurchLevel from 'hooks/useChurchLevel'
import PlaceholderDefaulterList from 'pages/services/defaulters/PlaceholderDefaulterList'
import React, { useContext } from 'react'
import { Container } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import PullToRefresh from 'react-simple-pull-to-refresh'
import { ArrivalsUseChurchType } from './arrivals-types'
import {
  CONSTITUENCY_BACENTAS_ON_THE_WAY,
  COUNCIL_BACENTAS_ON_THE_WAY,
  GATHERINGSERVICE_BACENTAS_ON_THE_WAY,
  STREAM_BACENTAS_ON_THE_WAY,
} from './bussingStatusQueries'
import NoData from './CompNoData'

const BacentasOnTheWay = () => {
  const { clickCard } = useContext(ChurchContext)
  const navigate = useNavigate()
  const [constituencyOnTheWay, { refetch: constituencyRefetch }] = useLazyQuery(
    CONSTITUENCY_BACENTAS_ON_THE_WAY
  )
  const [councilOnTheWay, { refetch: councilRefetch }] = useLazyQuery(
    COUNCIL_BACENTAS_ON_THE_WAY
  )
  const [streamOnTheWay, { refetch: streamRefetch }] = useLazyQuery(
    STREAM_BACENTAS_ON_THE_WAY
  )
  const [gatheringServiceOnTheWay, { refetch: gatheringServiceRefetch }] =
    useLazyQuery(GATHERINGSERVICE_BACENTAS_ON_THE_WAY)

  const data: ArrivalsUseChurchType = useChurchLevel({
    constituencyFunction: constituencyOnTheWay,
    constituencyRefetch,
    councilFunction: councilOnTheWay,
    councilRefetch,
    streamFunction: streamOnTheWay,
    streamRefetch,
    gatheringServiceFunction: gatheringServiceOnTheWay,
    gatheringServiceRefetch,
  })
  const { church, loading, error, refetch } = data

  return (
    <PullToRefresh onRefresh={refetch}>
      <ApolloWrapper data={church} loading={loading} error={error} placeholder>
        <Container>
          <HeadingPrimary loading={loading}>Bacentas On The Way</HeadingPrimary>
          <HeadingSecondary loading={!church?.name}>
            {church?.name} {church?.__typename}
          </HeadingSecondary>

          {church && !church?.bacentasOnTheWay.length && (
            <NoData text="There are no bacentas on the way" />
          )}

          {church?.bacentasOnTheWay?.map((bacenta, i) => (
            <MemberDisplayCard
              key={i}
              member={bacenta}
              leader={bacenta.leader}
              contact
              onClick={() => {
                clickCard(bacenta)
                clickCard(bacenta.bussing[0])
                navigate('/bacenta/bussing-details')
              }}
            />
          ))}

          {!church?.bacentasOnTheWay.length && loading && (
            <PlaceholderDefaulterList />
          )}
        </Container>
      </ApolloWrapper>
    </PullToRefresh>
  )
}

export default BacentasOnTheWay
