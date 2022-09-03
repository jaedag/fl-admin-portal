import ApolloWrapper from 'components/base-component/ApolloWrapper'
import DefaultersMenuButton from 'pages/campaigns/components/buttons/DefaultersMenuButton'
import React, { useContext } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { MemberContext } from 'contexts/MemberContext'
import { useNavigate } from 'react-router'
import { ChurchContext } from 'contexts/ChurchContext'
import { useQuery } from '@apollo/client'
import { CONSTITUENCY_EQUIPMENT_DEFAULTERS_NUMBER_BY_FELLOWSHIP } from 'pages/campaigns/CampaignQueries'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'

function ConstituencyEquipmentDefaulters() {
  const { currentUser } = useContext(MemberContext)
  const navigate = useNavigate()

  const church = currentUser.currentChurch
  const churchType = currentUser.currentChurch?.__typename
  const { constituencyId } = useContext(ChurchContext)

  const { data, loading, error } = useQuery(
    CONSTITUENCY_EQUIPMENT_DEFAULTERS_NUMBER_BY_FELLOWSHIP,
    {
      variables: {
        constituencyId: constituencyId,
      },
    }
  )
  const constituency = data?.constituencies[0]

  return (
    <ApolloWrapper data={data} loading={loading} error={error}>
      <div className="d-flex align-items-center justify-content-center ">
        <Container>
          <div className="text-center">
            <HeadingPrimary>{`${church?.name} ${churchType}`}</HeadingPrimary>
            <HeadingSecondary>Equipment Campaign</HeadingSecondary>
          </div>
          <h6 className="mt-4">Fellowships that haven't filled their form</h6>
          <div className=" gap-2 mt-4">
            <h6>
              Fellowships :{' '}
              <span className="text-primary">
                {constituency?.fellowshipCount}
              </span>
            </h6>
            <Row>
              <Col>
                <DefaultersMenuButton
                  name="Have not filled"
                  onClick={() => {
                    navigate(
                      `/campaigns/constituency/equipment/have-not-filled/fellowship`
                    )
                  }}
                  number={constituency?.fellowshipEquipmentNotFilledCount}
                  color="text-danger"
                />
              </Col>
              <Col>
                <DefaultersMenuButton
                  name="Filled"
                  onClick={() => {}}
                  number={constituency?.fellowshipEquipmentFilledCount}
                  color="text-success"
                />
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </ApolloWrapper>
  )
}

export default ConstituencyEquipmentDefaulters
