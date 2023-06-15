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

const AllCampusConstituencies = () => {
  const { clickCard, campusId } = useContext(ChurchContext)

  const { data, loading, error } = useQuery(
    GET_GATHERING_SERVICE_CONSTITUENCIES,
    {
      variables: { id: campusId },
    }
  )

  const constituencies = data?.campuses[0].constituencies
  const campus = data?.campuses[0]

  return (
    <ApolloWrapper data={data} loading={loading} error={error}>
      <Container>
        <div className="mb-4">
          <Row className="mb-2">
            <Col>
              <Link
                to="/campus/displaydetails"
                onClick={() => {
                  clickCard(campus)
                }}
              >
                <h4 className="text-white">{`${campus?.name}'s Constituencies`}</h4>
              </Link>
              <Link
                to="/member/displaydetails"
                onClick={() => {
                  clickCard(campus?.leader)
                }}
              >
                <h6 className="text-white text-small d-block ">
                  <span className="text-muted">Lead Pastor: </span>

                  {campus?.leader ? ` ${campus.leader.fullName}` : null}
                </h6>
              </Link>
              {campus?.admin ? (
                <Link
                  className="pb-4 text-white text-small"
                  to="/member/displaydetails"
                  onClick={() => {
                    clickCard(campus?.admin)
                  }}
                >
                  <span className="text-muted">Admin:</span>{' '}
                  {`${campus?.admin?.fullName}`}
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
          memberCount={campus?.memberCount}
          numberOfChurchesBelow={constituencies?.length}
          churchType="Constituency"
          route="campus"
        />
        <ChurchSearch data={constituencies} churchType="bishop" />
      </Container>
    </ApolloWrapper>
  )
}

export default AllCampusConstituencies
