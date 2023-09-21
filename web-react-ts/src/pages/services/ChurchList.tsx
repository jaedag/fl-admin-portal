import MenuButton from 'components/buttons/MenuButton'
import { ChurchContext } from 'contexts/ChurchContext'
import { MemberContext } from 'contexts/MemberContext'
import useSetUserChurch from 'hooks/useSetUserChurch'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router'
import People2Icon from 'assets/icons/People2'
import { Church, UserRole } from 'global-types'

const ChurchList = ({
  color,
  link,
  includeVacation,
}: {
  color:
    | 'defaulters'
    | 'arrivals'
    | 'campaigns'
    | 'quick-facts'
    | 'churches'
    | 'maps'
    | 'accounts'
  link?: string
  includeVacation?: boolean
}) => {
  const { userJobs } = useContext(MemberContext)
  const { clickCard } = useContext(ChurchContext)
  const { setUserChurch, setUserFinancials } = useSetUserChurch()
  const navigate = useNavigate()

  return (
    <div className="d-grid gap-2 text-left">
      {userJobs.length ? (
        userJobs.map((role: UserRole) =>
          role.church
            .filter((church: Church) => {
              if (color === 'campaigns') return true
              if (includeVacation) return true
              return church?.vacationStatus !== 'Vacation'
            })
            .map((church: Church) => {
              if (color === 'arrivals') {
                if (
                  ![
                    'Bacenta',
                    'Constituency',
                    'Council',
                    'Stream',
                    'Campus',
                  ].includes(church.__typename)
                ) {
                  return null
                }
              }
              if (color === 'defaulters') {
                if (
                  ![
                    'Constituency',
                    'Council',
                    'Stream',
                    'Campus',
                    'CreativeArts',
                    'Ministry',
                    'Hub',
                  ].includes(church.__typename)
                ) {
                  return null
                }
              }

              if (color === 'accounts') {
                if (!['Council', 'Campus'].includes(church.__typename)) {
                  return null
                }
              }

              return (
                <MenuButton
                  key={church.id}
                  title={church.name}
                  iconComponent={People2Icon}
                  iconBg={true}
                  noCaption
                  iconCaption={church.__typename}
                  onClick={() => {
                    clickCard(church)

                    if (church.__typename === 'Campus') {
                      setUserFinancials(church)
                    } else {
                      setUserChurch(church)
                    }

                    if (color === 'arrivals') {
                      navigate(`/arrivals/${church.__typename.toLowerCase()}`)
                    } else if (color === 'quick-facts') {
                      navigate(
                        `/quick-facts/this-month/${church.__typename.toLowerCase()}`
                      )
                    } else if (color === 'campaigns') {
                      navigate(`/campaigns/${church.__typename.toLowerCase()}`)
                    } else if (color === 'maps') {
                      navigate(`/maps/${church.__typename.toLowerCase()}`)
                    } else if (color === 'accounts') {
                      navigate(
                        `/accounts/${church.__typename.toLowerCase()}/dashboard`
                      )
                    } else {
                      navigate(link || '#')
                    }
                  }}
                  color={color}
                />
              )
            })
        )
      ) : (
        <>
          <MenuButton color={color} />
          <MenuButton color={color} />
          <MenuButton color={color} />
          <MenuButton color={color} />
        </>
      )}
    </div>
  )
}

export default ChurchList
