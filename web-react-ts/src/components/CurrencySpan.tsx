import React from 'react'

const CurrencySpan = ({
  number,
  className,
}: {
  number: number
  className?: string
}) => {
  if (number !== null && number >= 0) {
    return (
      <span className={className}>
        <span>{number} </span>
        <span className="small">GHS</span>
      </span>
    )
  } else {
    return <span></span>
  }
}

export default CurrencySpan
