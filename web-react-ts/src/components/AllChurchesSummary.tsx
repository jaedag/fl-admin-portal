import { Church, ChurchLevel } from 'global-types'
import React from 'react'
import { Container, Card, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './AllChurchesSummary.css'

type AllChurchesSummaryProps = {
  church: Church
  churchType: ChurchLevel
  numberOfChurchesBelow: number
  route: string
  memberCount: number
}

const AllChurchesSummary = (props: AllChurchesSummaryProps) => {
  const { church, churchType, numberOfChurchesBelow, route } = props

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <Card className="mb-2 card-border">
            <Card.Body className="summary-padding">
              <Row className="text-muted text-small">
                {churchType === 'Constituency'
                  ? 'Constituencies'
                  : `${churchType}s`}
              </Row>
              <Row className="number">{numberOfChurchesBelow}</Row>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="mb-2 card-border">
            <Link to={`/${route}/members`}>
              <Card.Body className="summary-padding">
                <Row className="text-muted text-small">Members</Row>
                <Row className="number">{props?.memberCount}</Row>
              </Card.Body>
            </Link>
          </Card>
        </Col>
        {churchType === 'Bacenta' ? (
          <Col>
            <Card className="mb-2 card-border">
              <Link to="/sonta/displayall">
                <Card.Body className="summary-padding">
                  <Row className="text-muted text-small">Sontas</Row>
                  <Row className="number">{church.sontas?.length}</Row>
                </Card.Body>
              </Link>
            </Card>
          </Col>
        ) : null}
      </Row>
    </Container>
  )
}

export default AllChurchesSummary
