import React, { useContext } from 'react'

import { ChurchContext } from '../../../contexts/ChurchContext'
import { useQuery } from '@apollo/client'
import { getServiceGraphData, getMonthlyStatAverage } from './trends-utils'
import ChurchGraph from '../../../components/ChurchGraph/ChurchGraph'
import { CONSTITUENCY_TRENDS } from './TrendsQueries'
import MembershipCard from './CompMembershipCard'
import StatDisplay from './CompStatDisplay'
import BaseComponent from 'components/base-component/BaseComponent'
import { Col, Container, Row } from 'react-bootstrap'

export const ConstituencyReport = () => {
  const { constituencyId } = useContext(ChurchContext)

  const { data, loading, error } = useQuery(CONSTITUENCY_TRENDS, {
    variables: { id: constituencyId },
  })

  const churchData = getServiceGraphData(data?.constituencies[0])

  return (
    <BaseComponent loading={loading} error={error} data={data}>
      <Container>
        <div className=" my-3">
          <h5 className="mb-0">{`${data?.constituencies[0].name} Constituency`}</h5>{' '}
          <p>
            <span className="text-secondary font-weight-bold">Leader: </span>
            {`${data?.constituencies[0].leader.fullName}`}
          </p>
        </div>

        <Row>
          <Col>
            <MembershipCard
              link="/constituency/members"
              title="Membership"
              count={data?.constituencies[0].memberCount}
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

          <Col>
            <StatDisplay
              title="Avg Weekly Income"
              statistic={getMonthlyStatAverage(churchData, 'income')}
            />
          </Col>
        </Row>
        <ChurchGraph
          stat1="attendance"
          stat2="income"
          churchData={churchData}
          church="constituency"
        />
      </Container>
    </BaseComponent>
  )
}

export default ConstituencyReport
