import React, { useContext, useState } from 'react'

import { useQuery } from '@apollo/client'
import { getServiceGraphData, getMonthlyStatAverage } from './graphs-utils'
import ChurchGraph from '../../../components/ChurchGraph/ChurchGraph'
import { COUNCIL_GRAPHS } from './GraphsQueries'
import MembershipCard from './CompMembershipCard'
import StatDisplay from './CompStatDisplay'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { Col, Container, Row } from 'react-bootstrap'
import { ChurchContext } from 'contexts/ChurchContext'
import GraphDropdown from './GraphDropdown'
import { MemberContext } from 'contexts/MemberContext'
import CloudinaryImage from 'components/CloudinaryImage'

const CouncilReport = () => {
  const { councilId } = useContext(ChurchContext)
  const { currentUser } = useContext(MemberContext)

  const [bussing, setBussing] = useState(true)
  const [churchData, setChurchData] = useState<any[] | undefined>([])
  const { data, loading, error } = useQuery(COUNCIL_GRAPHS, {
    variables: { councilId },
    onCompleted: (data) => {
      if (!setChurchData) return
      setChurchData(getServiceGraphData(data?.councils[0], 'bussingAggregate'))
    },
  })

  return (
    <ApolloWrapper loading={loading} error={error} data={data}>
      <Container>
        <Row className=" my-3">
          <Col className="col-auto">
            <CloudinaryImage
              src={data?.councils[0].leader.pictureUrl}
              className="rounded-circle graph-user-image"
            />
          </Col>
          <Col className="my-auto">
            <h5 className="mb-0">{`${data?.councils[0].name} Bacenta`}</h5>{' '}
            <p className="mb-0">
              <span className="text-secondary font-weight-bold">Leader: </span>
              {`${data?.councils[0].leader.fullName}`}
            </p>
          </Col>
        </Row>

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
            {((!bussing && !currentUser.noIncome) || loading) && (
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
            churchData={churchData || []}
            church="council"
            bussing={bussing}
            income={true}
          />
        ) : (
          <ChurchGraph
            loading={loading}
            stat1="attendance"
            stat2={null}
            churchData={churchData || []}
            church="council"
            bussing={bussing}
            income={false}
          />
        )}
      </Container>
    </ApolloWrapper>
  )
}

export default CouncilReport
