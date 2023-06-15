import { useLazyQuery } from '@apollo/client'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import PlaceholderCustom from 'components/Placeholder'
import { getWeekNumber } from 'jd-date-utils'
import { Col, Container, Row } from 'react-bootstrap'
import {
  CAMPUS_SERVICES_CONSTITUENCY_JOINT_DEFAULTERS_LIST,
  COUNCIL_CONSTITUENCY_JOINT_DEFAULTERS_LIST,
  STREAM_CONSTITUENCY_JOINT_DEFAULTERS_LIST,
} from './DefaultersQueries'
import useChurchLevel from 'hooks/useChurchLevel'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import PlaceholderDefaulterList from './PlaceholderDefaulterList'
import { DefaultersUseChurchType } from './defaulters-types'
import PullToRefresh from 'react-simple-pull-to-refresh'
import JointServiceDefaulterCard from './JointServiceDefaultersCard'

const ConstituencyNotBankedThisWeek = () => {
  const [councilConstituencyNotBankedThisWeek, { refetch: councilRefetch }] =
    useLazyQuery(COUNCIL_CONSTITUENCY_JOINT_DEFAULTERS_LIST)
  const [streamConstituencyNotBankedThisWeek, { refetch: streamRefetch }] =
    useLazyQuery(STREAM_CONSTITUENCY_JOINT_DEFAULTERS_LIST)
  const [campusThisWeek, { refetch: campusRefetch }] = useLazyQuery(
    CAMPUS_SERVICES_CONSTITUENCY_JOINT_DEFAULTERS_LIST
  )

  const data: DefaultersUseChurchType = useChurchLevel({
    councilFunction: councilConstituencyNotBankedThisWeek,
    councilRefetch,
    streamFunction: streamConstituencyNotBankedThisWeek,
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

          <PlaceholderCustom
            as="h6"
            loading={!church?.constituencyBankingDefaultersThisWeek.length}
          >
            <h6>{`Forms Filled This Week: ${church?.constituencyBankingDefaultersThisWeek.length}`}</h6>
          </PlaceholderCustom>

          <Row>
            {church?.constituencyBankingDefaultersThisWeek.map((service, i) => (
              <Col key={i} xs={12} className="mb-3">
                <JointServiceDefaulterCard
                  defaulter={service}
                  link="/constituency/service-details"
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

export default ConstituencyNotBankedThisWeek
