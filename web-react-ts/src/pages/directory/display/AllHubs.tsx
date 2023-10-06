import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_HUBCOUNCIL_HUBS } from '../../../queries/ListQueries'
import { ChurchContext } from '../../../contexts/ChurchContext'
import RoleView from '../../../auth/RoleView'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { Container, Row, Col } from 'react-bootstrap'
import { permitAdmin } from 'permission-utils'
import AllChurchesSummary from 'components/AllChurchesSummary'
import DisplayChurchList from 'components/DisplayChurchList'
import NoDataComponent from 'pages/arrivals/CompNoData'

const DisplayAllHubs = () => {
  const { clickCard, hubCouncilId } = useContext(ChurchContext)

  const { data, loading, error } = useQuery(GET_HUBCOUNCIL_HUBS, {
    variables: { id: hubCouncilId },
  })

  const hubs = data?.hubCouncils[0]?.hubs

  const hubCouncil = data?.hubCouncils[0]

  return (
    <ApolloWrapper data={data} loading={loading} error={error}>
      <Container>
        <Row className="mb-2">
          <Col>
            <Link
              to="/hubCouncil/displaydetails"
              onClick={() => {
                clickCard(hubCouncil)
              }}
            >
              <h4 className="text-white">{`${hubCouncil?.name} Hubs`}</h4>
            </Link>
            <Link
              to="/member/displaydetails"
              onClick={() => {
                clickCard(hubCouncil?.leader)
              }}
            >
              <h6 className="text-white text-small d-block ">
                <span className="text-muted">Leader: </span>
                {hubCouncil?.leader ? ` ${hubCouncil.leader.fullName}` : null}
              </h6>
            </Link>
            {hubCouncil?.admin ? (
              <Link
                className="pb-4 text-white text-small"
                to="/member/displaydetails"
                onClick={() => {
                  clickCard(hubCouncil?.admin)
                }}
              >
                <span className="text-muted">Admin :</span>{' '}
                {`${hubCouncil?.admin?.fullName}`}
              </Link>
            ) : null}
          </Col>
          <RoleView roles={permitAdmin('CreativeArts')} directoryLock>
            <Col className="col-auto">
              <Link to="/hub/addhub" className="btn btn-danger">
                Add Hub
              </Link>
            </Col>
          </RoleView>
        </Row>

        <AllChurchesSummary
          church={hubs}
          memberCount={hubCouncil?.memberCount}
          numberOfChurchesBelow={hubs?.length}
          churchType="Hub"
          route="hubCouncil"
        />

        {hubCouncil?.councils.map((council: any) => {
          return (
            <>
              <Container>
                <p className="mb-0 fw-bold fs-5">
                  {council.name} Council: {council.hubsFromhubCouncil.length}{' '}
                  Hubs
                </p>
                {council.hubsFromhubCouncil.length === 0 && (
                  <NoDataComponent text="This Council has no hubs" />
                )}
              </Container>
              <DisplayChurchList
                data={council.hubsFromhubCouncil}
                churchType="HubCouncil"
              />
            </>
          )
        })}
      </Container>
    </ApolloWrapper>
  )
}

export default DisplayAllHubs
