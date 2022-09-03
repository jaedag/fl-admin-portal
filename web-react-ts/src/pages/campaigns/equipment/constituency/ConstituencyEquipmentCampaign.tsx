import React, { useContext } from 'react'
import { Container } from 'react-bootstrap'
import MenuButton from '../../components/buttons/MenuButton'
import { useNavigate } from 'react-router'
import { MemberContext } from 'contexts/MemberContext'
import { CONSTITUENCY_LATEST_EQUIPMENT_RECORD } from 'pages/campaigns/CampaignQueries'
import { useQuery } from '@apollo/client'
import { ChurchContext } from 'contexts/ChurchContext'
import RoleView from 'auth/RoleView'
import { permitAdmin } from 'permission-utils'

const ConstituencyEquipmentCampaign = () => {
  const { currentUser } = useContext(MemberContext)
  const navigate = useNavigate()

  const church = currentUser.currentChurch
  const churchType = currentUser.currentChurch?.__typename
  const { constituencyId } = useContext(ChurchContext)

  const { data } = useQuery(CONSTITUENCY_LATEST_EQUIPMENT_RECORD, {
    variables: {
      constituencyId: constituencyId,
    },
  })

  const constituencyEquipmentRecord = data?.constituencies[0]?.equipmentRecord

  return (
    <div className="d-flex align-items-center justify-content-center ">
      <Container>
        <div className="text-center">
          <h1 className="mb-1 text-secondary">Equipment Campaign</h1>
          <h6>{`${church?.name} ${churchType}`}</h6>
        </div>

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
