import React, { useContext } from 'react'
import { MemberContext } from 'contexts/MemberContext'
import { Button } from 'react-bootstrap'
import './TrendsButton.css'
import ProgressBar from './ProgressBar'
import { useNavigate } from 'react-router'

const TrendsButton = (props) => {
  const { theme } = useContext(MemberContext)
  const navigate = useNavigate()

  const data = props.data
  const constituencies = data?.constituencies[0]

  const offeringBags = constituencies?.offeringBags
  const pulpits = constituencies?.pulpits
  const name = constituencies?.name
  const total = constituencies?.activeFellowshipCount * 2
  const offeringBagsPercentage = ((offeringBags / total) * 100).toFixed()
  const pulpitsPercentage = ((pulpits / 1) * 100).toFixed()

  return (
    <Button
      variant="secondary"
      className={`${theme} button`}
      onClick={() =>
        navigate(`/campaigns/constituency/equipment/trends/fellowship`)
      }
    >
      <div className="pb-3 pt-2">
        <div className="text">TOTAL {name.toUpperCase()}</div>
      </div>
      <div className="d-grid gap-1 pb-2">
        <div className="lowercase-text">
          Total Offering Bags: {offeringBags}/{total}
        </div>
        <ProgressBar percentage={offeringBagsPercentage} />
        <div className="lowercase-text">
          Total Pulpits: {pulpits}/{1}
        </div>
        <ProgressBar percentage={pulpitsPercentage} />
      </div>
    </Button>
  )
}

export default TrendsButton
