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
import { MemberContext } from 'contexts/MemberContext'
import CloudinaryImage from 'components/CloudinaryImage'

export const ConstituencyGraphs = () => {
  const { constituencyId } = useContext(ChurchContext)
  const { currentUser } = useContext(MemberContext)

  const [bussing, setBussing] = useState(true)
  const [churchData, setChurchData] = useState<any[] | undefined>([])
  const { data, loading, error } = useQuery(CONSTITUENCY_GRAPHS, {
    variables: { id: constituencyId },
    onCompleted: (data) => {
      if (!setChurchData) return
      setChurchData(
        getServiceGraphData(data?.constituencies[0], 'bussingAggregate')
      )
    },
  })

  return (
    <ApolloWrapper loading={loading} error={error} data={data}>
      <Container>
        <Row className=" my-3">
          <Col className="col-auto">
            <CloudinaryImage
              src={data?.constituencies[0].leader.pictureUrl}
              className="rounded-circle graph-user-image"
            />
          </Col>
          <Col className="my-auto">
            <h5 className="mb-0">{`${data?.constituencies[0].name} Constituency`}</h5>{' '}
            <p className="mb-0">
              <span className="text-secondary font-weight-bold">Leader: </span>
              {`${data?.constituencies[0].leader.fullName}`}
            </p>
          </Col>
        </Row>

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
            stat1="attendance"
            stat2={!bussing ? 'income' : null}
            churchData={churchData || []}
            church="constituency"
            bussing={bussing}
            income={true}
          />
        ) : (
          <ChurchGraph
            stat1="attendance"
            stat2={null}
            churchData={churchData || []}
            church="constituency"
            bussing={bussing}
            income={false}
          />
        )}
      </Container>
    </ApolloWrapper>
  )
}

export default ConstituencyGraphs
