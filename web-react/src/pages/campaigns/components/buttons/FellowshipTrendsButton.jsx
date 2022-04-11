import React, { useContext } from 'react'
import { MemberContext } from 'contexts/MemberContext'
import { Button } from 'react-bootstrap'
import './TrendsButton.css'
import ProgressBar from './ProgressBar'

const FellowshipTrendsButton = (props) => {
  const { theme } = useContext(MemberContext)

  const fellowship = props.fellowship
  const name = fellowship?.name
  console.log(fellowship?.offeringBags)

  const offeringBags = fellowship?.offeringBags
  const offeringBagsPercentage = ((offeringBags / 2) * 100).toFixed()

  return (
    <Button variant="secondary" className={`${theme} button`}>
      <div className="pb-3 pt-2">
        <div className="text">{name} </div>
      </div>
      <div className="d-grid gap-1 pb-3">
        <div className="lowercase-text text-secondary">
          Total Offering Bags: {offeringBags} / 2
        </div>
        <ProgressBar percentage={offeringBagsPercentage} />
      </div>
    </Button>
  )
}

export default FellowshipTrendsButton
