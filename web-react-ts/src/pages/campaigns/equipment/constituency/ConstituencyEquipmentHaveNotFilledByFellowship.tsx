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

const ConstituencyEquipmentHaveNotFilledByFellowship = () => {
  const { currentUser } = useContext(MemberContext)

  const church = currentUser.currentChurch
  const churchType = currentUser.currentChurch?.__typename
  const { constituencyId } = useContext(ChurchContext)

  const { data, loading, error } = useQuery(
    CONSTITUENCY_EQUIPMENT_DEFAULTERS_LIST_BY_FELLOWSHIP,
    {
      variables: {
        constituencyId: constituencyId,
      },
    }
  )

  const defaulters = data?.constituencies[0]?.fellowshipEquipmentNotFilled

  return (
    <ApolloWrapper data={data} loading={loading} error={error}>
      <div className="d-flex align-items-center justify-content-center ">
        <Container>
          <div className="text-center">
            <h1 className="mb-1 ">Equipment Campaign</h1>
            <h6 className="text-secondary">{`${church?.name} ${churchType}`}</h6>
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
  )
}

export default ConstituencyEquipmentHaveNotFilledByFellowship
