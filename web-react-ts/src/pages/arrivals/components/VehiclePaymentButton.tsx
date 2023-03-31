import { ChurchContext } from 'contexts/ChurchContext'
import React, { useContext } from 'react'
import { Button } from 'react-bootstrap'
import { CheckCircleFill } from 'react-bootstrap-icons'
import { useNavigate } from 'react-router'
import { VehicleRecord } from '../arrivals-types'
import ButtonIcons from './ButtonIcons'
import CurrencySpan from 'components/CurrencySpan'

const VehicleButtonPayment = ({
  record,
  canFillOnTheWay,
  size,
  className,
}: {
  record: VehicleRecord
  canFillOnTheWay?: boolean | null
  size?: 'sm' | 'lg'
  className?: string
}) => {
  const { clickCard } = useContext(ChurchContext)
  const navigate = useNavigate()

  return (
    <Button
      key={record.id}
      variant={record?.transactionStatus === 'success' ? 'success' : 'warning'}
      size={size || 'lg'}
      className={`text-start ${className}`}
      disabled={record?.transactionStatus === 'success'}
      onClick={() => {
        clickCard(record)
        navigate('/bacenta/vehicle-details')
      }}
    >
      <ButtonIcons type={record?.vehicle} /> {record?.vehicle} (
      <CurrencySpan number={record?.vehicleTopUp} />)
      {record?.transactionStatus === 'success' ? (
        <CheckCircleFill className="ms-3" color="white" size={20} />
      ) : null}
    </Button>
  )
}

export default VehicleButtonPayment
