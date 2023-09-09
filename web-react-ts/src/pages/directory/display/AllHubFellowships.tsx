import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_HUB_HUBFELLOWSHIPS } from '../../../queries/ListQueries'
import { ChurchContext } from '../../../contexts/ChurchContext'
import RoleView from '../../../auth/RoleView'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { Container, Row, Col } from 'react-bootstrap'
import { permitAdmin } from 'permission-utils'
import AllChurchesSummary from 'components/AllChurchesSummary'
import ChurchSearch from 'components/ChurchSearch'

const DisplayAllHubFellowships = () => {
  const { hubId, setHubId } = useContext(ChurchContext)

  const { data, loading, error } = useQuery(GET_HUB_HUBFELLOWSHIPS, {
    variables: { id: hubId },
  })

  const hub = data?.hubs[0]
  const hubfellowships = data?.hubs[0]?.hubFellowships

  return (
    <ApolloWrapper loading={loading} error={error} data={data}>
      <Container>
        <Row className="mb-2">
          <Col>
            <Link
              to={`/hub/displaydetails`}
              onClick={() => {
                setHubId(hubId)
              }}
            >
              <h2 className="text-white">{`${hub?.name} Hub`}</h2>
            </Link>
          </Col>
          <RoleView roles={permitAdmin('Constituency')} directoryLock>
            <Col className="col-auto">
              <Link
                to="/hubfellowship/addhubfellowship"
                className="btn btn-danger"
              >
                Add Hub Fellowship
              </Link>
            </Col>
          </RoleView>
        </Row>

        <AllChurchesSummary
          church={hubfellowships}
          memberCount={hub?.memberCount}
          numberOfChurchesBelow={hubfellowships?.length}
          churchType="HubFellowship"
          route="hub"
        />
        <ChurchSearch data={hubfellowships} churchType="HubFellowship" />
      </Container>
    </ApolloWrapper>
  )
}

export default DisplayAllHubFellowships
