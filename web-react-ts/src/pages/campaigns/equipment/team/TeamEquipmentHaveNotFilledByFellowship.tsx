import { ChurchContext } from 'contexts/ChurchContext'
import { MemberContext } from 'contexts/MemberContext'
import DefaultersCard, {
  EquipmentDefaulterProps,
} from 'pages/campaigns/components/cards/DefaultersCard'
import React, { useContext } from 'react'
import { Container, Row } from 'react-bootstrap'
import { useQuery } from '@apollo/client'
import { TEAM_EQUIPMENT_DEFAULTERS_LIST_BY_FELLOWSHIP } from 'pages/campaigns/CampaignQueries'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import PullToRefresh from 'react-simple-pull-to-refresh'

const TeamEquipmentHaveNotFilledByFellowship = () => {
  const { currentUser } = useContext(MemberContext)

  const church = currentUser.currentChurch
  const churchType = currentUser.currentChurch?.__typename
  const { teamId } = useContext(ChurchContext)

  const { data, loading, error, refetch } = useQuery(
    TEAM_EQUIPMENT_DEFAULTERS_LIST_BY_FELLOWSHIP,
    {
      variables: {
        teamId: teamId,
      },
    }
  )

  const defaulters = data?.teams[0]?.fellowshipEquipmentNotFilled

  return (
    <PullToRefresh onRefresh={() => refetch({ teamId: teamId })}>
      <ApolloWrapper data={data} loading={loading} error={error}>
        <div className="d-flex align-items-center justify-content-center ">
          <Container>
            <div className="text-center">
              <HeadingPrimary>{`${church?.name} ${churchType}`}</HeadingPrimary>
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

export default TeamEquipmentHaveNotFilledByFellowship
