import { MemberContext } from 'contexts/MemberContext'
import { useContext } from 'react'

const VerifyNotMe = ({
  leaderId,
  children,
}: {
  leaderId: string
  children: JSX.Element
}) => {
  const { currentUser } = useContext(MemberContext)

  if (currentUser?.id === leaderId) {
    return <></>
  }

  return children
}

export default VerifyNotMe
