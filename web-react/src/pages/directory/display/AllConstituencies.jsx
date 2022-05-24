import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
//import DisplayChurchList from 'components/DisplayChurchList'
import { GET_COUNCIL_CONSTITUENCIES } from 'queries/ListQueries'
import { ChurchContext } from 'contexts/ChurchContext'
import BaseComponent from 'components/base-component/BaseComponent'
import { Container, Row, Col } from 'react-bootstrap'
import RoleView from 'auth/RoleView'
import { permitAdmin } from 'permission-utils'
import AllChurchesSummary from 'components/AllChurchesSummary'
import ChurchSearch from 'components/ChurchSearch'

const DisplayAllConstituencies = () => {
  const { clickCard, councilId } = useContext(ChurchContext)

  const { data, loading, error } = useQuery(GET_COUNCIL_CONSTITUENCIES, {
    variables: { id: councilId },
  })

  const constituencies = data?.councils[0].constituencies
  const council = data?.councils[0]

  return (
    <BaseComponent data={data} loading={loading} error={error}>
      <Container>
        <Row className="mb-2">
          <Col>
            <Link
              to="/council/displaydetails"
              onClick={() => {
                clickCard(constituencies?.council)
              }}
            >
              <h2 className="text-white">{`${council?.leader.fullName}'s Constituencies`}</h2>
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
          <RoleView roles={permitAdmin('Council')}>
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

        <AllChurchesSummary
          church={constituencies}
          memberCount={council?.memberCount}
          numberOfChurchesBelow={constituencies?.length}
          churchType="Constituency"
          route="council"
        />
        <ChurchSearch data={constituencies} churchType="Constituency" />
      </Container>
    </BaseComponent>
  )
}

export default DisplayAllConstituencies
