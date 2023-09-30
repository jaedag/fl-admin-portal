import React, { useContext, useState } from 'react'

import { ChurchContext } from '../../../contexts/ChurchContext'
import { useQuery } from '@apollo/client'
import { getServiceGraphData, getMonthlyStatAverage } from './graphs-utils'
import ChurchGraph from '../../../components/ChurchGraph/ChurchGraph'
import { HUB_GRAPHS } from './GraphsQueries'
import MembershipCard from './CompMembershipCard'
import StatDisplay from './CompStatDisplay'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { Col, Container, Row } from 'react-bootstrap'
import GraphDropdown from './GraphDropdown'
import { MemberContext } from 'contexts/MemberContext'
import CloudinaryImage from 'components/CloudinaryImage'

export const HubGraphs = () => {
  const { hubId } = useContext(ChurchContext)
  const [rehearsal, setRehearsal] = useState(true)
  const [ministryMeeting, setMinistryMeeting] = useState(false)
  const { currentUser } = useContext(MemberContext)

  const [churchData, setChurchData] = useState<any[] | undefined>([])
  const { data, loading, error } = useQuery(HUB_GRAPHS, {
    variables: { hubId: hubId },
    onCompleted: (data) => {
      if (!setChurchData) return
      setChurchData(getServiceGraphData(data?.hubs[0], 'rehearsal'))
    },
  })

  return (
    <ApolloWrapper loading={loading} error={error} data={data}>
      <Container>
        <Row className=" my-3">
          <Col className="col-auto">
            <CloudinaryImage
              src={data?.hubs[0].leader.pictureUrl}
              className="rounded-circle graph-user-image"
            />
          </Col>
          <Col className="my-auto">
            <h5 className="mb-0">{`${data?.hubs[0].name} Hub`}</h5>{' '}
            <p className="mb-0">
              <span className="text-secondary font-weight-bold">Leader: </span>
              {`${data?.hubs[0].leader.fullName}`}
            </p>
          </Col>
        </Row>

        <Row className="row-cols-2">
          <Col>
            <MembershipCard
              link="/hub/members"
              title="Membership"
              count={data?.hubs[0].memberCount}
            />
          </Col>
          <Col>
            <GraphDropdown
              setRehearsal={setRehearsal}
              setMinistryMeeting={setMinistryMeeting}
              setChurchData={setChurchData}
              data={data?.hubs[0]}
            />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <StatDisplay
              title={`Avg Weekly ${rehearsal ? 'Rehearsal' : 'Attendance'}`}
              statistic={getMonthlyStatAverage(churchData, 'attendance')}
            />
          </Col>
          {((!rehearsal && !currentUser.noIncomeTracking) || loading) && (
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
            church="hub"
            income={true}
          />
        ) : (
          <ChurchGraph
            stat1="attendance"
            stat2={null}
            churchData={churchData || []}
            church="hub"
            income={false}
          />
        )}
      </Container>
    </ApolloWrapper>
  )
}

export default HubGraphs
