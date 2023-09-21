import { useMutation, useQuery } from '@apollo/client'
import { ChurchContext } from 'contexts/ChurchContext'
import React, { useContext, useState } from 'react'
import {
  APPROVE_EXPENSE,
  DECLINE_EXPENSE,
  GET_COUNCIL_PENDING_APPROVAL_TRANSACTIONS,
} from './approvals-gql'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import { Button, Container } from 'react-bootstrap'
import { CouncilForAccounts } from '../accounts-types'
import TransactionCard from '../TransactionCard'
import { CheckCircleFill, XCircleFill } from 'react-bootstrap-icons'
import { throwToSentry } from 'global-utils'
import NoDataComponent from 'pages/arrivals/CompNoData'

const Approvals = () => {
  const { campusId } = useContext(ChurchContext)
  const [submitting, setSubmitting] = useState(false)
  const { data, loading, error, refetch } = useQuery(
    GET_COUNCIL_PENDING_APPROVAL_TRANSACTIONS,
    {
      variables: { campusId },
    }
  )
  const [approveExpense] = useMutation(APPROVE_EXPENSE)
  const [declineExpense] = useMutation(DECLINE_EXPENSE)

  const campus = data?.campuses[0]

  return (
    <ApolloWrapper data={data} loading={loading} error={error}>
      <Container>
        <HeadingPrimary>Pending Approvals</HeadingPrimary>
        <HeadingSecondary>{campus?.name}</HeadingSecondary>

        <div className="mt-4">
          {!campus?.councils.some(
            (council: CouncilForAccounts) => !!council.transactions.length
          ) && <NoDataComponent text="There are no pending approvals" />}

          {campus?.councils.map(
            (council: CouncilForAccounts, index: number) => (
              <>
                {!!council.transactions.length && (
                  <div className="fw-bold fs-4">{council.name}</div>
                )}

                <div>
                  {council.transactions.map((transaction: any) => (
                    <div className="mb-4">
                      <TransactionCard transaction={transaction} />
                      <div className="text-center mt-4">
                        <Button
                          className="px-3 me-2"
                          variant="success"
                          disabled={submitting}
                          onClick={async () => {
                            try {
                              setSubmitting(true)
                              await approveExpense({
                                variables: { transactionId: transaction.id },
                              })
                              await refetch()
                            } catch (err) {
                              throwToSentry(
                                'There was an error approving the transaction',
                                err
                              )
                            } finally {
                              setSubmitting(false)
                            }
                          }}
                        >
                          {submitting ? (
                            'Loading'
                          ) : (
                            <>
                              Approve <CheckCircleFill />
                            </>
                          )}
                        </Button>
                        <Button
                          className="px-3"
                          variant="danger"
                          disabled={submitting}
                          onClick={async () => {
                            try {
                              setSubmitting(true)
                              await declineExpense({
                                variables: { transactionId: transaction.id },
                              })
                              await refetch()
                            } catch (err) {
                              throwToSentry(
                                'There was an error declining the transaction',
                                err
                              )
                            } finally {
                              setSubmitting(false)
                            }
                          }}
                        >
                          {submitting ? (
                            'Loading'
                          ) : (
                            <>
                              Decline <XCircleFill />
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )
          )}
        </div>
      </Container>
    </ApolloWrapper>
  )
}

export default Approvals
