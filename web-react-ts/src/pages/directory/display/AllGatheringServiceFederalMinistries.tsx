import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_GATHERINGSERVICE_FEDERALMINISTRIES } from '../../../queries/ListQueries'
import { ChurchContext } from '../../../contexts/ChurchContext'
import RoleView from '../../../auth/RoleView'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { Container, Row, Col } from 'react-bootstrap'
import { permitAdmin } from 'permission-utils'
import AllChurchesSummary from 'components/AllChurchesSummary'
import ChurchSearch from 'components/ChurchSearch'

const DisplayAllGatheringServiceFederalMinistries = () => {
  const { clickCard, gatheringServiceId } = useContext(ChurchContext)

  const { data, loading, error } = useQuery(
    GET_GATHERINGSERVICE_FEDERALMINISTRIES,
    {
      variables: { id: gatheringServiceId },
    }
  )

  const federalMinistries = data?.gatheringServices[0]?.federalministries
  const gatheringService = data?.gatheringServices[0]

  return (
    <ApolloWrapper data={data} loading={loading} error={error}>
      <Container>
        <Row className="mb-2">
          <Col>
            <Link
              to="/gatheringservice/displaydetails"
              onClick={() => {
                clickCard(gatheringService)
              }}
            >
              <h4 className="text-white">{`${gatheringService?.name} Federal Ministries`}</h4>
            </Link>
            <Link
              to="/member/displaydetails"
              onClick={() => {
                clickCard(gatheringService?.leader)
              }}
            >
              <h6 className="text-white text-small d-block ">
                <span className="text-muted">Leader: </span>
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
                <span className="text-muted">Admin :</span>{' '}
                {`${gatheringService?.admin?.fullName}`}
              </Link>
            ) : null}
          </Col>
          <RoleView roles={permitAdmin('GatheringService')} directoryLock>
            <Col className="col-auto">
              <Link
                to="/federalministry/addfederalministry"
                className="btn btn-danger"
              >
                Add Federal Ministry
              </Link>
            </Col>
          </RoleView>
        </Row>

        <AllChurchesSummary
          church={federalMinistries}
          memberCount={gatheringService?.memberCount}
          numberOfChurchesBelow={federalMinistries?.length}
          churchType="Federalministry"
          route="gatheringService"
        />
        <ChurchSearch data={federalMinistries} churchType="Federalministry" />
      </Container>
    </ApolloWrapper>
  )
}

export default DisplayAllGatheringServiceFederalMinistries
