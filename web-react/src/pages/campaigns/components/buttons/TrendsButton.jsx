import React, { useContext } from 'react'
import { MemberContext } from 'contexts/MemberContext'
import { Button } from 'react-bootstrap'
import './TrendsButton.css'
import ProgressBar from './ProgressBar'

const TrendsButton = (props) => {
  const { theme } = useContext(MemberContext)

  const data = props.data

  const offeringBags = data?.constituencies[0]?.offeringBags
  const pulpits = data?.constituencies[0]?.pulpits
  const name = data?.constituencies[0]?.name
  const total = data?.constituencies[0]?.activeFellowshipCount
  const offeringBagsPercentage = ((offeringBags / total) * 100).toFixed()
  const pulpitsPercentage = ((pulpits / total) * 100).toFixed()

  return (
    <Button variant="secondary" className={`${theme} button`}>
      <div className="pb-3 pt-2">
        <div className="text">TOTAL {name.toUpperCase()}</div>
      </div>
      <div className="d-grid gap-1 pb-2">
        <div className="lowercase-text">
          Total Offering Bags: {offeringBags}/{total}
        </div>
        <ProgressBar percentage={offeringBagsPercentage} />
        <div className="lowercase-text">
          Total Pulpits: {pulpits}/{total}
        </div>
        <ProgressBar percentage={pulpitsPercentage} />
      </div>
    </Button>
  )
}

export default TrendsButton
