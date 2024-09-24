import { useLazyQuery } from '@apollo/client'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import PlaceholderCustom from 'components/Placeholder'
import { getWeekNumber } from 'jd-date-utils'
import { Col, Container, Row } from 'react-bootstrap'
import {
  CAMPUS_SERVICES_TEAM_JOINT_BANKED_LIST,
  COUNCIL_TEAM_JOINT_BANKED_LIST,
  STREAM_TEAM_JOINT_BANKED_LIST,
} from './DefaultersQueries'
import useChurchLevel from 'hooks/useChurchLevel'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import PlaceholderDefaulterList from './PlaceholderDefaulterList'
import { DefaultersUseChurchType } from './defaulters-types'
import PullToRefresh from 'react-simple-pull-to-refresh'
import JointServiceDefaulterCard from './JointServiceDefaultersCard'

const TeamBankedThisWeek = () => {
  const [councilTeamBankedThisWeek, { refetch: councilRefetch }] = useLazyQuery(
    COUNCIL_TEAM_JOINT_BANKED_LIST
  )
  const [streamTeamBankedThisWeek, { refetch: streamRefetch }] = useLazyQuery(
    STREAM_TEAM_JOINT_BANKED_LIST
  )
  const [campusThisWeek, { refetch: campusRefetch }] = useLazyQuery(
    CAMPUS_SERVICES_TEAM_JOINT_BANKED_LIST
  )

  const data = useChurchLevel({
    councilFunction: councilTeamBankedThisWeek,
    councilRefetch,
    streamFunction: streamTeamBankedThisWeek,
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
          <HeadingSecondary>{`Services Which Banked This Week (Week ${getWeekNumber()})`}</HeadingSecondary>

          <PlaceholderCustom
            as="h6"
            loading={!church?.teamBankedThisWeek.length}
          >
            <h6>{`Services Which Banked This Week: ${church?.teamBankedThisWeek.length}`}</h6>
          </PlaceholderCustom>

          <Row>
            {church?.teamBankedThisWeek.map((service, i) => (
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

export default TeamBankedThisWeek
