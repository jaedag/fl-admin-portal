import React, { useContext } from 'react'
import { MemberContext } from 'contexts/MemberContext'
import { Button } from 'react-bootstrap'
import './TrendsButton.css'
import ProgressBar from './ProgressBar'

const TrendsButton = (props) => {
  const { theme } = useContext(MemberContext)

  const church = props.church
  const churchType = church?.__typename

  const offeringBags = church?.fellowshipEquipment?.offeringBags
  const bluetoothSpeakers = church?.fellowshipEquipment?.bluetoothSpeakers
  const pulpits = church?.pulpits
  const name = church?.name
  const constituencyCount =
    churchType === 'Constituency' ? 1 : church?.constituencyCount
  const total = church?.activeFellowshipCount * 2
  const offeringBagsPercentage = ((offeringBags / total) * 100).toFixed()
  const pulpitsPercentage = ((pulpits / constituencyCount) * 100).toFixed()
  const bluetoothSpeakersPercentage = ((bluetoothSpeakers / 1) * 100).toFixed()

  return (
    <Button
      variant="secondary"
      className={`${theme} button`}
      onClick={props.onClick}
    >
      <div className="pb-3 pt-2">
        <div className="text">
          TOTAL {name.toUpperCase()} {churchType.toUpperCase()}
        </div>
      </div>
      <div className="d-grid gap-1 pb-2">
        <div className="lowercase-text">
          Total Offering Bags: {offeringBags}/{total}
        </div>
        <ProgressBar percentage={offeringBagsPercentage} />
        <div className="lowercase-text">
          Total Pulpits: {pulpits}/{constituencyCount}
        </div>
        <ProgressBar percentage={pulpitsPercentage} />
        <div className="lowercase-text">
          Total Bluetooth Speakers: {bluetoothSpeakers}/{church?.activeFellowshipCount}
        </div>
        <ProgressBar percentage={bluetoothSpeakersPercentage} />
      </div>
    </Button>
  )
}

export default TrendsButton
