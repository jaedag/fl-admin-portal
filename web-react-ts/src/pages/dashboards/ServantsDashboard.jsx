import React, { useContext } from 'react'
import { useNavigate } from 'react-router'
import ChurchGraph from 'components/ChurchGraph/ChurchGraph'
import './Dashboards.css'
import { MemberContext } from 'contexts/MemberContext'
import { useQuery } from '@apollo/client'
import { SERVANT_CHURCH_LIST } from './DashboardQueries'
import RoleCard from './RoleCard'
import {
  getServiceGraphData,
  getMonthlyStatAverage,
} from '../services/graphs/graphs-utils'
import { ChurchContext } from 'contexts/ChurchContext'
import StatDisplay from 'pages/services/graphs/CompStatDisplay'
import { authorisedLink, isAuthorised, plural } from 'global-utils'
import { permitMe } from 'permission-utils'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { Col, Row, Table, Container } from 'react-bootstrap'
import Placeholder from '../../components/Placeholder'

const ServantsDashboard = () => {
  const { memberId, currentUser } = useContext(MemberContext)
  const { clickCard } = useContext(ChurchContext)

  const navigate = useNavigate()
  let servantId = currentUser.id

  if (isAuthorised(permitMe('Constituency'), currentUser.roles)) {
    servantId = memberId
  }

  const { data, loading, error } = useQuery(SERVANT_CHURCH_LIST, {
    variables: { id: servantId },
  })
  const servant = data?.members[0]
  let roles = []
  let assessmentChurchData, assessmentChurch

  const setServantRoles = (servant, servantType, churchType) => {
    let verb

    switch (servantType) {
      case 'Leader':
        verb = `leads${churchType}`
        break
      case 'Admin':
        verb = `isAdminFor${churchType}`
        break
      case 'ArrivalsAdmin':
        verb = `isArrivalsAdminFor${churchType}`
        break
      default:
        break
    }

    const permittedForLink = permitMe(churchType)

    if (servantType === 'Admin' || servantType === 'ArrivalsAdmin') {
      const adminsOneChurch = servant[`${verb}`].length === 1 ?? false
      roles.push({
        name: adminsOneChurch
          ? churchType + ' ' + servantType
          : plural(churchType) + ' ' + servantType,
        church: servant[`${verb}`],
        number: servant[`${verb}`].length,
        clickCard: () => {
          clickCard(servant[`${verb}`][0])
        },
        link: authorisedLink(
          currentUser,
          permittedForLink,
          adminsOneChurch
            ? `/${churchType.toLowerCase()}/displaydetails`
            : `/servants/church-list`
        ),
      })

      assessmentChurch = servant[`${verb}`][0]
      return
    }

    const leadsOneChurch = servant[`${verb}`].length === 1 ?? false
    roles.push({
      name: leadsOneChurch ? churchType : plural(churchType),
      church: servant[`${verb}`],
      number: servant[`${verb}`]?.length,
      clickCard: () => {
        clickCard(servant[`${verb}`][0])
      },
      link: authorisedLink(
        currentUser,
        permittedForLink,
        leadsOneChurch
          ? `/${churchType.toLowerCase()}/displaydetails`
          : `/servants/church-list`
      ),
    })

    assessmentChurch = servant[`${verb}`][0]
  }

  const getServantRoles = (servant) => {
    if (servant?.leadsFellowship?.length) {
      setServantRoles(servant, 'Leader', 'Fellowship')
    }
    if (servant?.leadsBacenta?.length) {
      setServantRoles(servant, 'Leader', 'Bacenta')
    }
    if (servant?.leadsSonta?.length) {
      setServantRoles(servant, 'Leader', 'Sonta')
    }
    if (servant?.leadsConstituency?.length) {
      setServantRoles(servant, 'Leader', 'Constituency')
    }
    if (servant?.isAdminForConstituency?.length) {
      setServantRoles(servant, 'Admin', 'Constituency')
    }
    if (servant?.isArrivalsAdminForConstituency?.length) {
      setServantRoles(servant, 'ArrivalsAdmin', 'Constituency')
    }
    if (servant?.leadsCouncil?.length) {
      setServantRoles(servant, 'Leader', 'Council')
    }
    if (servant?.isAdminForCouncil?.length) {
      setServantRoles(servant, 'Admin', 'Council')
    }
    if (servant?.isArrivalsAdminForCouncil?.length) {
      setServantRoles(servant, 'ArrivalsAdmin', 'Council')
    }
    if (servant?.leadsMinistry?.length) {
      setServantRoles(servant, 'Leader', 'Ministry')
    }
    if (servant?.leadsStream?.length) {
      setServantRoles(servant, 'Leader', 'Stream')
    }
    if (servant?.isAdminForStream?.length) {
      setServantRoles(servant, 'Admin', 'Stream')
    }
    if (servant?.isArrivalsAdminForStream?.length) {
      setServantRoles(servant, 'ArrivalsAdmin', 'Stream')
    }
    if (servant?.leadsGatheringService?.length) {
      setServantRoles(servant, 'Leader', 'GatheringService')
    }
    if (servant?.isAdminForGatheringService?.length) {
      setServantRoles(servant, 'Admin', 'GatheringService')
    }
    if (servant?.isArrivalsAdminForGatheringService?.length) {
      setServantRoles(servant, 'ArrivalsAdmin', 'GatheringService')
    }
    if (servant?.leadsBasonta?.length) {
      setServantRoles(servant, 'Leader', 'Basonta')
    }
    //run the get graph function after all checking is done to avoid multiple unnecessary runs
    if (assessmentChurch) {
      return getServiceGraphData(assessmentChurch)
    }

    return
  }

  assessmentChurchData = servant && getServantRoles(servant)

  return (
    <ApolloWrapper data={data} loading={loading} error={error}>
      <Container>
        <Placeholder loading={!servant?.fullName} as="p">
          <p className="mb-0">{`Welcome to`}</p>
        </Placeholder>
        <Placeholder loading={!servant?.fullName} as="h5">
          <h5 className="font-weight-bold roboto">{`${servant?.fullName}'s Dashboard`}</h5>
        </Placeholder>

        <div className="card-button-row">
          <Table className="border-bottom-0">
            <tbody>
              <tr /*className="row justify-content-start"*/>
                {roles?.length ? (
                  roles.map((role, i) => {
                    return (
                      <td
                        className="col-auto p-0"
                        key={i}
                        onClick={() => {
                          clickCard(servant)
                          clickCard(role.church[0])
                          navigate(role.link)
                        }}
                      >
                        <RoleCard number={role.number} role={role.name} />
                      </td>
                    )
                  })
                ) : (
                  <td className="col-auto pl-0">
                    <RoleCard loading={!assessmentChurchData} />
                  </td>
                )}
              </tr>
            </tbody>
          </Table>
        </div>

        <>
          <Row className="mt-3">
            <Col>
              <StatDisplay
                title="Avg Weekly Attendance"
                loading={!assessmentChurchData}
                statistic={getMonthlyStatAverage(
                  assessmentChurchData,
                  'attendance'
                )}
              />
            </Col>

            <Col>
              <StatDisplay
                title="Avg Weekly Income (GH₵)"
                loading={!assessmentChurchData}
                statistic={getMonthlyStatAverage(
                  assessmentChurchData,
                  'income'
                )}
              />
            </Col>
          </Row>
          <ChurchGraph
            loading={!assessmentChurchData}
            stat1="attendance"
            stat2="income"
            churchData={assessmentChurchData}
            secondaryTitle={`${assessmentChurch?.name} ${assessmentChurch?.__typename}`}
          />
        </>
      </Container>
    </ApolloWrapper>
  )
}

export default ServantsDashboard
