import React, { useContext, useState } from 'react'

import { ChurchContext } from '../../../contexts/ChurchContext'
import { useQuery } from '@apollo/client'
import { getServiceGraphData, getMonthlyStatAverage } from './graphs-utils'
import ChurchGraph from '../../../components/ChurchGraph/ChurchGraph'
import { HUBCOUNCIL_GRAPHS } from './GraphsQueries'
import MembershipCard from './CompMembershipCard'
import StatDisplay from './CompStatDisplay'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { Col, Container, Row } from 'react-bootstrap'
import GraphDropdown from './GraphDropdown'
import { MemberContext } from 'contexts/MemberContext'
import LeaderAvatar from 'components/LeaderAvatar/LeaderAvatar'

export const HubCouncilGraphs = () => {
  const { hubCouncilId } = useContext(ChurchContext)
  const [rehearsal, setRehearsal] = useState(true)
  const [ministryMeeting, setMinistryMeeting] = useState(false)
  const { currentUser } = useContext(MemberContext)

  const [churchData, setChurchData] = useState<any[] | undefined>([])
  const { data, loading, error } = useQuery(HUBCOUNCIL_GRAPHS, {
    variables: { hubCouncilId },
    onCompleted: (data) => {
      if (!setChurchData) return
      setChurchData(
        getServiceGraphData(data?.hubCouncils[0], 'rehearsalAggregate')
      )
    },
  })

  return (
    <ApolloWrapper loading={loading} error={error} data={data}>
      <Container>
        <LeaderAvatar
          leader={data?.hubCouncils[0].leader}
          leaderTitle="Hub Leader"
        />

        <Row className="row-cols-2">
          <Col>
            <MembershipCard
              link="/hub/members"
              title="Membership"
              count={data?.hubCouncils[0].memberCount}
            />
          </Col>
          <Col>
            <GraphDropdown
              setRehearsal={setRehearsal}
              setMinistryMeeting={setMinistryMeeting}
              setChurchData={setChurchData}
              data={data?.hubCouncils[0]}
            />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <StatDisplay
              title="Avg Weekly Attendance"
              statistic={getMonthlyStatAverage(churchData, 'attendance')}
            />
          </Col>
          {(!currentUser.noIncomeTracking || loading) && (
            <Col>
              <StatDisplay
                title="Avg Weekly Income"
                statistic={getMonthlyStatAverage(churchData, 'income')}
              />
            </Col>
          )}
        </Row>

        {!currentUser.noIncomeTracking ? (
          <ChurchGraph
            stat1="attendance"
            stat2={ministryMeeting ? null : 'income'}
            churchData={churchData || []}
            graphType={rehearsal ? 'rehearsal' : 'service'}
            church="hubcouncil"
            income={true}
          />
        ) : (
          <ChurchGraph
            stat1="attendance"
            stat2={null}
            churchData={churchData || []}
            church="hubcouncil"
            graphType={rehearsal ? 'rehearsal' : 'service'}
            income={false}
          />
        )}
      </Container>
    </ApolloWrapper>
  )
}

export default HubCouncilGraphs
