import { useQuery } from '@apollo/client'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import React, { useContext } from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import { COUNCIL_ACCOUNT_DASHBOARD } from './accountsGQL'
import { ChurchContext } from 'contexts/ChurchContext'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import HeadingSecondary from 'components/HeadingSecondary'
import './accounts-colors.css'
import { useNavigate } from 'react-router'

const AccountsLandingPage = () => {
  const { councilId } = useContext(ChurchContext)
  const navigate = useNavigate()

  const { data, loading, error } = useQuery(COUNCIL_ACCOUNT_DASHBOARD, {
    variables: {
      id: councilId,
    },
  })

  const council = data?.councils[0]

  return (
    <ApolloWrapper data={data} loading={loading} error={error}>
      <Container>
        <HeadingPrimary>{`${council?.name} ${council?.__typename}`}</HeadingPrimary>
        <HeadingSecondary>{council?.leader.fullName}</HeadingSecondary>

        <Card className="current-balance mb-2">
          <Card.Body>
            <Row className="d-flex align-items-center">
              <Col>Current Balance</Col>
              <Col>
                <p className="text-end mb-0">
                  {(council?.currentBalance || 0.0).toLocaleString('en-US')}
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
                  {(council?.bussingPurseBalance || 0.0).toLocaleString(
                    'en-US'
                  )}
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
            onClick={() => navigate('/accounts/request-expense')}
          >
            Request Expense
          </Button>
          <Button variant="secondary" className="text-start py-3">
            Expense History
          </Button>
          <Button variant="secondary" className="text-start py-3">
            Download Expense Report
          </Button>
        </div>
      </Container>
    </ApolloWrapper>
  )
}

export default AccountsLandingPage
