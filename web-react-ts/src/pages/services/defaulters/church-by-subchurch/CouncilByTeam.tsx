import { useQuery } from '@apollo/client'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import { ChurchContext } from 'contexts/ChurchContext'
import useSetUserChurch from 'hooks/useSetUserChurch'
import React, { useContext } from 'react'
import { Card, Col, Row, Button, Container } from 'react-bootstrap'
import { TelephoneFill, Whatsapp } from 'react-bootstrap-icons'
import { useNavigate } from 'react-router'
import PullToRefresh from 'react-simple-pull-to-refresh'
import { HigherChurchWithDefaulters } from '../defaulters-types'
import { messageForAdminsOfDefaulters } from '../defaulters-utils'
import { COUNCIL_BY_TEAM } from '../DefaultersQueries'
import PlaceholderDefaulterList from '../PlaceholderDefaulterList'
import '../Defaulters.css'

const CouncilByTeam = () => {
  const { councilId, clickCard } = useContext(ChurchContext)
  const { setUserChurch } = useSetUserChurch()
  const { data, loading, error, refetch } = useQuery(COUNCIL_BY_TEAM, {
    variables: {
      id: councilId,
    },
  })
  const navigate = useNavigate()

  return (
    <PullToRefresh onRefresh={refetch}>
      <ApolloWrapper data={data} loading={loading} error={error} placeholder>
        <Container>
          <HeadingPrimary
            loading={!data}
          >{`${data?.councils[0].name} Council By Team`}</HeadingPrimary>
          <Row>
            {data ? (
              data?.councils[0].teams.map(
                (team: HigherChurchWithDefaulters, i: number) => (
                  <Col key={i} xs={12} className="mb-3">
                    <Card>
                      <Card.Header className="fw-bold">
                        <div>{`${team.name} Team`}</div>
                        <div className="text-secondary">
                          {team.leader.fullName}
                        </div>
                      </Card.Header>
                      <Card.Body
                        onClick={() => {
                          clickCard(team)
                          setUserChurch(team)

                          navigate('/services/defaulters/dashboard')
                        }}
                      >
                        <div className="fw-bold">
                          Active Bacentas {team.activeBacentaCount}
                        </div>
                        <div className="good">
                          Services This Week {team.servicesThisWeekCount}
                        </div>
                        <div
                          className={
                            team.formDefaultersThisWeekCount ? 'bad' : 'good'
                          }
                        >
                          Form Not Filled This Week{' '}
                          {team.formDefaultersThisWeekCount}
                        </div>

                        <div
                          className={
                            team.bankedThisWeekCount ===
                            team.servicesThisWeekCount
                              ? 'good'
                              : team.bankedThisWeekCount > 0
                              ? 'yellow'
                              : 'bad'
                          }
                        >
                          Banked This Week {team.bankedThisWeekCount}
                        </div>
                        <div
                          className={
                            team.bankingDefaultersThisWeekCount ? 'bad' : 'good'
                          }
                        >
                          Not Banked This Week{' '}
                          {team.bankingDefaultersThisWeekCount}
                        </div>
                        <div
                          className={
                            team.cancelledServicesThisWeekCount ? 'bad' : 'good'
                          }
                        >
                          Cancelled Services This Week{' '}
                          {team.cancelledServicesThisWeekCount}
                        </div>
                      </Card.Body>
                      <Card.Footer>
                        {team?.bankedBy && (
                          <div className="text-warning">
                            Offering Received By:{' '}
                            {`${team.bankedBy.firstName} ${team.bankedBy.lastName}`}
                          </div>
                        )}
                        <div className="mb-2">
                          Contact Admin: {team?.admin?.fullName}
                        </div>
                        <a href={`tel:${team?.admin?.phoneNumber}`}>
                          <Button variant="primary">
                            <TelephoneFill /> Call
                          </Button>
                        </a>
                        <a
                          href={`https://wa.me/${
                            team?.admin?.whatsappNumber
                          }?text=${messageForAdminsOfDefaulters(team)}`}
                          className="ms-3"
                        >
                          <Button variant="success">
                            <Whatsapp /> WhatsApp
                          </Button>
                        </a>
                      </Card.Footer>
                    </Card>
                  </Col>
                )
              )
            ) : (
              <PlaceholderDefaulterList />
            )}
          </Row>
        </Container>
      </ApolloWrapper>
    </PullToRefresh>
  )
}

export default CouncilByTeam
