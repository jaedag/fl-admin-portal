import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import React from 'react'
import { Button, Container } from 'react-bootstrap'
import { useNavigate } from 'react-router'

const MidweekBankingHome = () => {
  const navigate = useNavigate()

  return (
    <Container>
      <HeadingPrimary>Midweek Banking Menu</HeadingPrimary>
      <div className="d-grid gap-2 mt-5">
        <Button
          variant="success"
          size="lg"
          onClick={() => navigate('/anagkazo/treasurer-select')}
        >
          Choose Treasurers
        </Button>
      </div>
    </Container>
  )
}

export default MidweekBankingHome
