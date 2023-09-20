import { useQuery } from '@apollo/client'
import { ChurchContext } from 'contexts/ChurchContext'
import React, { useContext } from 'react'
import { GET_TRANSACTION_DETAILS } from './transactionHistory'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { AccountLog } from './transaction-types'
import CurrencySpan from 'components/CurrencySpan'
import { getHumanReadableDateTime } from '@jaedag/admin-portal-types'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'

const TransactionDetails = () => {
  const { transactionId } = useContext(ChurchContext)

  const { data, loading, error } = useQuery(GET_TRANSACTION_DETAILS, {
    variables: { id: transactionId },
  })

  const transaction: AccountLog = data?.accountLogs[0]

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
                <CurrencySpan number={transaction?.amount} />
              </Col>
            </Row>
            <Row className="mb-3 d-flex align-items-center">
              <Col className="text-secondary col-4">Category</Col>
              <Col>{transaction?.category}</Col>
            </Row>
            <Row className="mb-3 d-flex align-items-center">
              <Col className="text-secondary col-4">Description</Col>
              <Col>{transaction?.historyRecord}</Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </ApolloWrapper>
  )
}

export default TransactionDetails
