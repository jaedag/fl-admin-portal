import { ChurchContext } from 'contexts/ChurchContext'
import { MemberContext } from 'contexts/MemberContext'
import DefaultersCard, {
  EquipmentDefaulterProps,
} from 'pages/campaigns/components/buttons/DefaultersCard'
import React, { useContext } from 'react'
import { Container, Row } from 'react-bootstrap'
import { useQuery } from '@apollo/client'
import { GATHERING_SERVICE_EQUIPMENT_DEFAULTERS_LIST_BY_FELLOWSHIP } from 'pages/campaigns/CampaignQueries'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import PullToRefresh from 'react-simple-pull-to-refresh'

const GatheringServiceEquipmentHaveNotFilledByFellowship = () => {
  const { currentUser } = useContext(MemberContext)

  const church = currentUser.currentChurch
  const { gatheringServiceId } = useContext(ChurchContext)

  const { data, loading, error, refetch } = useQuery(
    GATHERING_SERVICE_EQUIPMENT_DEFAULTERS_LIST_BY_FELLOWSHIP,
    {
      variables: {
        gatheringServiceId: gatheringServiceId,
      },
    }
  )

  const defaulters = data?.gatheringServices[0]?.fellowshipEquipmentNotFilled

  return (
    <PullToRefresh
      onRefresh={() => refetch({ gatheringServiceId: gatheringServiceId })}
    >
      <ApolloWrapper data={data} loading={loading} error={error}>
        <div className="d-flex align-items-center justify-content-center ">
          <Container>
            <div className="text-center">
              <HeadingPrimary>{`${church?.name} Gathering Service`}</HeadingPrimary>
              <HeadingSecondary>Equipment Campaign</HeadingSecondary>
            </div>
            <h6 className="mt-4">Fellowships that haven't filled their form</h6>

            <Container>
              <Row>
                {defaulters?.map(
                  (defaulter: EquipmentDefaulterProps, index: number) => (
                    <DefaultersCard key={index} defaulter={defaulter} />
                  )
                )}
              </Row>
            </Container>
          </Container>
        </div>
      </ApolloWrapper>
    </PullToRefresh>
  )
}

export default GatheringServiceEquipmentHaveNotFilledByFellowship
