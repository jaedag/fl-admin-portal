import React, { useContext, useState } from 'react'

import { useQuery } from '@apollo/client'
import { getServiceGraphData, getMonthlyStatAverage } from './graphs-utils'
import ChurchGraph from '../../../components/ChurchGraph/ChurchGraph'
import { COUNCIL_GRAPHS } from './GraphsQueries'
import MembershipCard from './CompMembershipCard'
import StatDisplay from './CompStatDisplay'
import BaseComponent from 'components/base-component/BaseComponent'
import { Col, Container, Row } from 'react-bootstrap'
import PlaceholderCustom from 'components/Placeholder'
import { ChurchContext } from 'contexts/ChurchContext'
import GraphDropdown from './GraphDropdown'
import { MemberContext } from 'contexts/MemberContext'

const CouncilReport = () => {
  const { councilId } = useContext(ChurchContext)
  const { currentUser } = useContext(MemberContext)

  const [bussing, setBussing] = useState(true)
  const { data, loading, error } = useQuery(COUNCIL_GRAPHS, {
    variables: { councilId: councilId },
    onCompleted: (data) => {
      if (!setChurchData) return
      setChurchData(getServiceGraphData(data?.councils[0], 'bussing'))
    },
  })

  const [churchData, setChurchData] = useState(
    getServiceGraphData(data?.councils[0], 'bussing')
  )

  return (
    <BaseComponent loading={loading} error={error} data={data} placeholder>
      <Container>
        <PlaceholderCustom loading={loading} as="h5" xs={10}>
          <h5 className="mb-0">{`${data?.councils[0]?.name} Council`}</h5>
        </PlaceholderCustom>
        <PlaceholderCustom loading={loading} as="span" xs={10}>
          <span className="text-secondary font-weight-bold">
            {`Leader: ${data?.councils[0]?.leader.fullName}`}
          </span>
        </PlaceholderCustom>

        <Row className="row-cols-2 mt-3">
          <Col>
            <MembershipCard
              link="/council/members"
              title="Membership"
              count={data?.councils[0]?.memberCount}
            />
          </Col>

          <Col>
            <GraphDropdown
              setBussing={setBussing}
              setChurchData={setChurchData}
              data={data?.councils[0]}
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
            {(!bussing & !currentUser.noIncome || loading) && (
              <StatDisplay
                title="Avg Weekly Income"
                statistic={getMonthlyStatAverage(churchData, 'income')}
              />
            )}
          </Col>
        </Row>

        {!currentUser.noIncome ? (
          <ChurchGraph
            loading={loading}
            stat1="attendance"
            stat2={!bussing ? 'income' : null}
            churchData={churchData}
            church="council"
            bussing={bussing}
            income={true}
          />
        ) : (
          <ChurchGraph
            loading={loading}
            stat1="attendance"
            stat2={null}
            churchData={churchData}
            church="council"
            bussing={bussing}
            income={false}
          />
        )}
      </Container>
    </BaseComponent>
  )
}

export default CouncilReport
