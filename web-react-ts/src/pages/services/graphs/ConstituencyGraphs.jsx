import React, { useContext, useState } from 'react'

import { ChurchContext } from '../../../contexts/ChurchContext'
import { useQuery } from '@apollo/client'
import { getServiceGraphData, getMonthlyStatAverage } from './graphs-utils'
import ChurchGraph from '../../../components/ChurchGraph/ChurchGraph'
import { CONSTITUENCY_GRAPHS } from './GraphsQueries'
import MembershipCard from './CompMembershipCard'
import StatDisplay from './CompStatDisplay'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { Col, Container, Row } from 'react-bootstrap'
import GraphDropdown from './GraphDropdown'

export const ConstituencyReport = () => {
  const { constituencyId } = useContext(ChurchContext)
  const [bussing, setBussing] = useState(true)
  const { data, loading, error } = useQuery(CONSTITUENCY_GRAPHS, {
    variables: { id: constituencyId },
    onCompleted: (data) => {
      if (!setChurchData) return
      setChurchData(getServiceGraphData(data?.constituencies[0], 'bussing'))
    },
  })
  const [churchData, setChurchData] = useState(
    getServiceGraphData(data?.constituencies[0], 'bussing')
  )

  return (
    <ApolloWrapper loading={loading} error={error} data={data}>
      <Container>
        <div className=" my-3">
          <h5 className="mb-0">{`${data?.constituencies[0].name} Constituency`}</h5>{' '}
          <p>
            <span className="text-secondary font-weight-bold">Leader: </span>
            {`${data?.constituencies[0].leader.fullName}`}
          </p>
        </div>

        <Row className="row-cols-2">
          <Col>
            <MembershipCard
              link="/constituency/members"
              title="Membership"
              count={data?.constituencies[0].memberCount}
            />
          </Col>

          <Col>
            <GraphDropdown
              setBussing={setBussing}
              setChurchData={setChurchData}
              data={data?.constituencies[0]}
            />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <StatDisplay
              title={`Avg Weekly ${bussing ? 'Bussing' : 'Attendance'}`}
              statistic={getMonthlyStatAverage(churchData, 'attendance')}
            />
          </Col>

          <Col>
            {(!bussing || loading) && (
              <StatDisplay
                title="Avg Weekly Income"
                statistic={getMonthlyStatAverage(churchData, 'income')}
              />
            )}
          </Col>
        </Row>
        <ChurchGraph
          stat1="attendance"
          stat2={!bussing ? 'income' : null}
          churchData={churchData}
          church="constituency"
          bussing={bussing}
        />
      </Container>
    </ApolloWrapper>
  )
}

export default ConstituencyReport
