import { MemberContext } from 'contexts/MemberContext'
import React, { useContext } from 'react'

const CurrencySpan = ({
  number,
  className,
}: {
  number: number
  className?: string
}) => {
  const { currentUser } = useContext(MemberContext)

  if (number !== null && number >= 0) {
    return (
      <span className={className}>
        <span>{number} </span>
        <span className="small">{currentUser.currency}</span>
      </span>
    )
  } else {
    return <span></span>
  }
}

export default CurrencySpan
