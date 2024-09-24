import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_STREAM_TEAMS } from '../../../queries/ListQueries'
import { ChurchContext } from '../../../contexts/ChurchContext'
import RoleView from '../../../auth/RoleView'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { Container, Row, Col } from 'react-bootstrap'
import { permitAdmin } from 'permission-utils'
import AllChurchesSummary from 'components/AllChurchesSummary'
import ChurchSearch from 'components/ChurchSearch'

const AllStreamTeams = () => {
  const { clickCard, streamId } = useContext(ChurchContext)

  const { data, loading, error } = useQuery(GET_STREAM_TEAMS, {
    variables: { id: streamId },
  })

  const teams = data?.streams[0].teams
  const stream = data?.streams[0]

  return (
    <ApolloWrapper data={data} loading={loading} error={error}>
      <Container>
        <div className="mb-4">
          <Row className="mb-2">
            <Col>
              <Link
                to="/stream/displaydetails"
                onClick={() => {
                  clickCard(stream)
                }}
              >
                <h4 className="text-white">{`${stream?.name}'s Teams`}</h4>
              </Link>
              <Link
                to="/member/displaydetails"
                onClick={() => {
                  clickCard(stream?.leader)
                }}
              >
                <h6 className="text-white text-small d-block ">
                  <span className="text-muted">Overseer:</span>

                  {stream?.leader ? ` ${stream.leader.fullName}` : null}
                </h6>
              </Link>
              {stream?.admin ? (
                <Link
                  className="pb-1 text-white d-block text-small"
                  to="/member/displaydetails"
                  onClick={() => {
                    clickCard(stream?.admin)
                  }}
                >
                  <span className="text-muted">Admin:</span>
                  {` ${stream?.admin?.fullName}`}
                </Link>
              ) : null}
            </Col>
            <RoleView roles={permitAdmin('Stream')} directoryLock>
              <Col className="col-auto">
                <Link to="/team/addteam" className="btn btn-danger">
                  Add Team
                </Link>
              </Col>
            </RoleView>
          </Row>
        </div>
        <AllChurchesSummary
          church={teams}
          memberCount={stream?.memberCount}
          numberOfChurchesBelow={teams?.length}
          churchType="Team"
          route="stream"
        />
        <ChurchSearch data={teams} churchType="Stream" />
      </Container>
    </ApolloWrapper>
  )
}

export default AllStreamTeams
