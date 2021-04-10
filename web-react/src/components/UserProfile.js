import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { useAuth0 } from '@auth0/auth0-react'
import { AuthButton } from './DashboardButton'
import { MemberContext } from '../contexts/MemberContext'
import { ChurchContext } from '../contexts/ChurchContext'
import { GET_LOGGED_IN_USER } from '../queries/SearchQuery'

function UserProfile() {
  const { user, isAuthenticated } = useAuth0()
  const { currentUser, setCurrentUser } = useContext(MemberContext)

  const { determineChurch, clickCard } = useContext(ChurchContext)
  useQuery(GET_LOGGED_IN_USER, {
    variables: {
      email: currentUser?.email,
    },
    onCompleted: (data) => {
      determineChurch(data.memberByEmail)
      setCurrentUser({
        ...currentUser,
        id: data.memberByEmail.id,
        firstName: data.memberByEmail.firstName,
        lastName: data.memberByEmail.lastName,
        constituency: data.memberByEmail.bacenta.centre?.town
          ? data.memberByEmail.bacenta.centre?.town.id
          : data.memberByEmail.bacenta.centre?.campus.id,
      })
    },
  })

  useEffect(() => {
    setCurrentUser({
      ...currentUser,
      email: user?.email,
      roles: user ? user[`https://flcadmin.netlify.app/roles`] : [],
    })
    // eslint-disable-next-line
  }, [isAuthenticated])

  return (
    <div>
      {isAuthenticated && (
        <Link
          className="nav-item nav-link d-flex align-items-center flex-column p-0 pb-2"
          to="#"
          onClick={() => {
            clickCard(currentUser)
          }}
          // onClick={() => logout({ returnTo: window.location.origin })}
        >
          <span>
            <img
              className="user-navbar-img "
              src={user ? user.picture : null}
              alt={user ? user.name : null}
            />
          </span>
          <span className="d-none d-md-inline">
            {user ? user.given_name : `Admin`}
          </span>
        </Link>
      )}
      {!isAuthenticated && (
        <div className="nav-item nav-link d-flex align-items-center flex-column">
          <AuthButton />
        </div>
      )}
    </div>
  )
}

export default UserProfile
