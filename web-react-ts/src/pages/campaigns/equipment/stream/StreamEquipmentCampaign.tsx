import React, { useContext } from 'react'
import { Container } from 'react-bootstrap'
import MenuButton from '../../components/buttons/MenuButton'
import { useNavigate } from 'react-router'
import { MemberContext } from 'contexts/MemberContext'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import { EQUIPMENT_END_DATE } from 'pages/campaigns/CampaignQueries'
import { useQuery } from '@apollo/client'
import { getHumanReadableDate } from 'jd-date-utils'
import Placeholder from '../../../../components/Placeholder'

const StreamEquipmentCampaign = () => {
  const { currentUser } = useContext(MemberContext)
  const navigate = useNavigate()

  const church = currentUser.currentChurch
  const churchType = currentUser.currentChurch?.__typename
  const gatheringServiceId = currentUser?.gatheringService

  const { data, loading } = useQuery(EQUIPMENT_END_DATE, {
    variables: {
      gatheringServiceId: gatheringServiceId,
    },
  })

  const equipmentEndDate = data?.gatheringServices[0]?.equipmentEndDate

  return (
    <div className="d-flex align-items-center justify-content-center ">
      <Container>
        <div className="text-center">
          <HeadingPrimary>{`${church?.name} ${churchType}`}</HeadingPrimary>
          <HeadingSecondary>Equipment Campaign</HeadingSecondary>
        </div>
        <Placeholder as="h6" loading={loading} className="text-center">
          <h6 className="text-danger text-center">
            Current Deadline : {getHumanReadableDate(equipmentEndDate)}{' '}
          </h6>
        </Placeholder>
        <div className="d-grid gap-2 mt-4 text-center px-4">
          <MenuButton
            name="View Trends"
            onClick={() => navigate(`/campaigns/stream/equipment/trends`)}
          />
        </div>
      </Container>
    </div>
  )
}

export default StreamEquipmentCampaign
