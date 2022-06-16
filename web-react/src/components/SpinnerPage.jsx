import React from 'react'
import { Spinner } from 'react-bootstrap'
import './SpinnerPage.css'

function SpinnerPage() {
  return (
    <div className="row align-items-center center-page">
      <div className="col text-center">
        <Spinner animation="grow" size="lg" className="spinner-large" />
      </div>
    </div>
  )
}

export default SpinnerPage
