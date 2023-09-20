import { useQuery } from '@apollo/client'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import React, { useContext } from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import { CAMPUS_ACCOUNT_DASHBOARD } from './accountsGQL'
import { ChurchContext } from 'contexts/ChurchContext'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import HeadingSecondary from 'components/HeadingSecondary'
import './accounts-colors.css'
import { useNavigate } from 'react-router'

const CampusDashboard = () => {
  const { campusId } = useContext(ChurchContext)
  const navigate = useNavigate()

  const { data, loading, error } = useQuery(CAMPUS_ACCOUNT_DASHBOARD, {
    variables: {
      id: campusId,
    },
  })

  const campus = data?.campuses[0]

  return (
    <ApolloWrapper data={data} loading={loading} error={error}>
      <Container>
        <HeadingPrimary>{`${campus?.name} ${campus?.__typename}`}</HeadingPrimary>
        <HeadingSecondary>{campus?.leader.fullName}</HeadingSecondary>

        <Card className="current-balance mb-2">
          <Card.Body>
            <Row className="d-flex align-items-center">
              <Col>Current Balance</Col>
              <Col>
                <p className="text-end mb-0">
                  {(campus?.currentBalance || 0.0).toLocaleString('en-US')}
                </p>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <Card className="bussing-purse">
          <Card.Body>
            <Row className="d-flex align-items-center">
              <Col>Bussing Purse Balance</Col>
              <Col>
                <p className="text-end mb-0">
                  {(campus?.bussingPurseBalance || 0.0).toLocaleString('en-US')}
                </p>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <hr />

        <div className="d-grid gap-2">
          <Button
            variant="secondary"
            className="text-start py-3"
            onClick={() => navigate('/accounts/campus/councils-for-deposits')}
          >
            Update Balances
          </Button>

          <Button
            variant="secondary"
            className="text-start py-3"
            onClick={() => navigate('/accounts/campus/council/view-accounts')}
          >
            View Council Balances
          </Button>
        </div>
      </Container>
    </ApolloWrapper>
  )
}

export default CampusDashboard
