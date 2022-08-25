import { useLazyQuery } from '@apollo/client'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import MemberDisplayCard from 'components/card/MemberDisplayCard'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import { useContext } from 'react'
import { Container } from 'react-bootstrap'
import {
  CONSTITUENCY_BACENTAS_BELOW_8,
  COUNCIL_BACENTAS_BELOW_8,
  GATHERINGSERVICE_BACENTAS_BELOW_8,
  STREAM_BACENTAS_BELOW_8,
} from './bussingStatusQueries'
import useChurchLevel from '../../hooks/useChurchLevel'
import NoData from './CompNoData'
import PlaceholderDefaulterList from 'pages/services/defaulters/PlaceholderDefaulterList'
import { useNavigate } from 'react-router'
import { ChurchContext } from 'contexts/ChurchContext'
import { ArrivalsUseChurchType } from './arrivals-types'
import PullToRefresh from 'react-simple-pull-to-refresh'

const BacentasBelow8 = () => {
  const { clickCard } = useContext(ChurchContext)
  const navigate = useNavigate()
  const [constituencyBacentasBelow8, { refetch: constituencyRefetch }] =
    useLazyQuery(CONSTITUENCY_BACENTAS_BELOW_8)
  const [councilBacentasBelow8, { refetch: councilRefetch }] = useLazyQuery(
    COUNCIL_BACENTAS_BELOW_8
  )
  const [streamBacentasBelow8, { refetch: streamRefetch }] = useLazyQuery(
    STREAM_BACENTAS_BELOW_8
  )
  const [gatheringServiceBacentasBelow8, { refetch: gatheringServiceRefetch }] =
    useLazyQuery(GATHERINGSERVICE_BACENTAS_BELOW_8)

  const data: ArrivalsUseChurchType = useChurchLevel({
    constituencyFunction: constituencyBacentasBelow8,
    constituencyRefetch,
    councilFunction: councilBacentasBelow8,
    councilRefetch,
    streamFunction: streamBacentasBelow8,
    streamRefetch,
    gatheringServiceFunction: gatheringServiceBacentasBelow8,
    gatheringServiceRefetch,
  })
  const { church, loading, error, refetch } = data

  return (
    <PullToRefresh onRefresh={refetch}>
      <ApolloWrapper data={church} loading={loading} error={error} placeholder>
        <Container>
          <HeadingPrimary loading={loading}>Bacentas Below 8</HeadingPrimary>
          <HeadingSecondary loading={!church?.name}>
            {church?.name} {church?.__typename}
          </HeadingSecondary>

          {church && !church?.bacentasBelow8.length && (
            <NoData text="There are no bacentas that didn't bus" />
          )}

          {church?.bacentasBelow8.map((bacenta, i: number) => (
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

          {!church?.bacentasBelow8.length && loading && (
            <PlaceholderDefaulterList />
          )}
        </Container>
      </ApolloWrapper>
    </PullToRefresh>
  )
}

export default BacentasBelow8
