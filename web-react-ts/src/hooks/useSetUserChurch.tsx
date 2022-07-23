import { MemberContext } from 'contexts/MemberContext'
import { ChurchIdAndName } from 'global-types'
import { useContext } from 'react'

const useSetUserChurch = () => {
  const { currentUser, setCurrentUser } = useContext(MemberContext)

  const setUser = (church: ChurchIdAndName) => {
    setCurrentUser({
      ...currentUser,
      currentChurch: church,
    })

    sessionStorage.setItem(
      'currentUser',
      JSON.stringify({
        ...currentUser,
        currentChurch: church,
      })
    )
  }

  return { currentUser, setCurrentUser, setUser }
}

export default useSetUserChurch
