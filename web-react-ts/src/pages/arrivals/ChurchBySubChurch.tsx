import { useLazyQuery } from '@apollo/client'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import PlaceholderCustom from 'components/Placeholder'
import { ChurchContext } from 'contexts/ChurchContext'
import { MemberContext } from 'contexts/MemberContext'
import { plural } from 'global-utils'
import useChurchLevel from 'hooks/useChurchLevel'
import useSetUserChurch from 'hooks/useSetUserChurch'
import React, { useContext } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import PullToRefresh from 'react-simple-pull-to-refresh'
import {
  ArrivalsUseChurchExt,
  HigherChurchWithArrivals,
} from './arrivals-types'
import './Arrivals.css'
import {
  COUNCIL_BY_CONSTITUENCY_ARRIVALS,
  STREAM_BY_COUNCIL_ARRIVALS,
  GATHERINGSERVICE_BY_STREAM_ARRIVALS,
} from './churchBySubchurchQueries'
import ConstituencyDashboard from './DashboardConstituency'

const ChurchBySubChurch = () => {
  const { clickCard } = useContext(ChurchContext)
  const { setUserChurch } = useSetUserChurch()
  const navigate = useNavigate()
  const { currentUser } = useContext(MemberContext)
  const [councilByConstituency, { refetch: councilRefetch }] = useLazyQuery(
    COUNCIL_BY_CONSTITUENCY_ARRIVALS
  )
  const [streamByCouncil, { refetch: streamRefetch }] = useLazyQuery(
    STREAM_BY_COUNCIL_ARRIVALS
  )
  const [gatheringServiceByStream, { refetch: gatheringServiceRefetch }] =
    useLazyQuery(GATHERINGSERVICE_BY_STREAM_ARRIVALS)
  const currentChurch = currentUser?.currentChurch
  const data: ArrivalsUseChurchExt = useChurchLevel({
    councilFunction: councilByConstituency,
    councilRefetch,
    streamFunction: streamByCouncil,
    streamRefetch,
    gatheringServiceFunction: gatheringServiceByStream,
    gatheringServiceRefetch,
  })
  const { church, subChurchLevel, loading, error, refetch } = data

  if (currentChurch?.__typename === 'Constituency') {
    return <ConstituencyDashboard />
  }

  const subChurchLevelStr = plural(subChurchLevel)?.toLowerCase()

  return (
    <PullToRefresh onRefresh={refetch}>
      <ApolloWrapper data={church} loading={loading} error={error} placeholder>
        <Container>
          <div
            className={`fw-bold large-number pb-3`}
          >{`${currentChurch?.name} ${currentChurch?.__typename} By ${subChurchLevel}`}</div>
          <Row>
            {church &&
              church[`${subChurchLevelStr}`]?.map(
                (subChurch: HigherChurchWithArrivals, i: number) => {
                  const array = [
                    {
                      title: 'Active Bacentas',
                      number: subChurch.activeBacentaCount,
                      color: 'white',
                    },
                    {
                      title: 'Bacentas With No Activity',
                      number: subChurch.bacentasNoActivityCount,
                      color: 'red',
                    },
                    {
                      title: 'Bacentas Mobilising',
                      number: subChurch.bacentasMobilisingCount,
                      color: 'orange',
                    },
                    {
                      title: 'Bacentas On The Way',
                      number: subChurch.bacentasOnTheWayCount,
                      color: 'yellow',
                    },
                    {
                      title: 'Bacentas Below 8',
                      number: subChurch.bacentasBelow8Count,
                      color: 'red',
                    },
                    {
                      title: 'Bacentas That Have Arrived',
                      number: subChurch.bacentasHaveArrivedCount,
                      color: 'green',
                    },
                  ]
                  const membersArray = [
                    {
                      title: 'Members On The Way',
                      number: subChurch.bussingMembersOnTheWayCount,
                      color: 'yellow',
                    },
                    {
                      title: 'Members Arrived',
                      number: subChurch.bussingMembersHaveArrivedCount,
                      color: 'green',
                    },
                  ]

                  return (
                    <Col key={i} xs={12} className="mb-3">
                      <Card>
                        <Card.Header>
                          <div className="fw-bold">{`${subChurch.name} ${subChurch.__typename}`}</div>
                          <div className="text-secondary">{`Leader: ${subChurch.leader.nameWithTitle}`}</div>
                        </Card.Header>
                        <Card.Body
                          onClick={() => {
                            clickCard(subChurch)
                            setUserChurch(subChurch)
                            navigate(`/arrivals/${subChurchLevel}`)
                          }}
                        >
                          <div className="mb-3">
                            {array.map((col, index) => (
                              <div key={index} className={col.color}>
                                {`${col.title} - ${col.number}`}
                              </div>
                            ))}
                          </div>
                          <hr />
                          <div>
                            {membersArray.map((col, index) => (
                              <div key={index} className={col.color}>
                                {`${col.title} - ${col.number}`}
                              </div>
                            ))}
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  )
                }
              )}

            {(loading || !church) &&
              [1, 2, 3].map((placeholder, i) => (
                <Col key={i} xs={12} className="mb-3">
                  <Card>
                    <Card.Header className="fw-bold">
                      <PlaceholderCustom
                        loading={loading}
                        className="fw-bold"
                      ></PlaceholderCustom>
                    </Card.Header>
                    <Card.Body>
                      <PlaceholderCustom loading={loading} as="div" />
                      <PlaceholderCustom loading={loading} as="div" />
                      <PlaceholderCustom loading={loading} as="div" />
                      <PlaceholderCustom loading={loading} as="div" />
                    </Card.Body>
                  </Card>
                </Col>
              ))}
          </Row>
        </Container>
      </ApolloWrapper>
    </PullToRefresh>
  )
}

export default ChurchBySubChurch
