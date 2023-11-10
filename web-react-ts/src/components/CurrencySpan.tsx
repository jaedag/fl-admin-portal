import { MemberContext } from 'contexts/MemberContext'
import React, { useContext } from 'react'

const CurrencySpan = ({
  number,
  className,
  negative,
}: {
  number: number
  className?: string
  negative?: boolean
}) => {
  const { currentUser } = useContext(MemberContext)

  if (number !== null && number >= 0) {
    return (
      <span className={className}>
        <span>{number.toFixed(2)} </span>
        <span className="small">{currentUser.currency}</span>
      </span>
    )
  } else if (negative) {
    return (
      <span className={className + ' red'}>
        <span>{number.toFixed(2)} </span>
        <span className="small">{currentUser.currency}</span>
      </span>
    )
  } else {
    return <span></span>
  }
}

export default CurrencySpan
