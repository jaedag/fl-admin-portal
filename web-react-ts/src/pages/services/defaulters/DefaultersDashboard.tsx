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
  OVERSIGHT_DEFAULTERS,
} from './DefaultersQueries'
import PlaceholderCustom from 'components/Placeholder'
import DefaulterInfoCard from './DefaulterInfoCard'
import RoleView from 'auth/RoleView'
import { permitLeaderAdmin } from 'permission-utils'
import { MemberContext } from 'contexts/MemberContext'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { DefaultersUseChurchType } from './defaulters-types'
import { ChurchLevel } from 'global-types'
import PullToRefresh from 'react-simple-pull-to-refresh'
import {
  CREATIVEARTS_DEFAULTERS,
  HUBCOUNCIL_DEFAULTERS,
  HUB_DEFAULTERS,
  MINISTRY_DEFAULTERS,
} from './creative-arts/DefaultersSontaQueries'
import useSontaLevel from 'hooks/useSontaLevel'

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
  const [oversightDefaulters, { refetch: oversightRefetch }] =
    useLazyQuery(OVERSIGHT_DEFAULTERS)
  const [hubDefaulters, { refetch: hubRefetch }] = useLazyQuery(HUB_DEFAULTERS)
  const [hubCouncilDefaulters, { refetch: hubCouncilRefetch }] = useLazyQuery(
    HUBCOUNCIL_DEFAULTERS
  )
  const [ministryDefaulters, { refetch: ministryRefetch }] =
    useLazyQuery(MINISTRY_DEFAULTERS)
  const [creativeArtsDefaulters, { refetch: creativeArtsRefetch }] =
    useLazyQuery(CREATIVEARTS_DEFAULTERS)

  let subChurch: ChurchLevel | string = ''

  const data = useSontaLevel({
    constituencyFunction: constituencyDefaulters,
    constituencyRefetch,
    councilFunction: councilDefaulters,
    councilRefetch,
    streamFunction: streamDefaulters,
    streamRefetch,
    campusFunction: campusDefaulters,
    campusRefetch,
    oversightFunction: oversightDefaulters,
    oversightRefetch,
    hubFunction: hubDefaulters,
    hubRefetch,
    hubCouncilFunction: hubCouncilDefaulters,
    hubCouncilRefetch,
    ministryFunction: ministryDefaulters,
    ministryRefetch,
    creativeArtsFunction: creativeArtsDefaulters,
    creativeArtsRefetch,
  })

  const { church, loading, error, refetch } = data as DefaultersUseChurchType

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
    case 'Oversight':
      subChurch = 'Campus'
      break
    case 'Denomination':
      subChurch = 'Oversight'
      break
    case 'Ministry':
      subChurch = 'Hub'
      break
    case 'CreativeArts':
      subChurch = 'Ministry'
      break
    default:
      break
  }

  const rehearsalDefaulters = [
    {
      title: 'Rehearsal This Week',
      data: church?.hubRehearsalsThisWeekCount,
      color: church?.hubRehearsalsThisWeekCount ? 'good' : 'bad',
      link: church?.hubRehearsalsThisWeekCount
        ? '/creative-arts/rehearsal-defaulters'
        : '#',
    },
  ]

  const streamDefaultersArray = [
    {
      title: 'Services This Week',
      data: church?.streamServicesThisWeekCount,
      color: church?.streamServicesThisWeekCount ? 'good' : 'bad',
      link: church?.streamServicesThisWeekCount
        ? '/stream-services/filled-services'
        : '#',
    },
    {
      title: 'Not Filled Forms',
      data: church?.streamFormDefaultersThisWeekCount,
      color: church?.streamFormDefaultersThisWeekCount ? 'bad' : 'good',
      link: church?.streamFormDefaultersThisWeekCount
        ? '/stream-services/form-defaulters'
        : '#',
    },
    {
      title: 'Have Banked',
      data: church?.streamBankedThisWeekCount,
      color:
        church?.streamBankedThisWeekCount ===
        church?.streamServicesThisWeekCount
          ? 'good'
          : (church?.streamBankedThisWeekCount || 0) > 0
          ? 'yellow'
          : 'bad',
      link: church?.streamBankedThisWeekCount ? '/stream-services/banked' : '#',
    },
    {
      title: 'Have Not Banked',
      data: church?.streamBankingDefaultersThisWeekCount,
      color: church?.streamBankingDefaultersThisWeekCount ? 'bad' : 'good',
      link: church?.streamBankingDefaultersThisWeekCount
        ? '/stream-services/banking-defaulters'
        : '#',
    },
    {
      title: 'Cancelled Service',
      data: church?.streamCancelledServicesThisWeekCount,
      color: church?.streamCancelledServicesThisWeekCount ? 'bad' : 'good',
      link: church?.streamCancelledServicesThisWeekCount
        ? '/stream-services/cancelled-services'
        : '#',
    },
  ]

  const fellowshipDefaulters = [
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

          <Row>
            <RoleView roles={permitLeaderAdmin('Council')}>
              <Col xs={12} className="mb-3">
                {aggregates?.title && (
                  <DefaulterInfoCard defaulter={aggregates} />
                )}
              </Col>
            </RoleView>

            {['Campus', 'Oversight', 'Denomination'].includes(
              church?.__typename ?? ''
            ) && (
              <>
                <Col xs={12} className="mb-3">
                  <hr />
                  <HeadingSecondary>Stream Services</HeadingSecondary>
                  <PlaceholderCustom as="h6" loading={!church}>
                    <h6>{`Active Streams: ${church?.activeStreamCount}`}</h6>
                  </PlaceholderCustom>
                </Col>

                {streamDefaultersArray.map((defaulter, i) => (
                  <Col key={i} xs={6} className="mb-3">
                    <DefaulterInfoCard defaulter={defaulter} />
                  </Col>
                ))}
              </>
            )}

            {['CreativeArts', 'Ministry', 'HubCouncil'].includes(
              church?.__typename ?? ''
            ) && (
              <>
                <Col xs={12} className="mb-3">
                  <hr />
                  <HeadingSecondary>Stream Services</HeadingSecondary>
                  <PlaceholderCustom as="h6" loading={!church}>
                    <h6>{`Active Streams: ${church?.activeStreamCount}`}</h6>
                  </PlaceholderCustom>
                </Col>

                {rehearsalDefaulters.map((defaulter, i) => (
                  <Col key={i} xs={6} className="mb-3">
                    <DefaulterInfoCard defaulter={defaulter} />
                  </Col>
                ))}
              </>
            )}

            {[
              'Campus',
              'Stream',
              'Council',
              'Constituency',
              'Hub',
              'HubCouncil',
              'Ministry',
              'CreativeArts',
            ].includes(church?.__typename ?? '') && (
              <>
                <hr />
                <HeadingSecondary>Fellowship Services</HeadingSecondary>
                <PlaceholderCustom as="h6" loading={!church}>
                  <h6>{`Active Fellowships: ${church?.activeFellowshipCount}`}</h6>
                </PlaceholderCustom>
                {fellowshipDefaulters.map((defaulter, i) => (
                  <Col key={i} xs={6} className="mb-3">
                    <DefaulterInfoCard defaulter={defaulter} />
                  </Col>
                ))}
                <hr />
              </>
            )}

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
