import { getHumanReadableDateTime } from '@jaedag/admin-portal-types'
import React, { useContext } from 'react'
import { Badge, Card, Col, Row } from 'react-bootstrap'
import { AccountTransaction } from './transaction-history/transaction-types'
import CurrencySpan from 'components/CurrencySpan'
import { ChurchContext } from 'contexts/ChurchContext'
import { useNavigate } from 'react-router'

const TransactionCard = ({
  transaction,
}: {
  transaction: AccountTransaction
}) => {
  const { clickCard } = useContext(ChurchContext)
  const navigate = useNavigate()
  return (
    <Card
      onClick={() => {
        clickCard(transaction)
        navigate('/accounts/transaction-details/')
      }}
    >
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
                transaction?.status === 'pending approval' ? 'dark' : 'light'
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
  )
}

export default TransactionCard
