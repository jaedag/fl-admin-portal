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
import { COUNCIL_BY_CONSTITUENCY } from '../DefaultersQueries'
import PlaceholderDefaulterList from '../PlaceholderDefaulterList'

const CouncilByConstituency = () => {
  const { councilId, clickCard } = useContext(ChurchContext)
  const { setUserChurch } = useSetUserChurch()
  const { data, loading, error, refetch } = useQuery(COUNCIL_BY_CONSTITUENCY, {
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
          >{`${data?.councils[0].name} Council By Constituency`}</HeadingPrimary>
          <Row>
            {data ? (
              data?.councils[0].constituencies.map(
                (constituency: HigherChurchWithDefaulters, i: number) => (
                  <Col key={i} xs={12} className="mb-3">
                    <Card>
                      <Card.Header className="fw-bold">{`${constituency.name} Constituency`}</Card.Header>
                      <Card.Body
                        onClick={() => {
                          clickCard(constituency)
                          setUserChurch(constituency)

                          navigate('/services/defaulters/dashboard')
                        }}
                      >
                        <div className="fw-bold">
                          Active Fellowships{' '}
                          {constituency.activeFellowshipCount}
                        </div>
                        <div className="good">
                          Services This Week{' '}
                          {constituency.servicesThisWeekCount}
                        </div>
                        <div
                          className={
                            constituency.formDefaultersThisWeekCount
                              ? 'bad'
                              : 'good'
                          }
                        >
                          Form Not Filled This Week{' '}
                          {constituency.formDefaultersThisWeekCount}
                        </div>

                        <div
                          className={
                            constituency.bankedThisWeekCount ===
                            constituency.servicesThisWeekCount
                              ? 'good'
                              : constituency.bankedThisWeekCount > 0
                              ? 'yellow'
                              : 'bad'
                          }
                        >
                          Banked This Week {constituency.bankedThisWeekCount}
                        </div>
                        <div
                          className={
                            constituency.bankingDefaultersThisWeekCount
                              ? 'bad'
                              : 'good'
                          }
                        >
                          Not Banked This Week{' '}
                          {constituency.bankingDefaultersThisWeekCount}
                        </div>
                        <div
                          className={
                            constituency.cancelledServicesThisWeekCount
                              ? 'bad'
                              : 'good'
                          }
                        >
                          Cancelled Services This Week{' '}
                          {constituency.cancelledServicesThisWeekCount}
                        </div>
                      </Card.Body>
                      <Card.Footer>
                        {constituency?.bankedBy && (
                          <div className="text-warning">
                            Offering Received By:{' '}
                            {`${constituency.bankedBy.firstName} ${constituency.bankedBy.lastName}`}
                          </div>
                        )}
                        <div className="mb-2">
                          Contact Admin: {constituency?.admin?.fullName}
                        </div>
                        <a href={`tel:${constituency?.admin?.phoneNumber}`}>
                          <Button variant="primary">
                            <TelephoneFill /> Call
                          </Button>
                        </a>
                        <a
                          href={`https://wa.me/${
                            constituency?.admin?.whatsappNumber
                          }?text=${messageForAdminsOfDefaulters(constituency)}`}
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

export default CouncilByConstituency
