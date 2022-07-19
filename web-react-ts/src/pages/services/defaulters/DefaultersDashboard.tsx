import { useLazyQuery } from '@apollo/client'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import { plural } from 'global-utils'
import React, { useContext } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import {
  CONSTITUENCY_DEFAULTERS,
  COUNCIL_DEFAULTERS,
  STREAM_DEFAULTERS,
  GATHERINGSERVICE_DEFAULTERS,
} from './DefaultersQueries'
import './Defaulters.css'
import PlaceholderCustom from 'components/Placeholder'
import DefaulterInfoCard from './DefaulterInfoCard'
import RoleView from 'auth/RoleView'
import { permitLeaderAdmin } from 'permission-utils'
import { MemberContext } from 'contexts/MemberContext'
import useChurchLevel from 'hooks/useChurchLevel'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { DefaultersUseChurchtype } from './defaulters-types'
import { ChurchLevel } from 'global-types'

const DefaultersDashboard = () => {
  const { currentUser } = useContext(MemberContext)
  const [constituencyDefaulters] = useLazyQuery(CONSTITUENCY_DEFAULTERS)
  const [councilDefaulters] = useLazyQuery(COUNCIL_DEFAULTERS)
  const [streamDefaulters] = useLazyQuery(STREAM_DEFAULTERS)
  const [gatheringServiceDefaulters] = useLazyQuery(GATHERINGSERVICE_DEFAULTERS)

  let subChurch: ChurchLevel | string = ''

  const data: DefaultersUseChurchtype = useChurchLevel({
    constituencyFunction: constituencyDefaulters,
    councilFunction: councilDefaulters,
    streamFunction: streamDefaulters,
    gatheringServiceFunction: gatheringServiceDefaulters,
  })

  const { church, loading, error } = data

  switch (currentUser?.currentChurch?.__typename) {
    case 'Council':
      subChurch = 'Constituency'
      break
    case 'Stream':
      subChurch = 'Council'
      break

    case 'GatheringService':
      subChurch = 'Stream'
      break
    default:
      break
  }

  const defaulters = [
    {
      title: 'Services This Week',
      data: church?.servicesThisWeekCount,
      color: church?.servicesThisWeekCount ? 'good' : 'bad',
      link: church?.servicesThisWeekCount ? '/services/filled-services' : '#',
    },
    {
      title: 'Not Filled Forms',
      data: church?.formDefaultersThisWeekCount,
      color: church?.formDefaultersThisWeekCount ? 'bad' : 'good',
      link: church?.formDefaultersThisWeekCount
        ? '/services/form-defaulters'
        : '#',
    },
    {
      title: 'Have Banked',
      data: church?.bankedThisWeekCount,
      color:
        church?.bankedThisWeekCount === church?.servicesThisWeekCount
          ? 'good'
          : (church?.bankedThisWeekCount || 0) > 0
          ? 'yellow'
          : 'bad',
      link: church?.bankedThisWeekCount ? '/services/banked' : '#',
    },
    {
      title: 'Have Not Banked',
      data: church?.bankingDefaultersThisWeekCount,
      color: church?.bankingDefaultersThisWeekCount ? 'bad' : 'good',
      link: church?.bankingDefaultersThisWeekCount
        ? '/services/banking-defaulters'
        : '#',
    },
    {
      title: 'Canc. Service',
      data: church?.cancelledServicesThisWeekCount,
      color: church?.cancelledServicesThisWeekCount ? 'bad' : 'good',
      link: church?.cancelledServicesThisWeekCount
        ? '/services/cancelled-services'
        : '#',
    },
  ]

  const aggregates = {
    title: plural(subChurch),
    data: church ? church[`${subChurch?.toLowerCase()}Count`] : null,
    link: `/services/${church?.__typename?.toLowerCase()}-by-${subChurch?.toLowerCase()}`,
  }

  return (
    <ApolloWrapper data={church} loading={loading} error={error} placeholder>
      <Container>
        <HeadingPrimary
          loading={!church}
        >{`${church?.name} ${church?.__typename}`}</HeadingPrimary>
        <HeadingSecondary>Defaulters Page</HeadingSecondary>

        <PlaceholderCustom as="h6" loading={!church}>
          <h6>{`Total Number of Fellowships: ${church?.activeFellowshipCount}`}</h6>
        </PlaceholderCustom>

        <Row>
          <RoleView roles={permitLeaderAdmin('Council')}>
            <Col xs={12} className="mb-3">
              {aggregates?.title && (
                <DefaulterInfoCard defaulter={aggregates} />
              )}
            </Col>
          </RoleView>
          {defaulters.map((defaulter, i) => (
            <Col key={i} xs={6} className="mb-3">
              <DefaulterInfoCard defaulter={defaulter} />
            </Col>
          ))}
        </Row>
      </Container>
    </ApolloWrapper>
  )
}

export default DefaultersDashboard
