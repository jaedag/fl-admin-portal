import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import React from 'react'
import { Button, Container } from 'react-bootstrap'
import { useNavigate } from 'react-router'

const CouncilDownloadReports = () => {
  const navigate = useNavigate()

  return (
    <Container>
      <HeadingPrimary>Download Reports</HeadingPrimary>
      <div>Choose a report to download</div>

      <Button onClick={() => navigate('/dowload-reports/council/membership')}>
        Download Council Membership
      </Button>
    </Container>
  )
}

export default CouncilDownloadReports
