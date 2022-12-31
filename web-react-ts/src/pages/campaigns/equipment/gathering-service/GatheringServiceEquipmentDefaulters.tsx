import DefaultersMenuButton from 'pages/campaigns/components/buttons/DefaultersMenuButton'
import React, { useContext } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { MemberContext } from 'contexts/MemberContext'
import { useNavigate } from 'react-router'
import { ChurchContext } from 'contexts/ChurchContext'
import { useQuery } from '@apollo/client'
import { GATHERING_SERVICE_EQUIPMENT_DEFAULTERS_NUMBER_BY_CONSTITUENCY_AND_FELLOWSHIP } from 'pages/campaigns/CampaignQueries'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'

const GatheringServiceEquipmentDefaulters = () => {
  const { currentUser } = useContext(MemberContext)
  const navigate = useNavigate()

  const church = currentUser.currentChurch

  const { gatheringServiceId, clickCard } = useContext(ChurchContext)

  const { data, loading, error } = useQuery(
    GATHERING_SERVICE_EQUIPMENT_DEFAULTERS_NUMBER_BY_CONSTITUENCY_AND_FELLOWSHIP,
    {
      variables: {
        gatheringServiceId: gatheringServiceId,
      },
    }
  )
  const gatheringService = data?.gatheringServices[0]

  return (
    <ApolloWrapper data={data} loading={loading} error={error}>
      <div className="d-flex align-items-center justify-content-center ">
        <Container>
          <div className="text-center">
            <HeadingPrimary>{`${church?.name} Gathering Service`}</HeadingPrimary>
            <HeadingSecondary>Equipment Campaign</HeadingSecondary>
          </div>
          <h6 className="mt-4">
            Fellowships and Constituencies that haven't filled their form
          </h6>
          <DefaultersMenuButton
            name="Streams"
            onClick={() => {
              clickCard(gatheringService)
              navigate(
                '/campaigns/gatheringservice/stream/equipment/defaulters'
              )
            }}
            number={gatheringService?.streamCount}
            color="text-danger"
          />
          <div className=" gap-2 mt-4">
            <h6>
              Fellowships :{' '}
              <span className="text-primary">
                {gatheringService?.fellowshipCount}
              </span>
            </h6>

            <Row className="mt-3">
              <Col>
                <DefaultersMenuButton
                  name="Have not filled"
                  onClick={() =>
                    navigate(
                      '/campaigns/gatheringservice/equipment/have-not-filled/fellowship'
                    )
                  }
                  number={gatheringService?.fellowshipEquipmentNotFilledCount}
                  color="text-danger"
                />
              </Col>
              <Col>
                <DefaultersMenuButton
                  name="Filled"
                  onClick={() => {}}
                  number={gatheringService?.fellowshipEquipmentFilledCount}
                  color="text-success"
                />
              </Col>
            </Row>
          </div>
          <div className=" gap-2 mt-4">
            <h6>
              Constituencies :{' '}
              <span className="text-primary">
                {gatheringService?.constituencyCount}
              </span>
            </h6>
            <Row className="mt-3">
              <Col>
                <DefaultersMenuButton
                  name="Have not filled"
                  onClick={() =>
                    navigate(
                      '/campaigns/gatheringservice/equipment/have-not-filled/constituency'
                    )
                  }
                  number={gatheringService?.constituencyEquipmentNotFilledCount}
                  color="text-danger"
                />
              </Col>
              <Col>
                <DefaultersMenuButton
                  name="Filled"
                  onClick={() => {}}
                  number={gatheringService?.constituencyEquipmentFilledCount}
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

export default GatheringServiceEquipmentDefaulters
