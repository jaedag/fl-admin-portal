import { useQuery } from '@apollo/client'
import { ChurchContext } from 'contexts/ChurchContext'
import { useContext } from 'react'
import { GET_COUNCIL_TRANSACTION_HISTORY } from './transactionHistory'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import CurrencySpan from 'components/CurrencySpan'
import { CSVLink } from 'react-csv'
import { useNavigate } from 'react-router'
import { AccountLog } from './transaction-types'

const CouncilTransactionHistory = () => {
  const { councilId, clickCard } = useContext(ChurchContext)
  const { data, loading, error } = useQuery(GET_COUNCIL_TRANSACTION_HISTORY, {
    variables: { councilId },
  })
  const navigate = useNavigate()

  const council = data?.councils[0]

  const csvHeaders = [
    { label: 'Date', key: 'date' },
    { label: 'Type', key: 'type' },
    { label: 'Credit', key: 'credit' },
    { label: 'Debit', key: 'debit' },
    { label: 'Deposited By', key: 'depositedBy' },
    { label: 'History Record', key: 'historyRecord' },
  ]

  const csvData = council?.transactions.map((transaction: any) => ({
    date: new Date(transaction.timestamp).toISOString(),
    type: transaction.category,
    credit: transaction.category === 'Deposit' ? transaction.amount : null,
    debit: transaction.category !== 'Deposit' ? transaction.amount : null,
    depositedBy: transaction.depositedBy?.fullName,
    historyRecord: transaction.historyRecord,
  }))

  return (
    <ApolloWrapper data={data} loading={loading} error={error}>
      <Container>
        <HeadingPrimary>Transaction History</HeadingPrimary>
        <HeadingSecondary>
          {council?.name} {council?.__typename}
        </HeadingSecondary>

        <div className="d-flex justify-content-end">
          <Button variant="outline-success" size="sm">
            <CSVLink
              filename={`${council?.name} ${council?.__typename} Transaction History.csv`}
              headers={csvHeaders}
              data={csvData}
            >
              <span className="good">Export CSV</span>
            </CSVLink>
          </Button>
        </div>
        <hr />

        <Card className="mb-1 fw-bold">
          <Card.Header>
            <Row>
              <Col>Date</Col>
              <Col>Type</Col>
              <Col>Amount</Col>
            </Row>
          </Card.Header>
        </Card>

        {council?.transactions.map((transaction: AccountLog) => (
          <>
            <Card
              className="mb-1"
              onClick={() => {
                clickCard(transaction)
                navigate('/accounts/transaction-details')
              }}
            >
              <Card.Body className="py-1">
                <Row>
                  <Col>
                    {new Date(transaction.timestamp).toLocaleDateString(
                      'en-US',
                      { day: 'numeric', month: 'short', year: '2-digit' }
                    )}
                  </Col>
                  <Col>
                    <span>{transaction.category}</span>
                  </Col>
                  <Col>
                    <CurrencySpan
                      number={transaction.amount}
                      className={
                        transaction.category === 'Deposit' ? 'good' : 'bad'
                      }
                    />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </>
        ))}
      </Container>
    </ApolloWrapper>
  )
}

export default CouncilTransactionHistory
