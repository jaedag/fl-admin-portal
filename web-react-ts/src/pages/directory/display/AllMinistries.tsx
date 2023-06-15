import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_FEDERALMINISTRY_MINISTRIES } from '../../../queries/ListQueries'
import { ChurchContext } from '../../../contexts/ChurchContext'
import RoleView from '../../../auth/RoleView'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { Container, Row, Col } from 'react-bootstrap'
import { permitAdmin } from 'permission-utils'
import AllChurchesSummary from 'components/AllChurchesSummary'
import ChurchSearch from 'components/ChurchSearch'

const DisplayAllMinistries = () => {
  const { clickCard, federalMinistryId } = useContext(ChurchContext)

  const { data, loading, error } = useQuery(GET_FEDERALMINISTRY_MINISTRIES, {
    variables: { id: federalMinistryId },
  })

  const ministries = data?.federalministries[0]?.ministries
  const federalMinistry = data?.federalministries[0]

  return (
    <ApolloWrapper data={data} loading={loading} error={error}>
      <Container>
        <Row className="mb-2">
          <Col>
            <Link
              to="/ministry/displaydetails"
              onClick={() => {
                clickCard(federalMinistry)
              }}
            >
              <h4 className="text-white">{`${federalMinistry?.name} Ministries`}</h4>
            </Link>
            <Link
              to="/member/displaydetails"
              onClick={() => {
                clickCard(federalMinistry?.leader)
              }}
            >
              <h6 className="text-white text-small d-block ">
                <span className="text-muted">Leader: </span>
                {federalMinistry?.leader
                  ? ` ${federalMinistry.leader.fullName}`
                  : null}
              </h6>
            </Link>
            {federalMinistry?.admin ? (
              <Link
                className="pb-4 text-white text-small"
                to="/member/displaydetails"
                onClick={() => {
                  clickCard(federalMinistry?.admin)
                }}
              >
                <span className="text-muted">Admin :</span>{' '}
                {`${federalMinistry?.admin?.fullName}`}
              </Link>
            ) : null}
          </Col>
          <RoleView roles={permitAdmin('Campus')} directoryLock>
            <Col className="col-auto">
              <Link to="/ministry/addministry" className="btn btn-danger">
                Add Ministry
              </Link>
            </Col>
          </RoleView>
        </Row>

        <AllChurchesSummary
          church={ministries}
          memberCount={federalMinistry?.memberCount}
          numberOfChurchesBelow={ministries?.length}
          churchType="Ministry"
          route="federalministry"
        />
        <ChurchSearch data={ministries} churchType="Ministry" />
      </Container>
    </ApolloWrapper>
  )
}

export default DisplayAllMinistries
