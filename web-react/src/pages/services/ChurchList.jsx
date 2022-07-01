import MenuButton from 'components/buttons/MenuButton'
import { ChurchContext } from 'contexts/ChurchContext'
import { MemberContext } from 'contexts/MemberContext'
import useSetUserChurch from 'hooks/useSetUserChurch'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router'
import MemberIcon from '../../assets/people-svgrepo-com-2.svg'

const ChurchList = ({ color, link }) => {
  const { userJobs } = useContext(MemberContext)
  const { clickCard } = useContext(ChurchContext)
  const { setUser } = useSetUserChurch()
  const navigate = useNavigate()

  return (
    <div className="d-grid gap-2 text-left">
      {userJobs.length ? (
        userJobs.map((role) => {
          return role.church
            .filter((church) => {
              return church?.vacationStatus !== 'Vacation'
            })
            .map((church, index) => {
              if (color === 'arrivals') {
                if (['Fellowship'].includes(church.__typename)) {
                  return null
                }
              }
              if (color === 'defaulters') {
                if (['Fellowship', 'Bacenta'].includes(church.__typename)) {
                  return null
                }
              }
              return (
                <MenuButton
                  key={index}
                  title={church.name}
                  icon={MemberIcon}
                  iconBg={true}
                  noCaption
                  iconCaption={church.__typename}
                  onClick={() => {
                    clickCard(church)
                    setUser(church)

                    if (color === 'arrivals') {
                      navigate(`/arrivals/${church.__typename.toLowerCase()}`)
                    } else if (color === 'quick-facts') {
                      navigate(
                        `/quick-facts/this-month/${church.__typename.toLowerCase()}`
                      )
                    } else {
                      navigate(link)
                    }
                  }}
                  color={color}
                />
              )
            })
        })
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
