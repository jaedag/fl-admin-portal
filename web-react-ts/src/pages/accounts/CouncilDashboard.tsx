import { useQuery } from '@apollo/client'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import { useContext } from 'react'
import { Button, Container } from 'react-bootstrap'
import { COUNCIL_ACCOUNT_DASHBOARD } from './accountsGQL'
import { ChurchContext } from 'contexts/ChurchContext'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import HeadingSecondary from 'components/HeadingSecondary'
import './accounts-colors.css'
import { useNavigate } from 'react-router'
import AccountBalanceCard from './components/AccountBalanceCard'

const CouncilDashboard = () => {
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

        <AccountBalanceCard church={council} variant="current-balance" />
        <AccountBalanceCard church={council} variant="bussing-purse" />

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

export default CouncilDashboard
