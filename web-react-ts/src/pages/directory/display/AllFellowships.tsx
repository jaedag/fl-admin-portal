import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_BACENTA_FELLOWSHIPS } from '../../../queries/ListQueries'
import { ChurchContext } from '../../../contexts/ChurchContext'
import RoleView from '../../../auth/RoleView'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { Container, Row, Col } from 'react-bootstrap'
import { permitAdmin } from 'permission-utils'
import AllChurchesSummary from 'components/AllChurchesSummary'
import ChurchSearch from 'components/ChurchSearch'

const DisplayAllFellowships = () => {
  const { bacentaId, setBacentaId } = useContext(ChurchContext)

  const { data, loading, error } = useQuery(GET_BACENTA_FELLOWSHIPS, {
    variables: { id: bacentaId },
  })

  const fellowships = data?.bacentas[0]?.fellowships

  return (
    <ApolloWrapper loading={loading} error={error} data={data}>
      <Container>
        <Row className="mb-2">
          <Col>
            <Link
              to={`/bacenta/displaydetails`}
              onClick={() => {
                setBacentaId(bacentaId)
              }}
            >
              <h2 className="text-white">{`${fellowships?.[0].bacenta.name} Bacenta`}</h2>
            </Link>
          </Col>
          <RoleView roles={permitAdmin('Constituency')}>
            <Col className="col-auto">
              <Link to="/fellowship/addfellowship" className="btn btn-danger">
                Add Fellowship
              </Link>
            </Col>
          </RoleView>
        </Row>

        <AllChurchesSummary
          church={fellowships}
          memberCount={data?.bacentas[0]?.memberCount}
          numberOfChurchesBelow={fellowships?.length}
          churchType="Fellowship"
          route="bacenta"
        />
        <ChurchSearch data={fellowships} churchType="Fellowship" />
      </Container>
    </ApolloWrapper>
  )
}

export default DisplayAllFellowships
