import { useQuery } from '@apollo/client'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { ChurchContext } from 'contexts/ChurchContext'
import React, { useContext } from 'react'
import { Card, Col, Row, Button, Container } from 'react-bootstrap'
import { TelephoneFill, Whatsapp } from 'react-bootstrap-icons'
import { useNavigate } from 'react-router'
import '../Defaulters.css'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import PlaceholderDefaulterList from '../PlaceholderDefaulterList'
import { HigherChurchWithDefaulters } from '../defaulters-types'
import PullToRefresh from 'react-simple-pull-to-refresh'
import { messageForAdminsOfDefaulters } from '../defaulters-utils'
import { MINISTRY_BY_HUB } from './DefaultersSontaQueries'
import useSetUserChurch from 'hooks/useSetUserChurch'

const MinistryByHub = () => {
  const { ministryId, clickCard } = useContext(ChurchContext)
  const { setUserChurch } = useSetUserChurch()
  const { data, loading, error, refetch } = useQuery(MINISTRY_BY_HUB, {
    variables: {
      id: ministryId,
    },
  })

  const navigate = useNavigate()

  return (
    <PullToRefresh onRefresh={refetch}>
      <ApolloWrapper data={data} loading={loading} error={error} placeholder>
        <Container>
          <HeadingPrimary loading={loading || !data?.ministries[0]?.name}>
            {`${data?.ministries[0].name} Ministry By Hub`}
          </HeadingPrimary>
          <Row>
            {data?.ministries.length ? (
              data?.ministries[0].hubs.map(
                (hub: HigherChurchWithDefaulters, i: number) => (
                  <Col key={i} xs={12} className="mb-3">
                    <Card>
                      <Card.Header className="fw-bold">{`${hub.name} Hub`}</Card.Header>
                      <Card.Body
                        onClick={() => {
                          clickCard(hub)
                          setUserChurch(hub)

                          navigate('/services/defaulters/dashboard')
                        }}
                      >
                        <div className="fw-bold">
                          Active Fellowships {hub.activeFellowshipCount}
                        </div>
                        <div className="good">
                          Services This Week {hub.servicesThisWeekCount}
                        </div>
                        <div
                          className={
                            hub.formDefaultersThisWeekCount ? 'bad' : 'good'
                          }
                        >
                          Form Not Filled This Week{' '}
                          {hub.formDefaultersThisWeekCount}
                        </div>
                        <div
                          className={
                            hub.bankedThisWeekCount ===
                            hub.servicesThisWeekCount
                              ? 'good'
                              : hub.bankedThisWeekCount > 0
                              ? 'yellow'
                              : 'bad'
                          }
                        >
                          Banked This Week {hub.bankedThisWeekCount}
                        </div>
                        <div
                          className={
                            hub.bankingDefaultersThisWeekCount ? 'bad' : 'good'
                          }
                        >
                          Not Banked This Week{' '}
                          {hub.bankingDefaultersThisWeekCount}
                        </div>
                        <div
                          className={
                            hub.cancelledServicesThisWeekCount ? 'bad' : 'good'
                          }
                        >
                          Cancelled Services This Week{' '}
                          {hub.cancelledServicesThisWeekCount}
                        </div>
                      </Card.Body>
                      <Card.Footer>
                        <div className="mb-2">
                          Contact Admin: {hub?.admin?.fullName}
                        </div>
                        <a href={`tel:${hub?.admin?.phoneNumber}`}>
                          <Button variant="primary">
                            <TelephoneFill /> Call
                          </Button>
                        </a>
                        <a
                          href={`https://wa.me/${
                            hub?.admin?.whatsappNumber
                          }?text=${messageForAdminsOfDefaulters(hub)}`}
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

export default MinistryByHub
