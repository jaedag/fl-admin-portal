import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_TEAM_BACENTAS } from '../../../queries/ListQueries'
import { ChurchContext } from '../../../contexts/ChurchContext'
import RoleView from '../../../auth/RoleView'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { Col, Container, Row } from 'react-bootstrap'
import { permitAdminArrivals } from 'permission-utils'
import AllChurchesSummary from 'components/AllChurchesSummary'
import 'components/AllChurchesSummary.css'
import ChurchSearch from 'components/ChurchSearch'

const DisplayAllBacentas = () => {
  const { teamId, setTeamId, clickCard } = useContext(ChurchContext)

  const { data, loading, error } = useQuery(GET_TEAM_BACENTAS, {
    variables: { id: teamId },
  })

  const team = data?.teams[0]

  return (
    <ApolloWrapper loading={loading} data={data} error={error}>
      <Container>
        <Row className="mb-2">
          <Col>
            <Link
              to={`/team/displaydetails`}
              onClick={() => {
                setTeamId(teamId)
              }}
            >
              {' '}
              <h2 className="text-white">{`${team?.name} Team`}</h2>
            </Link>
            <Link
              to="/member/displaydetails"
              onClick={() => {
                clickCard(team?.leader)
              }}
            >
              <h6 className="text-white d-block text-small">
                <span className="text-muted">CO:</span>
                {team?.leader && ` ${team?.leader.fullName}`}
              </h6>
            </Link>
            {team?.admin ? (
              <Link
                className="pb-4"
                to="/member/displaydetails"
                onClick={() => {
                  clickCard(team?.admin)
                }}
              >
                {`Admin: ${team?.admin?.fullName}`}
              </Link>
            ) : null}
          </Col>
          <RoleView roles={permitAdminArrivals('Stream')} directoryLock>
            <Col className="col-auto">
              <Link
                to="/bacenta/addbacenta"
                className="btn btn-danger text-nowrap"
              >
                Add Bacenta
              </Link>
            </Col>
          </RoleView>
        </Row>
        <AllChurchesSummary
          church={team}
          memberCount={team?.memberCount}
          numberOfChurchesBelow={team?.bacentas.length}
          churchType="Bacenta"
          route="team"
        />

        <ChurchSearch data={team?.bacentas} churchType="Bacenta" />
      </Container>
    </ApolloWrapper>
  )
}

export default DisplayAllBacentas
