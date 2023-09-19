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
import '../../components/members-grids/MemberTable.css'
import './MemberDisplayCard.css'
import { TelephoneFill, Whatsapp } from 'react-bootstrap-icons'
import CloudinaryImage from 'components/CloudinaryImage'
import { USER_PLACEHOLDER } from 'global-utils'
import { ChurchLevel } from 'global-types'
import useSetUserChurch from 'hooks/useSetUserChurch'
import { BsEyeFill, BsMusicNote } from 'react-icons/bs'

type MemberDisplayCardProps = {
  member: {
    __typename: string | ChurchLevel
    id: string
    name?: string
    firstName?: string
    lastName?: string
    nameWithTitle?: string
    pictureUrl?: string
    fellowship?: {
      id: string
      name: string
    }
    ministry?: {
      id: string
      name: string
    }
    leader?: {
      id: string
      nameWithTitle: string
      pictureUrl?: string
    }
  }
  leader?: {
    id: string
    nameWithTitle: string
    phoneNumber: string
    whatsappNumber: string
    pictureUrl: string
  }
  attendance?: number
  onClick?: () => void
  contact?: boolean
  children?: React.ReactNode
}

const Icons = ({ icon, className }: { icon: string; className: string }) => {
  return (
    <div className={className}>
      {icon === 'fellowship' && <FellowshipIcon />}
      {icon === 'bacenta' && <BacentaIcon />}
      {icon === 'constituency' && <ConstituencyIcon />}
      {icon === 'council' && <CouncilIcon />}
      {icon === 'stream' && <StreamIcon />}
      {icon === 'oversight' && <BsEyeFill />}
      {icon === 'hubfellowship' && <BsMusicNote />}
      {icon === 'bus' && <BusIcon />}
    </div>
  )
}

const MemberDisplayCard = (props: MemberDisplayCardProps) => {
  const { member, leader, children, ...rest } = props
  const { clickCard } = useContext(ChurchContext)
  const { setUserFinancials } = useSetUserChurch()
  const navigate = useNavigate()
  let icon: string = ''
  let name: string = member.name + ' ' + member.__typename
  let details: string[] = [member?.leader?.nameWithTitle || '']

  const noPicture =
    !member?.pictureUrl && !leader?.pictureUrl && !member?.leader?.pictureUrl
  let picture =
    member?.pictureUrl ||
    leader?.pictureUrl ||
    member?.leader?.pictureUrl ||
    USER_PLACEHOLDER

  switch (member.__typename) {
    case 'Member':
      name = member?.nameWithTitle || member.firstName + ' ' + member.lastName
      details = [
        member.fellowship ? member.fellowship.name + ' Fellowship' : '',
        member.ministry ? member.ministry.name : '',
      ]
      break
    case 'Fellowship':
      icon = 'fellowship'
      break
    case 'Bacenta':
      icon = 'bacenta'
      break

    case 'Constituency':
      icon = 'constituency'
      break
    case 'HubFellowship':
      icon = 'hubfellowship'
      break
    case 'Hub':
    case 'Council':
      icon = 'council'
      break
    case 'Ministry':
    case 'Stream':
      icon = 'stream'
      break
    case 'CreativeArts':
    case 'Campus':
      icon = 'stream'
      break
    case 'Oversight':
      icon = 'oversight'
      break
    default:
      icon = 'stream'
      break
  }

  const clickFunction = () => {
    clickCard(member)
    if (member.__typename === 'Campus') {
      setUserFinancials(member)
    }
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
                alt={member.nameWithTitle}
                className={`${picture && 'rounded-circle'} img-search`}
              />
            )}
          </div>
          <div className="flex-grow-1 ms-3">
            <Card.Title>{name}</Card.Title>
            <div className={`text-secondary mb-0 `}>
              {details?.length &&
                details.map((detail, i) => (
                  <div key={i}>
                    <span>{detail}</span>
                    <br />
                  </div>
                ))}
            </div>
            <div>{children}</div>
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
