import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_HUB_SONTAS } from '../../../queries/ListQueries'
import { ChurchContext } from '../../../contexts/ChurchContext'
import RoleView from '../../../auth/RoleView'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { Container, Row, Col } from 'react-bootstrap'
import { permitAdmin } from 'permission-utils'
import AllChurchesSummary from 'components/AllChurchesSummary'
import ChurchSearch from 'components/ChurchSearch'

const DisplayAllSontas = () => {
  const { clickCard, hubId } = useContext(ChurchContext)

  const { data, loading, error } = useQuery(GET_HUB_SONTAS, {
    variables: { id: hubId },
  })

  const sontas = data?.hubs[0]?.sontas
  const hub = data?.hubs[0]

  return (
    <ApolloWrapper data={data} loading={loading} error={error}>
      <Container>
        <Row className="mb-2">
          <Col>
            <Link
              to="/hub/displaydetails"
              onClick={() => {
                clickCard(hub)
              }}
            >
              <h4 className="text-white">{`${hub?.name} Sontas`}</h4>
            </Link>
            <Link
              to="/member/displaydetails"
              onClick={() => {
                clickCard(hub?.leader)
              }}
            >
              <h6 className="text-white text-small d-block ">
                <span className="text-muted">Leader: </span>
                {hub?.leader ? ` ${hub.leader.fullName}` : null}
              </h6>
            </Link>
            {hub?.admin ? (
              <Link
                className="pb-4 text-white text-small"
                to="/member/displaydetails"
                onClick={() => {
                  clickCard(hub?.admin)
                }}
              >
                <span className="text-muted">Admin :</span>{' '}
                {`${hub?.admin?.fullName}`}
              </Link>
            ) : null}
          </Col>
          <RoleView roles={permitAdmin('Campus')} directoryLock>
            <Col className="col-auto">
              <Link to="/sonta/addsonta" className="btn btn-danger">
                Add Sonta
              </Link>
            </Col>
          </RoleView>
        </Row>

        <AllChurchesSummary
          church={sontas}
          memberCount={hub?.memberCount}
          numberOfChurchesBelow={sontas?.length}
          churchType="Sonta"
          route="hub"
        />
        <ChurchSearch data={sontas} churchType="Sonta" />
      </Container>
    </ApolloWrapper>
  )
}

export default DisplayAllSontas
