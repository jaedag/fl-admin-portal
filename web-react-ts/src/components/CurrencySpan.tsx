import React from 'react'

const CurrencySpan = ({ number }: { number: number }) => {
  if (number >= 0) {
    return (
      <>
        <span>{number} </span>
        <span className="small">GHS</span>
      </>
    )
  } else {
    return <span></span>
  }
}

export default CurrencySpan
