import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_GATHERING_SERVICE_CONSTITUENCIES } from '../../../queries/ListQueries'
import { ChurchContext } from '../../../contexts/ChurchContext'
import RoleView from '../../../auth/RoleView'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { Container, Row, Col } from 'react-bootstrap'
import { permitAdmin } from 'permission-utils'
import AllChurchesSummary from 'components/AllChurchesSummary'
import ChurchSearch from 'components/ChurchSearch'

const AllGatheringServiceConstituencies = () => {
  const { clickCard, gatheringServiceId } = useContext(ChurchContext)

  const { data, loading, error } = useQuery(
    GET_GATHERING_SERVICE_CONSTITUENCIES,
    {
      variables: { id: gatheringServiceId },
    }
  )

  const constituencies = data?.gatheringServices[0].constituencies
  const gatheringService = data?.gatheringServices[0]

  return (
    <ApolloWrapper data={data} loading={loading} error={error}>
      <Container>
        <div className="mb-4">
          <Row className="mb-2">
            <Col>
              <Link
                to="/gatheringservice/displaydetails"
                onClick={() => {
                  clickCard(gatheringService)
                }}
              >
                <h4 className="text-white">{`${gatheringService?.name}'s Constituencies`}</h4>
              </Link>
              <Link
                to="/member/displaydetails"
                onClick={() => {
                  clickCard(gatheringService?.leader)
                }}
              >
                <h6 className="text-white text-small d-block ">
                  <span className="text-muted">Resident Pastor: </span>

                  {gatheringService?.leader
                    ? ` ${gatheringService.leader.fullName}`
                    : null}
                </h6>
              </Link>
              {gatheringService?.admin ? (
                <Link
                  className="pb-4 text-white text-small"
                  to="/member/displaydetails"
                  onClick={() => {
                    clickCard(gatheringService?.admin)
                  }}
                >
                  <span className="text-muted">Admin:</span>{' '}
                  {`${gatheringService?.admin?.fullName}`}
                </Link>
              ) : null}
            </Col>
            <RoleView roles={permitAdmin('Council')} directoryLock>
              <Col className="col-auto">
                <Link
                  to="/constituency/addconstituency"
                  className="btn btn-danger"
                >
                  Add Constituency
                </Link>
              </Col>
            </RoleView>
          </Row>
        </div>
        <AllChurchesSummary
          church={constituencies}
          memberCount={gatheringService?.memberCount}
          numberOfChurchesBelow={constituencies?.length}
          churchType="Constituency"
          route="gatheringService"
        />
        <ChurchSearch data={constituencies} churchType="bishop" />
      </Container>
    </ApolloWrapper>
  )
}

export default AllGatheringServiceConstituencies
