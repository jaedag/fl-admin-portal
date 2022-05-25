import { useLazyQuery } from '@apollo/client'
import { useAuth0 } from '@auth0/auth0-react'
import { GET_LOGGED_IN_USER } from 'components/UserProfileIcon/UserQueries'
import { MemberContext } from 'contexts/MemberContext'
import { capitalise } from 'global-utils'
import { useContext, useEffect } from 'react'

const useGetMemberByEmail = () => {
  const { user } = useAuth0()
  const { currentUser, setCurrentUser } = useContext(MemberContext)

  const [memberByEmail] = useLazyQuery(GET_LOGGED_IN_USER)

  useEffect(() => {
    if (!user?.email) return

    const fetchData = async () => {
      const response = await memberByEmail({ variables: { email: user.email } })
      const data = response.data
      const church = data.memberByEmail.stream_name

      setCurrentUser({
        ...currentUser,
        __typename: 'Member',
        id: data.memberByEmail.id,
        firstName: data.memberByEmail.firstName,
        lastName: data.memberByEmail.lastName,
        fullName:
          data.memberByEmail.firstName + ' ' + data.memberByEmail.lastName,
        picture: data.memberByEmail?.pictureUrl ?? null,
        fellowship: data.memberByEmail?.fellowship.id,
        bacenta: data.memberByEmail?.fellowship?.bacenta?.id,
        council:
          data.memberByEmail?.fellowship?.bacenta.constituency?.council.id,
        constituency: data.memberByEmail?.fellowship?.bacenta.constituency?.id,
        church: { church: church, subChurch: 'bacenta' },
        stream_name: capitalise(data?.memberByEmail?.stream_name),
        stream:
          data.memberByEmail?.fellowship?.bacenta.constituency?.council.stream
            .id,
        gatheringService:
          data.memberByEmail?.fellowship?.bacenta.constituency?.council.stream
            .gatheringService.id,
        email: user?.email,
        roles: user ? user[`https://flcadmin.netlify.app/roles`] : [],
      })
      // sessionStorage.setItem('currentUser', JSON.stringify({ ...currentUser }))
    }

    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.email])

  return
}

export default useGetMemberByEmail
