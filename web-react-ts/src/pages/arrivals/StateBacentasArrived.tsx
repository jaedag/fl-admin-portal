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
  const [constituencyBacentasArrived] = useLazyQuery(
    CONSTITUENCY_BACENTAS_ARRIVED
  )
  const [councilBacentasArrived] = useLazyQuery(COUNCIL_BACENTAS_ARRIVED)
  const [streamBacentasArrived] = useLazyQuery(STREAM_BACENTAS_ARRIVED)
  const [gatheringServiceBacentasArrived] = useLazyQuery(
    GATHERINGSERVICES_BACENTAS_ARRIVED
  )

  const data: ArrivalsUseChurchType = useChurchLevel({
    constituencyFunction: constituencyBacentasArrived,
    councilFunction: councilBacentasArrived,
    streamFunction: streamBacentasArrived,
    gatheringServiceFunction: gatheringServiceBacentasArrived,
  })
  const { church, loading, error } = data

  return (
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
                clickCard(bacenta.bussing[0])
                navigate('/bacenta/bussing-details')
              }}
            />
          )
        })}

        {!church?.bacentasHaveArrived.length && loading && (
          <PlaceholderDefaulterList />
        )}
      </Container>
    </ApolloWrapper>
  )
}

export default BacentasHaveArrived
