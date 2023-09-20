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
import { AccountTransaction } from './transaction-types'
import { BiCheckCircle } from 'react-icons/bi'
import { QuestionCircleFill } from 'react-bootstrap-icons'
import { BsXCircleFill } from 'react-icons/bs'

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
    { label: 'Status', key: 'success' },
    { label: 'Credit', key: 'credit' },
    { label: 'Debit', key: 'debit' },
    { label: 'Deposited By', key: 'depositedBy' },
    { label: 'Description', key: 'description' },
  ]

  const csvData = council?.transactions.map((transaction: any) => ({
    date: new Date(transaction.timestamp).toISOString(),
    type: transaction.category,
    success: transaction.status,
    credit: transaction.category === 'Deposit' ? transaction.amount : null,
    debit: transaction.category !== 'Deposit' ? transaction.amount : null,
    depositedBy: transaction.depositedBy?.fullName,
    description: transaction.description,
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
              <Col className="col-2 text-truncate">Status</Col>
            </Row>
          </Card.Header>
        </Card>

        {council?.transactions.map((transaction: AccountTransaction) => (
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
                  <Col className="col-2">
                    {transaction?.status === 'success' && (
                      <BiCheckCircle color="green" />
                    )}

                    {transaction?.status === 'pending approval' && (
                      <QuestionCircleFill color="yellow" />
                    )}

                    {transaction?.status === 'declined' && (
                      <BsXCircleFill color="red" />
                    )}
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
