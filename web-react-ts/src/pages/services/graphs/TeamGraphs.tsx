import React, { useContext, useState } from 'react'

import { ChurchContext } from '../../../contexts/ChurchContext'
import { useQuery } from '@apollo/client'
import {
  getServiceGraphData,
  getMonthlyStatAverage,
  GraphTypes,
} from './graphs-utils'
import ChurchGraph from '../../../components/ChurchGraph/ChurchGraph'
import { TEAM_GRAPHS } from './GraphsQueries'
import MembershipCard from './CompMembershipCard'
import StatDisplay from './CompStatDisplay'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { Col, Container, Row } from 'react-bootstrap'
import GraphDropdown from './GraphDropdown'
import { MemberContext } from 'contexts/MemberContext'
import LeaderAvatar from 'components/LeaderAvatar/LeaderAvatar'
import { isIncomeGraph } from 'global-utils'

export const TeamGraphs = () => {
  const { teamId } = useContext(ChurchContext)
  const { currentUser } = useContext(MemberContext)

  const [graphs, setGraphs] = useState<GraphTypes>('bussingAggregate')
  const [churchData, setChurchData] = useState<any[] | undefined>([])
  const { data, loading, error } = useQuery(TEAM_GRAPHS, {
    variables: { id: teamId },
    onCompleted: (data) => {
      if (!setChurchData) return
      setChurchData(getServiceGraphData(data?.teams[0], graphs))
    },
  })

  return (
    <ApolloWrapper loading={loading} error={error} data={data}>
      <Container>
        <LeaderAvatar
          leader={data?.teams[0].leader}
          leaderTitle="Team Leader"
        />

        <Row className="row-cols-2">
          <Col>
            <MembershipCard
              link="/team/members"
              title="Membership"
              count={data?.teams[0].memberCount}
            />
          </Col>

          <Col>
            <GraphDropdown
              graphs={graphs}
              setGraphs={setGraphs}
              setChurchData={setChurchData}
              data={data?.teams[0]}
            />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <StatDisplay
              title={`Avg Weekly ${
                graphs === 'bussing' ? 'Bussing' : 'Attendance'
              }`}
              statistic={getMonthlyStatAverage(churchData, 'attendance')}
            />
          </Col>

          <Col>
            {isIncomeGraph(graphs, currentUser) && (
              <StatDisplay
                title="Avg Weekly Income"
                statistic={getMonthlyStatAverage(churchData, 'income')}
              />
            )}
          </Col>
        </Row>

        {!currentUser.noIncomeTracking ? (
          <ChurchGraph
            stat1="attendance"
            stat2={!isIncomeGraph(graphs, currentUser) ? null : 'income'}
            churchData={churchData || []}
            church="team"
            graphType={graphs}
            income={true}
          />
        ) : (
          <ChurchGraph
            stat1="attendance"
            stat2={null}
            churchData={churchData || []}
            church="team"
            graphType={graphs}
            income={false}
          />
        )}
      </Container>
    </ApolloWrapper>
  )
}

export default TeamGraphs
