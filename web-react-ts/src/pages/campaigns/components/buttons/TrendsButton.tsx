import React, { useContext } from 'react'
import { MemberContext } from 'contexts/MemberContext'
import { Button } from 'react-bootstrap'
import './TrendsButton.css'
import ProgressBar from './ProgressBar'
import { EquipmentChurch } from 'global-types'

export interface TrendsButtonProps {
  church: EquipmentChurch
  onClick?: () => void
}

const TrendsButton = (props: TrendsButtonProps) => {
  const { theme } = useContext(MemberContext)

  const church = props.church
  const churchType = church?.__typename

  const offeringBags = church?.equipmentRecord?.offeringBags
  const bluetoothSpeakers = church?.equipmentRecord?.bluetoothSpeakers
  const pulpits = church?.equipmentRecord.pulpits
  const name = church?.name
  const constituencyCount =
    churchType === 'Constituency' ? 1 : church?.constituencyCount
  const total = church?.activeFellowshipCount * 2
  const offeringBagsPercentage = Math.round((offeringBags / total) * 100)
  const pulpitsPercentage = Math.round((pulpits / constituencyCount) * 100)
  const bluetoothSpeakersPercentage = Math.round(
    (bluetoothSpeakers / church?.activeFellowshipCount) * 100
  )

  return (
    <Button
      variant="secondary"
      className={`${theme} button`}
      onClick={props.onClick}
    >
      <div className="pb-3 pt-2">
        <div className="text">
          {name.toUpperCase()} {churchType.toUpperCase()}
        </div>
      </div>
      <div className="d-grid gap-1 pb-2">
        <div className="lowercase-text text-secondary">
          Total Offering Bags: {offeringBags} / {total}
        </div>
        <ProgressBar percentage={offeringBagsPercentage} />
        <div className="lowercase-text text-secondary">
          Total Pulpits: {pulpits} / {constituencyCount}
        </div>
        <ProgressBar percentage={pulpitsPercentage} />
        <div className="lowercase-text text-secondary">
          Total Bluetooth Speakers: {bluetoothSpeakers} /{' '}
          {church?.activeFellowshipCount}
        </div>
        <ProgressBar percentage={bluetoothSpeakersPercentage} />
      </div>
    </Button>
  )
}

export default TrendsButton
