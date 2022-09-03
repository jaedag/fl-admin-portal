import React, { useContext } from 'react'
import { Container } from 'react-bootstrap'
import MenuButton from '../../components/buttons/MenuButton'
import { useNavigate } from 'react-router'
import { MemberContext } from 'contexts/MemberContext'
import { FELLOWSHIP_LATEST_EQUIPMENT_RECORD } from 'pages/campaigns/CampaignQueries'
import { useQuery } from '@apollo/client'
import { ChurchContext } from 'contexts/ChurchContext'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'

const FellowshipEquipmentCampaign = () => {
  const { currentUser } = useContext(MemberContext)
  const navigate = useNavigate()

  const church = currentUser.currentChurch
  const churchType = currentUser.currentChurch?.__typename
  const { fellowshipId } = useContext(ChurchContext)

  const { data } = useQuery(FELLOWSHIP_LATEST_EQUIPMENT_RECORD, {
    variables: {
      fellowshipId: fellowshipId,
    },
  })

  const fellowshipEquipmentRecord = data?.fellowships[0]?.equipmentRecord

  return (
    <div className="d-flex align-items-center justify-content-center ">
      <Container>
        <div className="text-center">
          <HeadingPrimary>{`${church?.name} ${churchType}`}</HeadingPrimary>
          <HeadingSecondary>Equipment Campaign</HeadingSecondary>
        </div>
        <div className="d-grid gap-2 mt-4 text-center px-4">
          {fellowshipEquipmentRecord === null && (
            <MenuButton
              name="Fill Campaign Form"
              onClick={() => navigate(`/campaigns/fellowship/equipment/form`)}
            />
          )}

          <MenuButton
            name="View Trends"
            onClick={() => navigate(`/campaigns/fellowship/equipment/trends`)}
          />
        </div>
      </Container>
    </div>
  )
}

export default FellowshipEquipmentCampaign
