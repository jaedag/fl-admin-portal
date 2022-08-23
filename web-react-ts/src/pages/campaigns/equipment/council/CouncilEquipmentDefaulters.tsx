import DefaultersMenuButton from 'pages/campaigns/components/buttons/DefaultersMenuButton'
import React, { useContext } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { MemberContext } from 'contexts/MemberContext'
import { useNavigate } from 'react-router'
import { ChurchContext } from 'contexts/ChurchContext'
import { useQuery } from '@apollo/client'
import { COUNCIL_EQUIPMENT_DEFAULTERS_NUMBER_BY_CONSTITUENCY_AND_FELLOWSHIP } from 'pages/campaigns/CampaignQueries'
import ApolloWrapper from 'components/base-component/ApolloWrapper'

const CouncilEquipmentDefaulters = () => {
  const { currentUser } = useContext(MemberContext)
  const navigate = useNavigate()

  const church = currentUser.currentChurch
  const churchType = currentUser.currentChurch?.__typename
  const { councilId } = useContext(ChurchContext)

  const { data, loading, error } = useQuery(
    COUNCIL_EQUIPMENT_DEFAULTERS_NUMBER_BY_CONSTITUENCY_AND_FELLOWSHIP,
    {
      variables: {
        councilId: councilId,
      },
    }
  )
  const council = data?.councils[0]

  return (
    <ApolloWrapper data={data} loading={loading} error={error}>
      <div className="d-flex align-items-center justify-content-center ">
        <Container>
          <div className="text-center">
            <h1 className="mb-1 ">Equipment Campaign</h1>
            <h6 className="text-secondary">{`${church?.name} ${churchType}`}</h6>
            <h3>Defaulters</h3>
          </div>
          <div className=" gap-2 mt-5">
            <h6>
              Total number of Fellowships :{' '}
              <span className="text-primary">{council?.fellowshipCount}</span>
            </h6>
            <Row className="mt-3">
              <Col>
                <DefaultersMenuButton
                  name="Have not filled"
                  onClick={() => {
                    navigate(
                      `/campaigns/council/equipment/have-not-filled/fellowship`
                    )
                  }}
                  number={council?.fellowshipEquipmentNotFilledCount}
                  color="text-danger"
                />
              </Col>
              <Col>
                <DefaultersMenuButton
                  name="Filled"
                  onClick={() => {}}
                  number={council?.fellowshipEquipmentFilledCount}
                  color="text-success"
                />
              </Col>
            </Row>
          </div>
          <div className=" gap-2 mt-4">
            <h6>
              Total number of Constituencies :{' '}
              <span className="text-primary">{council?.constituencyCount}</span>
            </h6>
            <Row className="mt-3">
              <Col>
                <DefaultersMenuButton
                  name="Have not filled"
                  onClick={() => {
                    navigate(
                      `/campaigns/council/equipment/have-not-filled/constituency`
                    )
                  }}
                  number={council?.constituencyEquipmentNotFilledCount}
                  color="text-danger"
                />
              </Col>
              <Col>
                <DefaultersMenuButton
                  name="Filled"
                  onClick={() => {}}
                  number={council?.constituencyEquipmentFilledCount}
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

export default CouncilEquipmentDefaulters
