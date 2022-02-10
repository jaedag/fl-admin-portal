import React, { useContext } from 'react'
import { MemberContext } from 'contexts/MemberContext'
import { Button } from 'react-bootstrap'

const TrendsButton = () => {
  const { theme } = useContext(MemberContext)
  return (
    <Button
      variant="secondary"
      className={`${theme}`}
      style={{
        textAlign: 'left',
        paddingLeft: '15px',
      }}
      //style={{ padding: '19px 58px' }}
      //size="xs"
    >
      <div className="pb-3 pt-2">
        <div style={{ fontSize: '16px', letterSpacing: '1px' }}>
          TOTAL KORLEBU COUNCIL
        </div>
      </div>
      <div className="d-grid gap-1 pb-2">
        <div style={{ fontSize: '14px' }}>Total Offering Bags: 17/27</div>
        <div className="progress bg-secondary" style={{ height: '13px' }}>
          <div
            className="progress-bar"
            role="progressbar"
            aria-valuenow="25"
            aria-valuemin="0"
            aria-valuemax="100"
            style={{ width: '25%' }}
          >
            25%
          </div>
        </div>
        <div style={{ fontSize: '14px' }}>Total Pulpits: 12/16</div>
        <div className="progress bg-secondary" style={{ height: '13px' }}>
          <div
            className="progress-bar"
            role="progressbar"
            aria-valuenow="80"
            aria-valuemin="0"
            aria-valuemax="100"
            style={{ width: '80%' }}
          >
            80%
          </div>
        </div>
      </div>
    </Button>
  )
}

export default TrendsButton
