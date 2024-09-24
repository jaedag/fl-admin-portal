import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_COUNCIL_TEAMS } from 'queries/ListQueries'
import { ChurchContext } from 'contexts/ChurchContext'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { Container, Row, Col } from 'react-bootstrap'
import RoleView from 'auth/RoleView'
import { permitAdmin } from 'permission-utils'
import AllChurchesSummary from 'components/AllChurchesSummary'
import ChurchSearch from 'components/ChurchSearch'

const DisplayAllTeams = () => {
  const { clickCard, councilId } = useContext(ChurchContext)

  const { data, loading, error } = useQuery(GET_COUNCIL_TEAMS, {
    variables: { id: councilId },
  })

  const teams = data?.councils[0].teams
  const council = data?.councils[0]

  return (
    <ApolloWrapper data={data} loading={loading} error={error}>
      <Container>
        <Row className="mb-2">
          <Col>
            <Link
              to="/council/displaydetails"
              onClick={() => {
                clickCard(teams?.council)
              }}
            >
              <h2 className="text-white">{`${council?.name} Teams`}</h2>
            </Link>
            {council?.admin ? (
              <Link
                className="pb-1 text-white text-small d-block"
                to="/member/displaydetails"
                onClick={() => {
                  clickCard(council?.admin)
                }}
              >
                <span className="text-muted">Admin: </span>
                {`${council?.admin?.firstName} ${council?.admin?.lastName}`}
              </Link>
            ) : null}
          </Col>
          <RoleView roles={permitAdmin('Council')} directoryLock>
            <Col className="col-auto">
              <Link to="/team/addteam" className="btn btn-danger">
                Add Team
              </Link>
            </Col>
          </RoleView>
        </Row>

        <AllChurchesSummary
          church={teams}
          memberCount={council?.memberCount}
          numberOfChurchesBelow={teams?.length}
          churchType="Team"
          route="council"
        />
        <ChurchSearch data={teams} churchType="Team" />
      </Container>
    </ApolloWrapper>
  )
}

export default DisplayAllTeams
