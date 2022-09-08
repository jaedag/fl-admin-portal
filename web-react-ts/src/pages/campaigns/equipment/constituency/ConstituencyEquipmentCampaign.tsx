import React, { useContext } from 'react'
import { Container } from 'react-bootstrap'
import MenuButton from '../../components/buttons/MenuButton'
import { useNavigate } from 'react-router'
import { MemberContext } from 'contexts/MemberContext'
import {
  CONSTITUENCY_LATEST_EQUIPMENT_RECORD,
  EQUIPMENT_END_DATE,
} from 'pages/campaigns/CampaignQueries'
import { useQuery } from '@apollo/client'
import { ChurchContext } from 'contexts/ChurchContext'
import RoleView from 'auth/RoleView'
import { permitAdmin } from 'permission-utils'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import { getHumanReadableDate } from 'jd-date-utils'

const ConstituencyEquipmentCampaign = () => {
  const { currentUser } = useContext(MemberContext)
  const navigate = useNavigate()

  const church = currentUser.currentChurch
  const churchType = currentUser.currentChurch?.__typename
  const { constituencyId } = useContext(ChurchContext)
  const gatheringServiceId = currentUser?.gatheringService

  const { data } = useQuery(CONSTITUENCY_LATEST_EQUIPMENT_RECORD, {
    variables: {
      constituencyId: constituencyId,
    },
  })

  const constituencyEquipmentRecord = data?.constituencies[0]?.equipmentRecord

  const { data: equipmentEndDateData } = useQuery(EQUIPMENT_END_DATE, {
    variables: {
      gatheringServiceId: gatheringServiceId,
    },
  })

  const equipmentEndDate =
    equipmentEndDateData?.gatheringServices[0]?.equipmentEndDate

  return (
    <div className="d-flex align-items-center justify-content-center ">
      <Container>
        <div className="text-center">
          <HeadingPrimary>{`${church?.name} ${churchType}`}</HeadingPrimary>
          <HeadingSecondary>Equipment Campaign</HeadingSecondary>
        </div>
        <h6 className="text-danger text-center">
          Current Deadline : {getHumanReadableDate(equipmentEndDate)}{' '}
        </h6>
        <div className="d-grid gap-2 mt-4 text-center px-4">
          {constituencyEquipmentRecord?.pulpits === null && (
            <MenuButton
              name="Fill Campaign Form"
              onClick={() => navigate(`/campaigns/constituency/equipment/form`)}
            />
          )}

          <MenuButton
            name="View Trends"
            onClick={() => navigate(`/campaigns/constituency/equipment/trends`)}
          />
          <RoleView roles={permitAdmin('Constituency')}>
            <MenuButton
              name="Defaulters"
              onClick={() =>
                navigate('/campaigns/constituency/equipment/defaulters')
              }
            />
          </RoleView>
        </div>
      </Container>
    </div>
  )
}

export default ConstituencyEquipmentCampaign
