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
  CAMPUS_DEFAULTERS,
} from './DefaultersQueries'
import PlaceholderCustom from 'components/Placeholder'
import DefaulterInfoCard from './DefaulterInfoCard'
import RoleView from 'auth/RoleView'
import { permitLeaderAdmin } from 'permission-utils'
import { MemberContext } from 'contexts/MemberContext'
import useChurchLevel from 'hooks/useChurchLevel'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { DefaultersUseChurchType } from './defaulters-types'
import { ChurchLevel } from 'global-types'
import PullToRefresh from 'react-simple-pull-to-refresh'
import { HUB_DEFAULTERS } from './DefaultersSontaQueries'

const DefaultersDashboard = () => {
  const { currentUser } = useContext(MemberContext)
  const [constituencyDefaulters, { refetch: constituencyRefetch }] =
    useLazyQuery(CONSTITUENCY_DEFAULTERS)
  const [councilDefaulters, { refetch: councilRefetch }] =
    useLazyQuery(COUNCIL_DEFAULTERS)
  const [streamDefaulters, { refetch: streamRefetch }] =
    useLazyQuery(STREAM_DEFAULTERS)
  const [campusDefaulters, { refetch: campusRefetch }] =
    useLazyQuery(CAMPUS_DEFAULTERS)
  const [hubDefaulters, { refetch: hubRefetch }] = useLazyQuery(HUB_DEFAULTERS)

  let subChurch: ChurchLevel | string = ''

  const data: DefaultersUseChurchType = useChurchLevel({
    constituencyFunction: constituencyDefaulters,
    constituencyRefetch,
    councilFunction: councilDefaulters,
    councilRefetch,
    streamFunction: streamDefaulters,
    streamRefetch,
    campusFunction: campusDefaulters,
    campusRefetch,
    hubFunction: hubDefaulters,
    hubRefetch,
  })

  const { church, loading, error, refetch } = data

  switch (currentUser?.currentChurch?.__typename) {
    case 'Council':
      subChurch = 'Constituency'
      break
    case 'Stream':
      subChurch = 'Council'
      break

    case 'Campus':
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
      title: 'Cancelled Service',
      data: church?.cancelledServicesThisWeekCount,
      color: church?.cancelledServicesThisWeekCount ? 'bad' : 'good',
      link: church?.cancelledServicesThisWeekCount
        ? '/services/cancelled-services'
        : '#',
    },
  ]

  const jointServiceDefaulters = [
    {
      title: 'Constituency Banked',
      data: church?.constituencyBankedThisWeekCount,
      color: church?.constituencyBankedThisWeekCount ? 'good' : 'bad',
      link: church?.constituencyBankedThisWeekCount
        ? '/services/constituency-banked'
        : '#',
    },
    {
      title: 'Constituency Not Banked',
      data: church?.constituencyBankingDefaultersThisWeekCount,
      color: church?.constituencyBankingDefaultersThisWeekCount
        ? 'bad'
        : 'good',
      link: church?.constituencyBankingDefaultersThisWeekCount
        ? '/services/constituency-banking-defaulters'
        : '#',
    },
    {
      title: 'Council Banked',
      data: church?.councilBankedThisWeekCount,
      color: church?.councilBankedThisWeekCount ? 'good' : 'bad',
      link: church?.councilBankedThisWeekCount
        ? '/services/council-banked'
        : '#',
    },
    {
      title: 'Council Not Banked',
      data: church?.councilBankingDefaultersThisWeekCount,
      color: church?.councilBankingDefaultersThisWeekCount ? 'bad' : 'good',
      link: church?.councilBankingDefaultersThisWeekCount
        ? '/services/council-banking-defaulters'
        : '#',
    },
  ]

  const aggregates = {
    title: plural(subChurch),
    data: church ? church[`${subChurch?.toLowerCase()}Count`] : null,
    link: `/services/${church?.__typename?.toLowerCase()}-by-${subChurch?.toLowerCase()}`,
  }

  return (
    <PullToRefresh onRefresh={refetch}>
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

            <Col xs={12} className="mb-3">
              <hr />
            </Col>

            {jointServiceDefaulters.map((defaulter, i) => {
              if (!defaulter.data) return null

              return (
                <Col key={i} xs={6} className="mb-3">
                  <DefaulterInfoCard defaulter={defaulter} />
                </Col>
              )
            })}
          </Row>
        </Container>
      </ApolloWrapper>
    </PullToRefresh>
  )
}

export default DefaultersDashboard
