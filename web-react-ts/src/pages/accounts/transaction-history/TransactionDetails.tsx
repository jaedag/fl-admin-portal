import { useQuery } from '@apollo/client'
import { ChurchContext } from 'contexts/ChurchContext'
import React, { useContext } from 'react'
import { GET_TRANSACTION_DETAILS } from './transactionHistory'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { Badge, Button, Card, Col, Container, Row } from 'react-bootstrap'
import { AccountTransaction } from './transaction-types'
import CurrencySpan from 'components/CurrencySpan'
import { getHumanReadableDateTime } from '@jaedag/admin-portal-types'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import { useNavigate } from 'react-router'

const TransactionDetails = () => {
  const { transactionId } = useContext(ChurchContext)
  const navigate = useNavigate()
  const { data, loading, error } = useQuery(GET_TRANSACTION_DETAILS, {
    variables: { id: transactionId },
  })

  const transaction: AccountTransaction = data?.accountTransactions[0]

  return (
    <ApolloWrapper data={data} loading={loading} error={error}>
      <Container>
        <HeadingPrimary>Transaction Details</HeadingPrimary>
        <hr />
        <Card>
          <Card.Body>
            <Row className="mb-3 d-flex align-items-center">
              <Col className="text-secondary col-4">Date</Col>
              <Col>{getHumanReadableDateTime(transaction?.timestamp)}</Col>
            </Row>
            <Row className="mb-3 d-flex align-items-center">
              <Col className="text-secondary col-4">Created By</Col>
              <Col>{transaction?.loggedBy.fullName}</Col>
            </Row>
            <Row className="mb-3 d-flex align-items-center">
              <Col className="text-secondary col-4">Amount</Col>
              <Col>
                <CurrencySpan
                  number={transaction?.amount}
                  className="text-primary"
                />
              </Col>
            </Row>
            <Row className="mb-3 d-flex align-items-center">
              <Col className="text-secondary col-4">Category</Col>
              <Col>{transaction?.category}</Col>
            </Row>
            <Row className="mb-3 d-flex align-items-center">
              <Col className="text-secondary col-4">Description</Col>
              <Col>{transaction?.description}</Col>
            </Row>
            <Row className="mb-3 d-flex align-items-center">
              <Col className="text-secondary col-4">Status</Col>
              <Col>
                <Badge
                  className="text-uppercase"
                  text={
                    transaction?.status === 'pending approval'
                      ? 'dark'
                      : 'light'
                  }
                  bg={
                    transaction?.status === 'pending approval'
                      ? 'warning'
                      : transaction?.status === 'declined'
                      ? 'danger'
                      : 'success'
                  }
                >
                  {transaction?.status}
                </Badge>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <div className="text-center mt-5">
          <Button
            variant="success"
            className="px-5"
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
        </div>
      </Container>
    </ApolloWrapper>
  )
}

export default TransactionDetails
