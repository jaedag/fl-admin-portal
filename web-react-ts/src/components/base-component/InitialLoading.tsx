import React from 'react'
import { Container, Spinner } from 'react-bootstrap'

const InitialLoading = ({ text }: { text?: string }) => {
  return (
    <div className="row align-items-center center-page bg dark">
      <div className="col text-center">
        <Spinner animation="border" className="spinner-large" variant="white" />
        <Container className="mt-5">
          <p>{text || 'Please wait while we log you in'}</p>
        </Container>
      </div>
    </div>
  )
}

export default InitialLoading
