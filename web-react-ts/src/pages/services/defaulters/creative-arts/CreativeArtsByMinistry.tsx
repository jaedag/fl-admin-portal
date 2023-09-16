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
import { CREATIVEARTS_BY_MINISTRY } from './DefaultersSontaQueries'

const CreativeArtsByMinistry = () => {
  const { creativeArtsId, clickCard } = useContext(ChurchContext)
  const { data, loading, error, refetch } = useQuery(CREATIVEARTS_BY_MINISTRY, {
    variables: {
      id: creativeArtsId,
    },
  })

  const navigate = useNavigate()

  return (
    <PullToRefresh onRefresh={refetch}>
      <ApolloWrapper data={data} loading={loading} error={error} placeholder>
        <Container>
          <HeadingPrimary loading={loading || !data?.creativeArts[0]?.name}>
            {`${data?.creativeArts[0].name} CreativeArts By Ministry`}
          </HeadingPrimary>
          <Row>
            {data?.creativeArts.length ? (
              data?.creativeArts[0].ministries.map(
                (ministry: HigherChurchWithDefaulters, i: number) => (
                  <Col key={i} xs={12} className="mb-3">
                    <Card>
                      <Card.Header className="fw-bold">{`${ministry.name} Ministry`}</Card.Header>
                      <Card.Body
                        onClick={() => {
                          clickCard(ministry)
                          navigate('/services/ministry-by-hub')
                        }}
                      >
                        <div className="fw-bold">
                          Active Fellowships {ministry.activeFellowshipCount}
                        </div>
                        <div className="good">
                          Services This Week {ministry.servicesThisWeekCount}
                        </div>
                        <div
                          className={
                            ministry.formDefaultersThisWeekCount
                              ? 'bad'
                              : 'good'
                          }
                        >
                          Form Not Filled This Week{' '}
                          {ministry.formDefaultersThisWeekCount}
                        </div>
                        <div
                          className={
                            ministry.bankedThisWeekCount ===
                            ministry.servicesThisWeekCount
                              ? 'good'
                              : ministry.bankedThisWeekCount > 0
                              ? 'yellow'
                              : 'bad'
                          }
                        >
                          Banked This Week {ministry.bankedThisWeekCount}
                        </div>
                        <div
                          className={
                            ministry.bankingDefaultersThisWeekCount
                              ? 'bad'
                              : 'good'
                          }
                        >
                          Not Banked This Week{' '}
                          {ministry.bankingDefaultersThisWeekCount}
                        </div>
                        <div
                          className={
                            ministry.cancelledServicesThisWeekCount
                              ? 'bad'
                              : 'good'
                          }
                        >
                          Cancelled Services This Week{' '}
                          {ministry.cancelledServicesThisWeekCount}
                        </div>
                      </Card.Body>
                      <Card.Footer>
                        <div className="mb-2">
                          Contact Admin: {ministry?.admin?.fullName}
                        </div>
                        <a href={`tel:${ministry?.admin?.phoneNumber}`}>
                          <Button variant="primary">
                            <TelephoneFill /> Call
                          </Button>
                        </a>
                        <a
                          href={`https://wa.me/${
                            ministry?.admin?.whatsappNumber
                          }?text=${messageForAdminsOfDefaulters(ministry)}`}
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

export default CreativeArtsByMinistry
