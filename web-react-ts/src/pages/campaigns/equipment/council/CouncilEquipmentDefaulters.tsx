import DefaultersMenuButton from 'pages/campaigns/components/buttons/DefaultersMenuButton'
import React, { useContext } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { MemberContext } from 'contexts/MemberContext'
import { useNavigate } from 'react-router'
import { ChurchContext } from 'contexts/ChurchContext'
import { useQuery } from '@apollo/client'
import { COUNCIL_EQUIPMENT_DEFAULTERS_NUMBER_BY_CONSTITUENCY_AND_FELLOWSHIP } from 'pages/campaigns/CampaignQueries'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import PullToRefresh from 'react-simple-pull-to-refresh'

const CouncilEquipmentDefaulters = () => {
  const { currentUser } = useContext(MemberContext)
  const navigate = useNavigate()

  const church = currentUser.currentChurch
  const churchType = currentUser.currentChurch?.__typename
  const { councilId, clickCard } = useContext(ChurchContext)

  const { data, loading, error, refetch } = useQuery(
    COUNCIL_EQUIPMENT_DEFAULTERS_NUMBER_BY_CONSTITUENCY_AND_FELLOWSHIP,
    {
      variables: {
        councilId: councilId,
      },
    }
  )
  const council = data?.councils[0]

  return (
    <PullToRefresh onRefresh={() => refetch({ councilId: councilId })}>
      <ApolloWrapper data={data} loading={loading} error={error}>
        <div className="d-flex align-items-center justify-content-center ">
          <Container>
            <div className="text-center">
              <HeadingPrimary>{`${church?.name} ${churchType}`}</HeadingPrimary>
              <HeadingSecondary>Equipment Campaign</HeadingSecondary>
            </div>
            <h6 className="mt-4">
              Fellowships and Constituencies that haven't filled their form
            </h6>
            <DefaultersMenuButton
              name="Constituencies"
              onClick={() => {
                clickCard(council)
                navigate('/campaigns/council/constituency/equipment/defaulters')
              }}
              number={council?.constituencyCount}
              color="text-danger"
            />
            <div className=" gap-2 mt-4">
              <h6>
                Fellowships :{' '}
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
                Constituencies :{' '}
                <span className="text-primary">
                  {council?.constituencyCount}
                </span>
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
    </PullToRefresh>
  )
}

export default CouncilEquipmentDefaulters
