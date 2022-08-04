import React, { useContext } from 'react'
import { MemberContext } from 'contexts/MemberContext'
import { Button } from 'react-bootstrap'
import './TrendsButton.css'
import ProgressBar from './ProgressBar'
import { TrendsButtonProps } from './TrendsButton'

const FellowshipTrendsButton = (props: TrendsButtonProps) => {
  const { theme } = useContext(MemberContext)

  const church = props.church
  const name = church?.name
  const churchType = church?.__typename
  const offeringBags = church?.fellowshipEquipment?.offeringBags
  const bluetoothSpeakers = church?.fellowshipEquipment?.bluetoothSpeakers

  const total =
    churchType === 'Fellowship' ? 2 : church?.activeFellowshipCount * 2
  const offeringBagsPercentage = Math.round((offeringBags / total) * 100)
  const bluetoothSpeakersPercentage = Math.round((bluetoothSpeakers / 1) * 100)

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
