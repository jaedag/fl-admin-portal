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
import RoleView from 'auth/RoleView'
import { permitAdmin } from 'permission-utils'
import ApolloWrapper from 'components/base-component/ApolloWrapper'

const GatheringServiceEquipmentCampaign = () => {
  const { currentUser } = useContext(MemberContext)
  const navigate = useNavigate()

  const church = currentUser.currentChurch
  const gatheringServiceId = currentUser?.gatheringService

  const { data, loading, error } = useQuery(EQUIPMENT_END_DATE, {
    variables: {
      gatheringServiceId: gatheringServiceId,
    },
  })

  const equipmentEndDate = data?.gatheringServices[0]?.equipmentEndDate

  return (
    <ApolloWrapper loading={loading} data={data} error={error}>
      <div className="d-flex align-items-center justify-content-center ">
        <Container>
          <div className="text-center">
            <HeadingPrimary>{`${church?.name} Gathering Service`}</HeadingPrimary>
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
              onClick={() =>
                navigate(`/campaigns/gatheringservice/equipment/trends`)
              }
            />
            <MenuButton
              name="Set Deadline"
              onClick={() =>
                navigate(`/campaigns/gatheringservice/set-equipment-deadline`)
              }
            />
            <RoleView roles={permitAdmin('GatheringService')}>
              <MenuButton
                name="Defaulters"
                onClick={() =>
                  navigate('/campaigns/gatheringservice/equipment/defaulters')
                }
              />
            </RoleView>
          </div>
        </Container>
      </div>
    </ApolloWrapper>
  )
}

export default GatheringServiceEquipmentCampaign
