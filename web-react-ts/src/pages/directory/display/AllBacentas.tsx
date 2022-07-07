import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_CONSTITUENCY_BACENTAS } from '../../../queries/ListQueries'
import { ChurchContext } from '../../../contexts/ChurchContext'
import RoleView from '../../../auth/RoleView'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { Col, Container, Row } from 'react-bootstrap'
import { permitAdmin } from 'permission-utils'
import AllChurchesSummary from 'components/AllChurchesSummary'
import 'components/AllChurchesSummary.css'
import ChurchSearch from 'components/ChurchSearch'

const DisplayAllBacentas = () => {
  const { constituencyId, setBacentaId, setConstituencyId, clickCard } =
    useContext(ChurchContext)

  const { data, loading, error } = useQuery(GET_CONSTITUENCY_BACENTAS, {
    variables: { id: constituencyId },
  })

  const constituency = data?.constituencies[0]

  return (
    <ApolloWrapper loading={loading} data={data} error={error}>
      <Container>
        <Row className="mb-2">
          <Col>
            <Link
              to={`/constituency/displaydetails`}
              onClick={() => {
                setConstituencyId(constituencyId)
              }}
            >
              {' '}
              <h2 className="text-white">{`${constituency?.name} Constituency`}</h2>
            </Link>
            <Link
              to="/member/displaydetails"
              onClick={() => {
                clickCard(constituency?.leader)
              }}
            >
              <h6 className="text-white d-block text-small">
                <span className="text-muted">CO:</span>
                {constituency?.leader && ` ${constituency?.leader.fullName}`}
              </h6>
            </Link>
            {constituency?.admin ? (
              <Link
                className="pb-4"
                to="/member/displaydetails"
                onClick={() => {
                  clickCard(constituency?.admin)
                }}
              >
                {`Admin: ${constituency?.admin?.fullName}`}
              </Link>
            ) : null}
          </Col>
          <RoleView roles={permitAdmin('Constituency')}>
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
          church={constituency}
          memberCount={constituency?.memberCount}
          numberOfChurchesBelow={constituency?.bacentas.length}
          churchType="Bacenta"
          route="constituency"
        />

        <ChurchSearch
          data={constituency?.bacentas}
          setter={setBacentaId}
          churchType="Bacenta"
        />
      </Container>
    </ApolloWrapper>
  )
}

export default DisplayAllBacentas
