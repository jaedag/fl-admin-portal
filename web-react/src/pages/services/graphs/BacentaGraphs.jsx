/* eslint-disable @typescript-eslint/no-use-before-define */
import { useContext, useState } from 'react'

import { ChurchContext } from '../../../contexts/ChurchContext'
import { useQuery } from '@apollo/client'
import { getServiceGraphData, getMonthlyStatAverage } from './graphs-utils'
import ChurchGraph from '../../../components/ChurchGraph/ChurchGraph'
import { BACENTA_GRAPHS } from './GraphsQueries'
import MembershipCard from './CompMembershipCard'
import StatDisplay from './CompStatDisplay'
import BaseComponent from 'components/base-component/BaseComponent'
import { Col, Container, Row } from 'react-bootstrap'
import GraphDropdown from './GraphDropdown'

export const BacentaGraphs = () => {
  const { bacentaId } = useContext(ChurchContext)
  const [bussing, setBussing] = useState(true)

  const { data, loading, error } = useQuery(BACENTA_GRAPHS, {
    variables: { bacentaId: bacentaId },
    onCompleted: (graphData) => {
      if (!setChurchData) return
      setChurchData(getServiceGraphData(graphData?.bacentas[0], 'bussing'))
    },
  })
  const [churchData, setChurchData] = useState(
    getServiceGraphData(data?.bacentas[0], 'bussing')
  )

  return (
    <BaseComponent loading={loading} error={error} data={data}>
      <Container>
        <div className=" my-3">
          <h5 className="mb-0">{`${data?.bacentas[0].name} Bacenta`}</h5>{' '}
          <p>
            <span className="text-secondary font-weight-bold">Leader: </span>
            {`${data?.bacentas[0].leader.fullName}`}
          </p>
        </div>

        <Row className="row-cols-2">
          <Col>
            <MembershipCard
              link="/bacenta/members"
              title="Membership"
              count={data?.bacentas[0].memberCount}
            />
          </Col>
          <Col>
            <GraphDropdown
              setBussing={setBussing}
              setChurchData={setChurchData}
              data={data?.bacentas[0]}
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
          {(!bussing || loading) && (
            <Col>
              <StatDisplay
                title="Avg Weekly Income"
                statistic={getMonthlyStatAverage(churchData, 'income')}
              />
            </Col>
          )}
        </Row>
        <ChurchGraph
          stat1="attendance"
          stat2={!bussing ? 'income' : null}
          churchData={churchData}
          church="bacenta"
          bussing={bussing}
        />
      </Container>
    </BaseComponent>
  )
}

export default BacentaGraphs
