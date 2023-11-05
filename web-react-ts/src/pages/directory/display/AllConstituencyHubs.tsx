import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_CONSTITUENCY_HUBS } from '../../../queries/ListQueries'
import { ChurchContext } from '../../../contexts/ChurchContext'
import RoleView from '../../../auth/RoleView'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { Container, Row, Col } from 'react-bootstrap'
import { permitAdmin } from 'permission-utils'
import AllChurchesSummary from 'components/AllChurchesSummary'
import ChurchSearch from 'components/ChurchSearch'
import { Constituency } from 'global-types'

const DisplayAllConstituencyHubs = () => {
  const { clickCard, constituencyId } = useContext(ChurchContext)

  const { data, loading, error } = useQuery(GET_CONSTITUENCY_HUBS, {
    variables: { id: constituencyId },
  })

  const constituency: Constituency = data?.constituencies[0]
  const hubs = constituency?.hubs ?? []

  const memberCount = hubs?.reduce((acc, curr) => acc + curr?.memberCount, 0)

  return (
    <ApolloWrapper data={data} loading={loading} error={error}>
      <Container>
        <Row className="mb-2">
          <Col>
            <Link
              to="/constituency/displaydetails"
              onClick={() => {
                clickCard(constituency)
              }}
            >
              <h4 className="text-white">{`${constituency?.name} Hubs`}</h4>
            </Link>
            <Link
              to="/member/displaydetails"
              onClick={() => {
                clickCard(constituency?.leader)
              }}
            >
              <h6 className="text-white text-small d-block ">
                <span className="text-muted">Leader: </span>
                {constituency?.leader
                  ? ` ${constituency.leader.fullName}`
                  : null}
              </h6>
            </Link>
            {constituency?.admin ? (
              <Link
                className="pb-4 text-white text-small"
                to="/member/displaydetails"
                onClick={() => {
                  clickCard(constituency?.admin)
                }}
              >
                <span className="text-muted">Admin :</span>{' '}
                {`${constituency?.admin?.fullName}`}
              </Link>
            ) : null}
          </Col>
          <RoleView roles={permitAdmin('Campus')} directoryLock>
            <Col className="col-auto">
              <Link to="/hub/addhub" className="btn btn-danger">
                Add Hub Constituency
              </Link>
            </Col>
          </RoleView>
        </Row>

        <AllChurchesSummary
          church={hubs && hubs[0]}
          memberCount={memberCount ?? 0}
          numberOfChurchesBelow={hubs?.length ?? 0}
          churchType="Hub"
          route="constituency"
        />
        <ChurchSearch data={hubs} churchType="Hub" />
      </Container>
    </ApolloWrapper>
  )
}

export default DisplayAllConstituencyHubs
