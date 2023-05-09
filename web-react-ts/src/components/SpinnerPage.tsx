import React from 'react'
import { Spinner } from 'react-bootstrap'
import './SpinnerPage.css'

const SpinnerPage = () => {
  return (
    <div className="row align-items-center center-page">
      <div className="col text-center ">
        <Spinner animation="border" className="spinner-large" variant="white" />
      </div>
    </div>
  )
}

export default SpinnerPage
