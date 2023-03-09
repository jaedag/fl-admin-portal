import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_MINISTRY_SONTAS } from '../../../queries/ListQueries'
import { ChurchContext } from '../../../contexts/ChurchContext'
import RoleView from '../../../auth/RoleView'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { Container, Row, Col } from 'react-bootstrap'
import { permitAdmin } from 'permission-utils'
import AllChurchesSummary from 'components/AllChurchesSummary'
import ChurchSearch from 'components/ChurchSearch'

const DisplayAllMinistrySontas = () => {
  const { clickCard, ministryId } = useContext(ChurchContext)

  const { data, loading, error } = useQuery(GET_MINISTRY_SONTAS, {
    variables: { id: ministryId },
  })

  const sontas = data?.ministries[0]?.sontas
  const ministry = data?.ministries[0]

  return (
    <ApolloWrapper data={data} loading={loading} error={error}>
      <Container>
        <Row className="mb-2">
          <Col>
            <Link
              to="/ministry/displaydetails"
              onClick={() => {
                clickCard(ministry)
              }}
            >
              <h4 className="text-white">{`${ministry?.name} Sontas`}</h4>
            </Link>
            <Link
              to="/member/displaydetails"
              onClick={() => {
                clickCard(ministry?.leader)
              }}
            >
              <h6 className="text-white text-small d-block ">
                <span className="text-muted">Leader: </span>
                {ministry?.leader ? ` ${ministry.leader.fullName}` : null}
              </h6>
            </Link>
            {ministry?.admin ? (
              <Link
                className="pb-4 text-white text-small"
                to="/member/displaydetails"
                onClick={() => {
                  clickCard(ministry?.admin)
                }}
              >
                <span className="text-muted">Admin :</span>{' '}
                {`${ministry?.admin?.fullName}`}
              </Link>
            ) : null}
          </Col>
          <RoleView roles={permitAdmin('GatheringService')} directoryLock>
            <Col className="col-auto">
              <Link to="/sonta/addsonta" className="btn btn-danger">
                Add Sonta
              </Link>
            </Col>
          </RoleView>
        </Row>

        <AllChurchesSummary
          church={sontas}
          memberCount={ministry?.memberCount}
          numberOfChurchesBelow={sontas?.length}
          churchType="Sonta"
          route="ministry"
        />
        <ChurchSearch data={sontas} churchType="Sonta" />
      </Container>
    </ApolloWrapper>
  )
}

export default DisplayAllMinistrySontas
