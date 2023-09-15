import { useLazyQuery } from '@apollo/client'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import PlaceholderCustom from 'components/Placeholder'
import { getWeekNumber } from 'jd-date-utils'
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import {
  CONSTITUENCY_SERVICES_LIST,
  COUNCIL_SERVICES_LIST,
  STREAM_SERVICES_LIST,
  CAMPUS_SERVICES_LIST,
} from '../DefaultersQueries'
import DefaulterCard from '../DefaulterCard'
import useChurchLevel from 'hooks/useChurchLevel'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import PlaceholderDefaulterList from '../PlaceholderDefaulterList'
import { DefaultersUseChurchType } from '../defaulters-types'
import PullToRefresh from 'react-simple-pull-to-refresh'

const ServicesThisWeek = () => {
  const [constituencyServicesThisWeek, { refetch: constituencyRefetch }] =
    useLazyQuery(CONSTITUENCY_SERVICES_LIST)
  const [councilServicesThisWeek, { refetch: councilRefetch }] = useLazyQuery(
    COUNCIL_SERVICES_LIST
  )
  const [streamServicesThisWeek, { refetch: streamRefetch }] =
    useLazyQuery(STREAM_SERVICES_LIST)
  const [campusThisWeek, { refetch: campusRefetch }] =
    useLazyQuery(CAMPUS_SERVICES_LIST)

  const data: DefaultersUseChurchType = useChurchLevel({
    constituencyFunction: constituencyServicesThisWeek,
    constituencyRefetch,
    councilFunction: councilServicesThisWeek,
    councilRefetch,
    streamFunction: streamServicesThisWeek,
    streamRefetch,
    campusFunction: campusThisWeek,
    campusRefetch,
  })
  const { church, loading, error, refetch } = data

  return (
    <PullToRefresh onRefresh={refetch}>
      <ApolloWrapper data={church} loading={loading} error={error} placeholder>
        <Container>
          <HeadingPrimary
            loading={!church}
          >{`${church?.name} ${church?.__typename}`}</HeadingPrimary>
          <HeadingSecondary>{`Forms Filled This Week (Week ${getWeekNumber()})`}</HeadingSecondary>

          <PlaceholderCustom as="h6" loading={!church?.servicesThisWeek.length}>
            <h6>{`Forms Filled This Week: ${church?.servicesThisWeek.length}`}</h6>
          </PlaceholderCustom>

          <Row>
            {church?.servicesThisWeek.map((service, i) => (
              <Col key={i} xs={12} className="mb-3">
                <DefaulterCard
                  defaulter={service}
                  link="/fellowship/service-details"
                />
              </Col>
            ))}
            {!church && <PlaceholderDefaulterList />}
          </Row>
        </Container>
      </ApolloWrapper>
    </PullToRefresh>
  )
}

export default ServicesThisWeek
