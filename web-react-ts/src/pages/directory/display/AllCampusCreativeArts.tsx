import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_CAMPUS_CREATIVEARTS } from '../../../queries/ListQueries'
import { ChurchContext } from '../../../contexts/ChurchContext'
import RoleView from '../../../auth/RoleView'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { Container, Row, Col } from 'react-bootstrap'
import { permitAdmin } from 'permission-utils'
import AllChurchesSummary from 'components/AllChurchesSummary'
import ChurchSearch from 'components/ChurchSearch'

const DisplayAllCampusCreativeArts = () => {
  const { clickCard, campusId } = useContext(ChurchContext)

  const { data, loading, error } = useQuery(GET_CAMPUS_CREATIVEARTS, {
    variables: { id: campusId },
  })

  const creativeArts = data?.campuses[0]?.creativeArts
  const campus = data?.campuses[0]

  return (
    <ApolloWrapper data={data} loading={loading} error={error}>
      <Container>
        <Row className="mb-2">
          <Col>
            <Link
              to="/campus/displaydetails"
              onClick={() => {
                clickCard(campus)
              }}
            >
              <h4 className="text-white">{`${campus?.name} Federal Ministries`}</h4>
            </Link>
            <Link
              to="/member/displaydetails"
              onClick={() => {
                clickCard(campus?.leader)
              }}
            >
              <h6 className="text-white text-small d-block ">
                <span className="text-muted">Leader: </span>
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
                <span className="text-muted">Admin :</span>{' '}
                {`${campus?.admin?.fullName}`}
              </Link>
            ) : null}
          </Col>
          <RoleView roles={permitAdmin('Campus')} directoryLock>
            <Col className="col-auto">
              <Link
                to="/creativearts/addcreativearts"
                className="btn btn-danger"
              >
                Add Federal Ministry
              </Link>
            </Col>
          </RoleView>
        </Row>

        <AllChurchesSummary
          church={creativeArts}
          memberCount={campus?.memberCount}
          numberOfChurchesBelow={creativeArts?.length}
          churchType="CreativeArts"
          route="campus"
        />
        <ChurchSearch data={creativeArts} churchType="CreativeArts" />
      </Container>
    </ApolloWrapper>
  )
}

export default DisplayAllCampusCreativeArts
