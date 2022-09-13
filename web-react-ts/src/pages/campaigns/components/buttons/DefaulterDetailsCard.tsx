import { ChurchContext } from 'contexts/ChurchContext'
import { EquipmentRecord } from 'global-types'
import React, { useContext } from 'react'
import { Card, Button } from 'react-bootstrap'
import { TelephoneFill, Whatsapp } from 'react-bootstrap-icons'
import { useNavigate } from 'react-router'

type Admin = {
  firstName: string
  lastName: string
  whatsappNumber: string
  phoneNumber: string
}

export type EquipmentDefaulters = {
  constituencyCount: number
  constituencyEquipmentFilledCount: number
  constituencyEquipmentNotFilledCount: number
  fellowshipCount: number
  fellowshipEquipmentFilledCount: number
  fellowshipEquipmentNotFilledCount: number
  id: string
  name: string
  admin: Admin
  equipmentRecord: EquipmentRecord
  __typename: string
}

type DefaulterDetailsCardProps = {
  church: EquipmentDefaulters
  route: string
}

function DefaulterDetailsCard(props: DefaulterDetailsCardProps) {
  const church = props?.church
  const { clickCard } = useContext(ChurchContext)
  const navigate = useNavigate()

  return (
    <Card className="mt-2">
      <Card.Header className="fw-bold">{`${church?.name} ${church?.__typename}`}</Card.Header>
      <Card.Body
        onClick={() => {
          clickCard(church)
          props.route === 'constituency/fellowship'
            ? navigate('/campaigns/constituency/equipment/defaulters')
            : navigate(`/campaigns/${props.route}/equipment/defaulters`)
        }}
      >
        <div className="fw-bold">
          Fellowship Count: {church?.fellowshipCount}
        </div>
        {props.route === 'constituency/fellowship' ? null : (
          <div className="fw-bold">
            Constituency Count: {church?.constituencyCount}
          </div>
        )}

        <div className="text-success">
          Fellowship Filled Count: {church?.fellowshipEquipmentFilledCount}
        </div>
        {props.route === 'constituency/fellowship' ? (
          <div className="text-success">
            Constituency Filled:{' '}
            {church.equipmentRecord.pulpits === null ? 'No' : 'Yes'}
          </div>
        ) : (
          <div className="text-success">
            Constituency Filled Count:{' '}
            {church?.constituencyEquipmentFilledCount}
          </div>
        )}

        <div className="text-danger">
          Fellowship Not Filled Count:{' '}
          {church?.fellowshipEquipmentNotFilledCount}
        </div>
        {props.route === 'constituency/fellowship' ? null : (
          <div className="text-danger">
            Constituency Not Filled Count:{' '}
            {church?.constituencyEquipmentNotFilledCount}
          </div>
        )}
      </Card.Body>
      {church?.admin?.firstName === undefined &&
      church?.admin?.firstName === undefined ? null : (
        <Card.Footer>
          <div className="mb-2">
            Contact Admin:{' '}
            {`${church?.admin?.firstName} ${church?.admin?.lastName}`}{' '}
          </div>
          <a href={`tel:${church?.admin?.phoneNumber}`}>
            <Button variant="primary">
              <TelephoneFill /> Call
            </Button>
          </a>
          <a
            href={`https://wa.me/${church?.admin?.whatsappNumber}`}
            className="ms-3"
          >
            <Button variant="success">
              <Whatsapp /> WhatsApp
            </Button>
          </a>
        </Card.Footer>
      )}
    </Card>
  )
}

export default DefaulterDetailsCard
