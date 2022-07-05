import React, { useContext, useState } from 'react'

import { ChurchContext } from '../../../contexts/ChurchContext'
import { useQuery } from '@apollo/client'
import { getServiceGraphData, getMonthlyStatAverage } from './graphs-utils'
import ChurchGraph from '../../../components/ChurchGraph/ChurchGraph'
import { GATHERINGSERVICE_GRAPHS } from './GraphsQueries'
import MembershipCard from './CompMembershipCard'
import StatDisplay from './CompStatDisplay'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { Col, Container, Row } from 'react-bootstrap'
import PlaceholderCustom from 'components/Placeholder'
import GraphDropdown from './GraphDropdown'
import { MemberContext } from 'contexts/MemberContext'

const GatheringServiceReport = () => {
  const { gatheringServiceId } = useContext(ChurchContext)
  const { currentUser } = useContext(MemberContext)
  const [bussing, setBussing] = useState(true)
  const { data, loading, error } = useQuery(GATHERINGSERVICE_GRAPHS, {
    variables: { gatheringServiceId: gatheringServiceId },
    onCompleted: (data) => {
      if (!setChurchData) return
      setChurchData(getServiceGraphData(data?.gatheringServices[0], 'bussing'))
    },
  })

  const [churchData, setChurchData] = useState(
    getServiceGraphData(data?.gatheringServices[0], 'bussing')
  )

  return (
    <ApolloWrapper loading={loading} error={error} data={data} placeholder>
      <Container>
        <PlaceholderCustom loading={loading} as="h5" xs={10}>
          <h5 className="mb-0">{`${data?.gatheringServices[0]?.name} GatheringService`}</h5>
        </PlaceholderCustom>
        <PlaceholderCustom loading={loading} as="span" xs={10}>
          <span className="text-secondary font-weight-bold">
            {console.log(data?.gatheringServices[0])}
            {`Leader: ${data?.gatheringServices[0]?.leader.fullName}`}
          </span>
        </PlaceholderCustom>

        <Row className="mt-3 row-cols-2">
          <Col>
            <MembershipCard
              link="/gatheringService/members"
              title="Membership"
              count={data?.gatheringServices[0]?.memberCount}
            />
          </Col>

          <Col>
            <GraphDropdown
              setBussing={setBussing}
              setChurchData={setChurchData}
              data={data?.gatheringServices[0]}
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

          {(!bussing & !currentUser.noIncome || loading) && (
            <Col>
              <StatDisplay
                title="Avg Weekly Income"
                statistic={getMonthlyStatAverage(churchData, 'income')}
              />
            </Col>
          )}
        </Row>

        {!currentUser.noIncome ? (
          <ChurchGraph
            loading={loading}
            stat1="attendance"
            stat2={!bussing ? 'income' : null}
            churchData={churchData}
            church="gatheringservice"
            bussing={bussing}
            income={true}
          />
        ) : (
          <ChurchGraph
            loading={loading}
            stat1="attendance"
            stat2={!bussing ? 'income' : null}
            churchData={churchData}
            church="gatheringservice"
            bussing={bussing}
            income={false}
          />
        )}
      </Container>
    </ApolloWrapper>
  )
}

export default GatheringServiceReport
