import React from 'react'
import { Spinner } from 'react-bootstrap'

const BtnSubmitText = ({ loading }: { loading: boolean }) => {
  return (
    <div>
      {loading ? (
        <>
          <Spinner animation="grow" size="sm" />
          <span> Submitting</span>
        </>
      ) : (
        `Yes, I'm sure`
      )}
    </div>
  )
}

export default BtnSubmitText
