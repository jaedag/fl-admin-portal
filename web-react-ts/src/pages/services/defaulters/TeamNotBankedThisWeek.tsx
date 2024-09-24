import { useLazyQuery } from '@apollo/client'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import PlaceholderCustom from 'components/Placeholder'
import { getWeekNumber } from 'jd-date-utils'
import { Col, Container, Row } from 'react-bootstrap'
import {
  CAMPUS_SERVICES_TEAM_JOINT_DEFAULTERS_LIST,
  COUNCIL_TEAM_JOINT_DEFAULTERS_LIST,
  STREAM_TEAM_JOINT_DEFAULTERS_LIST,
} from './DefaultersQueries'
import useChurchLevel from 'hooks/useChurchLevel'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import PlaceholderDefaulterList from './PlaceholderDefaulterList'
import { DefaultersUseChurchType } from './defaulters-types'
import PullToRefresh from 'react-simple-pull-to-refresh'
import JointServiceDefaulterCard from './JointServiceDefaultersCard'

const TeamNotBankedThisWeek = () => {
  const [councilTeamNotBankedThisWeek, { refetch: councilRefetch }] =
    useLazyQuery(COUNCIL_TEAM_JOINT_DEFAULTERS_LIST)
  const [streamTeamNotBankedThisWeek, { refetch: streamRefetch }] =
    useLazyQuery(STREAM_TEAM_JOINT_DEFAULTERS_LIST)
  const [campusThisWeek, { refetch: campusRefetch }] = useLazyQuery(
    CAMPUS_SERVICES_TEAM_JOINT_DEFAULTERS_LIST
  )

  const data = useChurchLevel({
    councilFunction: councilTeamNotBankedThisWeek,
    councilRefetch,
    streamFunction: streamTeamNotBankedThisWeek,
    streamRefetch,
    campusFunction: campusThisWeek,
    campusRefetch,
  })
  const { church, loading, error, refetch } = data as DefaultersUseChurchType

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
            loading={!church?.teamBankingDefaultersThisWeek.length}
          >
            <h6>{`Forms Filled This Week: ${church?.teamBankingDefaultersThisWeek.length}`}</h6>
          </PlaceholderCustom>

          <Row>
            {church?.teamBankingDefaultersThisWeek.map((service, i) => (
              <Col key={i} xs={12} className="mb-3">
                <JointServiceDefaulterCard
                  defaulter={service}
                  link="/team/service-details"
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

export default TeamNotBankedThisWeek
