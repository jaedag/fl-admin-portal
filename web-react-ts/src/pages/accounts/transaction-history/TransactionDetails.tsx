import { useQuery } from '@apollo/client'
import { ChurchContext } from 'contexts/ChurchContext'
import { useContext } from 'react'
import { GET_TRANSACTION_DETAILS } from './transactionHistory'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { Button, Container } from 'react-bootstrap'
import { AccountTransaction } from './transaction-types'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import { useNavigate } from 'react-router'
import TransactionCard from '../TransactionCard'

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
        <TransactionCard transaction={transaction} />
        <div className="text-center mt-5">
          <Button
            variant="success"
            className="px-5"
            onClick={() => navigate('/accounts/council/transaction-history')}
          >
            Go Back
          </Button>
        </div>
      </Container>
    </ApolloWrapper>
  )
}

export default TransactionDetails
