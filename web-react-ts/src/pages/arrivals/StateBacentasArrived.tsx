import { useLazyQuery } from '@apollo/client'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import MemberDisplayCard from 'components/card/MemberDisplayCard'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import { ChurchContext } from 'contexts/ChurchContext'
import { LONG_POLL_INTERVAL } from 'global-utils'
import useChurchLevel from 'hooks/useChurchLevel'
import PlaceholderDefaulterList from 'pages/services/defaulters/PlaceholderDefaulterList'
import React, { useContext } from 'react'
import { Container } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import PullToRefresh from 'react-simple-pull-to-refresh'
import { ArrivalsUseChurchType } from './arrivals-types'
import {
  CONSTITUENCY_BACENTAS_ARRIVED,
  COUNCIL_BACENTAS_ARRIVED,
  GATHERINGSERVICES_BACENTAS_ARRIVED,
  STREAM_BACENTAS_ARRIVED,
} from './bussingStatusQueries'
import NoData from './CompNoData'

const BacentasHaveArrived = () => {
  const navigate = useNavigate()
  const { clickCard } = useContext(ChurchContext)
  const [constituencyBacentasArrived, { refetch: constituencyRefetch }] =
    useLazyQuery(CONSTITUENCY_BACENTAS_ARRIVED, {
      pollInterval: LONG_POLL_INTERVAL,
    })
  const [councilBacentasArrived, { refetch: councilRefetch }] = useLazyQuery(
    COUNCIL_BACENTAS_ARRIVED,
    {
      pollInterval: LONG_POLL_INTERVAL,
    }
  )
  const [streamBacentasArrived, { refetch: streamRefetch }] = useLazyQuery(
    STREAM_BACENTAS_ARRIVED,
    {
      pollInterval: LONG_POLL_INTERVAL,
    }
  )
  const [
    gatheringServiceBacentasArrived,
    { refetch: gatheringServiceRefetch },
  ] = useLazyQuery(GATHERINGSERVICES_BACENTAS_ARRIVED)

  const data: ArrivalsUseChurchType = useChurchLevel({
    constituencyFunction: constituencyBacentasArrived,
    constituencyRefetch,
    councilFunction: councilBacentasArrived,
    councilRefetch,
    streamFunction: streamBacentasArrived,
    streamRefetch,
    gatheringServiceFunction: gatheringServiceBacentasArrived,
    gatheringServiceRefetch,
  })
  const { church, loading, error, refetch } = data

  return (
    <PullToRefresh onRefresh={refetch}>
      <ApolloWrapper data={church} loading={loading} error={error} placeholder>
        <Container>
          <HeadingPrimary loading={loading}>
            Bacentas That Have Arrived
          </HeadingPrimary>
          <HeadingSecondary loading={!church?.name}>
            {church?.name} Constituency
          </HeadingSecondary>

          {church && !church?.bacentasHaveArrived.length && (
            <NoData text="No Bacentas Have Arrived at the Centre" />
          )}

          {church?.bacentasHaveArrived?.map((bacenta, i: number) => {
            return (
              <MemberDisplayCard
                key={i}
                member={bacenta}
                leader={bacenta.leader}
                contact
                onClick={() => {
                  clickCard(bacenta)
                  clickCard(bacenta.bussingThisWeek[0])
                  navigate('/bacenta/bussing-details')
                }}
              >
                <span className="fw-bold">
                  Attendance: {bacenta.bussingThisWeek[0].attendance}
                </span>
              </MemberDisplayCard>
            )
          })}

          {!church?.bacentasHaveArrived.length && loading && (
            <PlaceholderDefaulterList />
          )}
        </Container>
      </ApolloWrapper>
    </PullToRefresh>
  )
}

export default BacentasHaveArrived
