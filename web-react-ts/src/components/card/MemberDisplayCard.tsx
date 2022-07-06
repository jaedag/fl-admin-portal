import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChurchContext } from 'contexts/ChurchContext'
import BusIcon from 'assets/icons/BusIcon'
import FellowshipIcon from 'assets/icons/FellowshipIcon'
import BacentaIcon from 'assets/icons/BacentaIcon'
import ConstituencyIcon from 'assets/icons/ConstituencyIcon'
import CouncilIcon from 'assets/icons/CouncilIcon'
import StreamIcon from 'assets/icons/StreamIcon'
import { Button, Card } from 'react-bootstrap'
import { MemberContext } from 'contexts/MemberContext'
import '../../components/members-grids/MemberTable.css'
import './MemberDisplayCard.css'
import { TelephoneFill, Whatsapp } from 'react-bootstrap-icons'
import CloudinaryImage from 'components/CloudinaryImage'
import { USER_PLACEHOLDER } from 'global-utils'

type MemberDisplayCardProps = {
  member: {
    __typename: string
    id: string
    name?: string
    firstName: string
    lastName: string
    fullName: string
    pictureUrl: string
    fellowship: {
      id: string
      name: string
    }
    ministry: {
      id: string
      name: string
    }
    leader?: {
      id: string
      fullName: string
    }
  }
  leader?: {
    id: string
    fullName: string
    phoneNumber: string
    whatsappNumber: string
    pictureUrl: string
  }
  onClick?: () => void
  contact?: boolean
}

const Icons = ({ icon, className }: { icon: string; className: string }) => {
  return (
    <div className={className}>
      {icon === 'fellowship' && <FellowshipIcon />}
      {icon === 'bacenta' && <BacentaIcon />}
      {icon === 'constituency' && <ConstituencyIcon />}
      {icon === 'council' && <CouncilIcon />}
      {icon === 'stream' && <StreamIcon />}
      {icon === 'bus' && <BusIcon />}
    </div>
  )
}

const MemberDisplayCard = (props: MemberDisplayCardProps) => {
  const { member, leader, ...rest } = props
  const { clickCard } = useContext(ChurchContext)
  const { theme } = useContext(MemberContext)
  const navigate = useNavigate()
  let icon: string = ''
  let name: string | undefined
  let details: string[] = []

  const noPicture = !member?.pictureUrl && !leader?.pictureUrl
  let picture = member?.pictureUrl || leader?.pictureUrl || USER_PLACEHOLDER

  switch (member.__typename) {
    case 'Member':
      name = member?.fullName || member.firstName + ' ' + member.lastName
      details = [
        member.fellowship && member.fellowship.name + ' Fellowship',
        member.ministry && member.ministry.name,
      ]
      break
    case 'Fellowship':
      icon = 'fellowship'
      name = member.name + ' Fellowship'
      details = [member?.leader?.fullName || '']
      break
    case 'Bacenta':
      icon = 'bacenta'
      name = member.name + ' Bacenta'
      details = [member?.leader?.fullName || '']
      break

    case 'Constituency':
      icon = 'constituency'
      name = member.name + ' Constituency'
      details = [member?.leader?.fullName || '']
      break
    case 'Council':
      icon = 'council'
      name = member.name + ' Council'
      details = [member?.leader?.fullName || '']
      break
    case 'Stream':
      icon = 'stream'
      name = member.name + ' Stream'
      details = [member?.leader?.fullName || '']
      break
    case 'GatheringService':
      icon = 'stream'
      name = member.name + ' Gathering Service'
      details = [member?.leader?.fullName || '']
      break
    case 'Sonta':
      icon = 'stream'
      name = member.name + ' Sonta'
      details = [member?.leader?.fullName || '']
      break
    default:
      break
  }

  const clickFunction = () => {
    clickCard(member)
    navigate(`/${member.__typename.toLowerCase()}/displaydetails`)
  }

  return (
    <Card className="mobile-search-card">
      <Card.Body {...rest} onClick={props.onClick || clickFunction}>
        <div className="d-flex align-items-center">
          <div className="flex-shrink-0">
            {noPicture && member.__typename !== 'Member' ? (
              <Icons
                className={`${picture && 'rounded-circle'} img-search`}
                icon={icon}
              />
            ) : (
              <CloudinaryImage
                src={picture}
                alt={member.fullName}
                className={`${picture && 'rounded-circle'} img-search`}
              />
            )}
          </div>
          <div className="flex-grow-1 ms-3">
            <Card.Title>{name}</Card.Title>
            <div className={`text-secondary mb-0 ${theme}`}>
              {details?.length &&
                details.map((detail, i) => (
                  <div key={i}>
                    <span>{detail}</span>
                    <br />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </Card.Body>
      {props.contact && (
        <Card.Footer>
          <div className="d-flex align-items-center">
            <a href={`tel:${leader?.phoneNumber}`}>
              <Button variant="primary">
                <TelephoneFill /> Call
              </Button>
            </a>
            <a
              href={`https://wa.me/${leader?.whatsappNumber}`}
              className="ms-3"
            >
              <Button variant="success">
                <Whatsapp /> WhatsApp
              </Button>
            </a>
          </div>
        </Card.Footer>
      )}
    </Card>
  )
}

export default MemberDisplayCard
