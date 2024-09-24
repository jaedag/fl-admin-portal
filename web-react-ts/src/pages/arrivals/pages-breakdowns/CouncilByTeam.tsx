import { useQuery } from '@apollo/client'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import PlaceholderCustom from 'components/Placeholder'
import { ChurchContext } from 'contexts/ChurchContext'
import { SHORT_POLL_INTERVAL } from 'global-utils'
import { useContext } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import PullToRefresh from 'react-simple-pull-to-refresh'
import '../Arrivals.css'
import { COUNCIL_BY_TEAM_ARRIVALS } from './churchBySubchurchQueries'
import { HigherChurchWithArrivals } from '../arrivals-types'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import useSetUserChurch from 'hooks/useSetUserChurch'
import MemberAvatarWithName from 'components/LeaderAvatar/MemberAvatarWithName'

const CouncilByTeam = () => {
  const { clickCard, councilId, arrivalDate } = useContext(ChurchContext)
  const navigate = useNavigate()
  const { setUserChurch } = useSetUserChurch()

  const { data, loading, error, refetch } = useQuery(COUNCIL_BY_TEAM_ARRIVALS, {
    variables: { id: councilId, arrivalDate },
    pollInterval: SHORT_POLL_INTERVAL,
  })

  const council = data?.councils[0]

  return (
    <PullToRefresh onRefresh={refetch}>
      <ApolloWrapper data={data} loading={loading} error={error} placeholder>
        <Container>
          <HeadingPrimary
            loading={!council}
          >{`${council?.name} Council By Team`}</HeadingPrimary>
          <Row>
            {council?.teams?.map(
              (team: HigherChurchWithArrivals, i: number) => {
                const array = [
                  {
                    title: 'Active Bacentas',
                    number: team.activeBacentaCount,
                    color: 'white',
                  },
                  {
                    title: 'Bacentas With No Activity',
                    number: team.bacentasNoActivityCount,
                    color: 'red',
                  },
                  {
                    title: 'Bacentas Mobilising',
                    number: team.bacentasMobilisingCount,
                    color: 'orange',
                  },
                  {
                    title: 'Bacentas On The Way',
                    number: team.bacentasOnTheWayCount,
                    color: 'yellow',
                  },
                  {
                    title: `Bacentas That Didn't Bus`,
                    number: team.bacentasBelow8Count,
                    color: 'red',
                  },
                  {
                    title: 'Bacentas That Have Arrived',
                    number: team.bacentasHaveArrivedCount,
                    color: 'green',
                  },
                ]
                const membersArray = [
                  {
                    title: 'Members On The Way',
                    number: team.bussingMembersOnTheWayCount,
                    color: 'yellow',
                  },
                  {
                    title: 'Members Arrived',
                    number: team.bussingMembersHaveArrivedCount,
                    color: 'green',
                  },
                  {
                    title: 'Busses Arrived',
                    number: team.bussesThatArrivedCount,
                    color: 'green',
                  },
                ]

                return (
                  <Col key={i} xs={12} className="mb-3">
                    <Card>
                      <Card.Header>
                        <div className="fw-bold">{`${team.name} ${team.__typename}`}</div>
                        <div className="text-secondary">
                          <MemberAvatarWithName member={team.leader} />
                        </div>
                      </Card.Header>
                      <Card.Body
                        onClick={() => {
                          clickCard(team)
                          setUserChurch(team)
                          navigate(`/arrivals/team`)
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

            {(loading || !data) &&
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

export default CouncilByTeam
