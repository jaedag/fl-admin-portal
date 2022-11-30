import { useQuery } from '@apollo/client'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import { ChurchContext } from 'contexts/ChurchContext'
import { COUNCIL_BY_CONSTITUENCY_EQUIPMENT_DEFAULTERS } from 'pages/campaigns/CampaignQueries'
import DefaulterDetailsCard, {
  EquipmentDefaulters,
} from 'pages/campaigns/components/cards/DefaulterDetailsCard'
import React, { useContext } from 'react'
import { Container, Row } from 'react-bootstrap'

const CouncilByConstituencyEquipmentDefaulters = () => {
  const { councilId } = useContext(ChurchContext)

  const { data, loading, error } = useQuery(
    COUNCIL_BY_CONSTITUENCY_EQUIPMENT_DEFAULTERS,
    {
      variables: {
        councilId: councilId,
      },
    }
  )
  const council = data?.councils[0]
  const constituencies = council?.constituencies

  return (
    <ApolloWrapper data={data} loading={loading} error={error}>
      <div className="d-flex align-items-center justify-content-center ">
        <Container>
          <div className="text-center">
            <HeadingPrimary>{`${council?.name} Council`}</HeadingPrimary>
            <HeadingSecondary>Equipment Campaign</HeadingSecondary>
          </div>
          <h6 className="mt-4">
            Fellowships and Constituencies that haven't filled their form
          </h6>

          <Container>
            <Row>
              {constituencies?.map(
                (constituency: EquipmentDefaulters, index: number) => (
                  <DefaulterDetailsCard
                    key={index}
                    church={constituency}
                    route={'constituency/fellowship'}
                  />
                )
              )}
            </Row>
          </Container>
        </Container>
      </div>
    </ApolloWrapper>
  )
}

export default CouncilByConstituencyEquipmentDefaulters
