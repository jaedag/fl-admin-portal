import React, { useContext, useState } from 'react'

import { ChurchContext } from '../../../contexts/ChurchContext'
import { useQuery } from '@apollo/client'
import { getServiceGraphData, getMonthlyStatAverage } from './trends-utils'
import ChurchGraph from '../../../components/ChurchGraph/ChurchGraph'
import { BACENTA_TRENDS } from './TrendsQueries'
import MembershipCard from './CompMembershipCard'
import StatDisplay from './CompStatDisplay'
import BaseComponent from 'components/base-component/BaseComponent'
import { Col, Container, Dropdown, Row } from 'react-bootstrap'

export const BacentaTrends = () => {
  const { bacentaId } = useContext(ChurchContext)
  const [bussing, setBussing] = useState(true)

  const { data, loading, error } = useQuery(BACENTA_TRENDS, {
    variables: { bacentaId: bacentaId },
    onCompleted: (data) => {
      setChurchData(getServiceGraphData(data?.bacentas[0], 'bussing'))
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
            <Dropdown>
              <Dropdown.Toggle variant="danger">Select Service</Dropdown.Toggle>

              <Dropdown.Menu variant="dark">
                <Dropdown.Item
                  className="py-3"
                  onClick={() => {
                    setBussing(true)
                    setChurchData(
                      getServiceGraphData(data?.bacentas[0], 'bussing')
                    )
                  }}
                >
                  Bussing
                </Dropdown.Item>
                <Dropdown.Item
                  className="py-3"
                  onClick={() => {
                    setBussing(false)
                    setChurchData(getServiceGraphData(data?.bacentas[0]))
                  }}
                >
                  Fellowship Services
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
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
          bussing={true}
        />
      </Container>
    </BaseComponent>
  )
}

export default BacentaTrends
