import { Card, Col, Row } from 'react-bootstrap'
import { CouncilForAccounts } from '../accounts-types'
import '../accounts-colors.css'

const AccountBalanceCard = ({
  church,
  variant,
}: {
  church: CouncilForAccounts
  variant: 'current-balance' | 'bussing-purse'
}) => {
  return (
    <Card className={`${variant} mb-2`}>
      <Card.Body>
        {variant === 'current-balance' && (
          <Row className="d-flex align-items-center text-light">
            <Col>Weekday Account Balance</Col>
            <Col>
              <p className="text-end mb-0 ">
                {(church?.currentBalance || 0.0).toLocaleString('en-US')}
              </p>
            </Col>
          </Row>
        )}
        {variant === 'bussing-purse' && (
          <Row className="d-flex align-items-center text-light">
            <Col>Bussing Society Balance</Col>
            <Col>
              <p className="text-end mb-0">
                {(church?.bussingPurseBalance || 0.0).toLocaleString('en-US')}
              </p>
            </Col>
          </Row>
        )}
      </Card.Body>
    </Card>
  )
}

export default AccountBalanceCard
