import React, { useContext } from 'react'
import { MemberContext } from 'contexts/MemberContext'
import { Button } from 'react-bootstrap'
import './TrendsButton.css'
import ProgressBar from './ProgressBar'

const FellowshipTrendsButton = (props) => {
  const { theme } = useContext(MemberContext)

  const church = props.church
  const name = church?.name
  const churchType = church?.__typename
  const offeringBags = church?.fellowshipEquipment?.offeringBags
  const bluetoothSpeakers = church?.fellowshipEquipment?.bluetoothSpeakers

  const total =
    churchType === 'Fellowship' ? 2 : church?.activeFellowshipCount * 2
  const offeringBagsPercentage = ((offeringBags / total) * 100).toFixed()
  const bluetoothSpeakersPercentage = ((bluetoothSpeakers / 1) * 100).toFixed()

  return (
    <Button
      variant="secondary"
      className={`${theme} button`}
      onClick={props.onClick}
    >
      <div className="pb-3 pt-2">
        <div className="text">
          {name.toUpperCase()} {churchType.toUpperCase()}{' '}
        </div>
      </div>
      <div className="d-grid gap-1 pb-3">
        <div className="lowercase-text text-secondary">
          Total Offering Bags: {offeringBags} / {total}
        </div>
        <ProgressBar percentage={offeringBagsPercentage} />
        <div className="lowercase-text text-secondary">
          Total Bluetooth Speakers: {bluetoothSpeakers} / {1}
        </div>
        <ProgressBar percentage={bluetoothSpeakersPercentage} />
      </div>
    </Button>
  )
}

export default FellowshipTrendsButton
