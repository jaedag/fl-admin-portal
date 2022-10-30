import React, { useContext, useState } from 'react'

import { ChurchContext } from '../../../contexts/ChurchContext'
import { useQuery } from '@apollo/client'
import { getServiceGraphData, getMonthlyStatAverage } from './graphs-utils'
import ChurchGraph from '../../../components/ChurchGraph/ChurchGraph'
import { STREAM_GRAPHS } from './GraphsQueries'
import MembershipCard from './CompMembershipCard'
import StatDisplay from './CompStatDisplay'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { Col, Container, Row } from 'react-bootstrap'
import PlaceholderCustom from 'components/Placeholder'
import GraphDropdown from './GraphDropdown'
import { MemberContext } from 'contexts/MemberContext'

const StreamReport = () => {
  const { currentUser } = useContext(MemberContext)

  const { streamId } = useContext(ChurchContext)
  const [bussing, setBussing] = useState(true)
  const [churchData, setChurchData] = useState<any[] | undefined>([])
  const { data, loading, error } = useQuery(STREAM_GRAPHS, {
    variables: { streamId: streamId },
    onCompleted: (data) => {
      if (!setChurchData) return
      setChurchData(getServiceGraphData(data?.streams[0], 'bussingAggregate'))
    },
  })

  return (
    <ApolloWrapper loading={loading} error={error} data={data}>
      <Container>
        <PlaceholderCustom loading={loading} as="h5" xs={10}>
          <h5 className="mb-0">{`${data?.streams[0]?.name} Stream`}</h5>
        </PlaceholderCustom>
        <PlaceholderCustom loading={loading} as="span" xs={10}>
          <span className="text-secondary font-weight-bold">
            {`Leader: ${data?.streams[0]?.leader.fullName}`}
          </span>
        </PlaceholderCustom>

        <Row className="mt-3 row-cols-2">
          <Col>
            <MembershipCard
              link="/stream/members"
              title="Membership"
              count={data?.streams[0]?.memberCount}
            />
          </Col>

          <Col>
            <GraphDropdown
              setBussing={setBussing}
              setChurchData={setChurchData}
              data={data?.streams[0]}
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

          {((!bussing && !currentUser.noIncome) || loading) && (
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
            churchData={churchData || []}
            church="stream"
            bussing={bussing}
            income={true}
          />
        ) : (
          <ChurchGraph
            loading={loading}
            stat1="attendance"
            stat2={null}
            churchData={churchData || []}
            church="stream"
            bussing={bussing}
            income={false}
          />
        )}
      </Container>
    </ApolloWrapper>
  )
}

export default StreamReport
