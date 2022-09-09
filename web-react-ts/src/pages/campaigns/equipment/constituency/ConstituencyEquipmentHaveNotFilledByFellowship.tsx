import { ChurchContext } from 'contexts/ChurchContext'
import { MemberContext } from 'contexts/MemberContext'
import DefaultersCard, {
  EquipmentDefaulterProps,
} from 'pages/campaigns/components/buttons/DefaultersCard'
import React, { useContext } from 'react'
import { Container, Row } from 'react-bootstrap'
import { useQuery } from '@apollo/client'
import { CONSTITUENCY_EQUIPMENT_DEFAULTERS_LIST_BY_FELLOWSHIP } from 'pages/campaigns/CampaignQueries'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import PullToRefresh from 'react-simple-pull-to-refresh'

const ConstituencyEquipmentHaveNotFilledByFellowship = () => {
  const { currentUser } = useContext(MemberContext)

  const church = currentUser.currentChurch
  const churchType = currentUser.currentChurch?.__typename
  const { constituencyId } = useContext(ChurchContext)

  const { data, loading, error, refetch } = useQuery(
    CONSTITUENCY_EQUIPMENT_DEFAULTERS_LIST_BY_FELLOWSHIP,
    {
      variables: {
        constituencyId: constituencyId,
      },
    }
  )

  const defaulters = data?.constituencies[0]?.fellowshipEquipmentNotFilled

  return (
    <PullToRefresh
      onRefresh={() => refetch({ constituencyId: constituencyId })}
    >
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

export default ConstituencyEquipmentHaveNotFilledByFellowship
