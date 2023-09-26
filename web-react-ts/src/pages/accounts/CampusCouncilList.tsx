import { useQuery } from '@apollo/client'
import { ChurchContext } from 'contexts/ChurchContext'
import React, { useContext } from 'react'
import { CAMPUS_BY_COUNCIL_ACCOUNTS } from './accountsGQL'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { Button, Container } from 'react-bootstrap'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import { CouncilForAccounts, StreamForAccounts } from './accounts-types'
import HeadingSecondary from 'components/HeadingSecondary'
import { useNavigate } from 'react-router'
import CurrencySpan from 'components/CurrencySpan'

const CampusCouncilList = ({
  link,
}: {
  link:
    | '/accounts/council/make-deposit'
    | '/accounts/council/dashboard'
    | '/accounts/campus/bussing-expense-entry'
}) => {
  const { campusId, clickCard } = useContext(ChurchContext)
  const navigate = useNavigate()

  const { data, loading, error } = useQuery(CAMPUS_BY_COUNCIL_ACCOUNTS, {
    variables: {
      id: campusId,
    },
  })

  const campus = data?.campuses[0]

  return (
    <ApolloWrapper data={data} loading={loading} error={error}>
      <Container>
        <HeadingPrimary>Update Council Balances</HeadingPrimary>
        <HeadingSecondary>{`${campus?.name} ${campus?.__typename}`}</HeadingSecondary>

        {campus?.streams.map((stream: StreamForAccounts) => {
          // arrange in alphabetical order of council.leader.fullName and council.name
          const councils = [...stream.councils].sort(
            (a: CouncilForAccounts, b: CouncilForAccounts) => {
              if (a.leader.fullName < b.leader.fullName) {
                return -1
              }
              if (a.leader.fullName > b.leader.fullName) {
                return 1
              }
              return 0
            }
          )

          return (
            <div key={stream.id} className="d-grid gap-2">
              <div className="fs-4 text-info">{stream.name} Councils</div>
              {stream.councils.length === 0 && (
                <Button className="text-start py-3" disabled>
                  There are no councils under this stream
                </Button>
              )}

              {councils.map((council: CouncilForAccounts) => (
                <div
                  key={council.id}
                  onClick={() => {
                    clickCard(council)
                    navigate(link)
                  }}
                  className="d-grid"
                >
                  <Button className="text-start">
                    {council.name} - {council.leader.fullName}
                  </Button>

                  <Button variant="outline-light" className="text-start">
                    Weekday Account -{' '}
                    <CurrencySpan number={council.currentBalance} />
                    <div>
                      Bussing Purse -{' '}
                      <CurrencySpan number={council.bussingPurseBalance} />
                    </div>
                  </Button>
                </div>
              ))}
            </div>
          )
        })}
      </Container>
    </ApolloWrapper>
  )
}

export default CampusCouncilList
