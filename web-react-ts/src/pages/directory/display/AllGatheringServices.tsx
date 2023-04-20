import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_OVERSIGHT_GATHERINGSERVICES } from '../../../queries/ListQueries'
import { ChurchContext } from '../../../contexts/ChurchContext'
import RoleView from '../../../auth/RoleView'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { Container, Row, Col } from 'react-bootstrap'
import { permitAdmin } from 'permission-utils'
import AllChurchesSummary from 'components/AllChurchesSummary'
import ChurchSearch from 'components/ChurchSearch'

const DisplayAllGatheringServices = () => {
  const { clickCard, oversightId } = useContext(ChurchContext)

  const { data, loading, error } = useQuery(GET_OVERSIGHT_GATHERINGSERVICES, {
    variables: { id: oversightId },
  })

  const gatheringServices = data?.oversights[0]?.gatheringServices
  const oversight = data?.oversights[0]

  return (
    <ApolloWrapper data={data} loading={loading} error={error}>
      <Container>
        <Row className="mb-2">
          <Col>
            <Link
              to="/oversight/displaydetails"
              onClick={() => {
                clickCard(oversight)
              }}
            >
              <h4 className="text-white">{`${oversight?.name} Oversight`}</h4>
            </Link>
            <Link
              to="/member/displaydetails"
              onClick={() => {
                clickCard(oversight?.leader)
              }}
            >
              <h6 className="text-white text-small d-block ">
                <span className="text-muted">Oversight Leader: </span>
                {oversight?.leader ? ` ${oversight.leader.fullName}` : null}
              </h6>
            </Link>
            {oversight?.admin ? (
              <Link
                className="pb-4 text-white text-small"
                to="/member/displaydetails"
                onClick={() => {
                  clickCard(oversight?.admin)
                }}
              >
                <span className="text-muted">Admin :</span>{' '}
                {`${oversight?.admin?.fullName}`}
              </Link>
            ) : null}
          </Col>
          <RoleView roles={permitAdmin('GatheringService')} directoryLock>
            <Col className="col-auto">
              <Link
                to="/gatheringservice/addgatheringservice"
                className="btn btn-danger"
              >
                Add Gathering Service
              </Link>
            </Col>
          </RoleView>
        </Row>

        <AllChurchesSummary
          church={gatheringServices}
          memberCount={oversight?.memberCount}
          numberOfChurchesBelow={gatheringServices?.length}
          churchType="GatheringService"
          route="oversight"
        />
        <ChurchSearch data={gatheringServices} churchType="GatheringService" />
      </Container>
    </ApolloWrapper>
  )
}

export default DisplayAllGatheringServices
