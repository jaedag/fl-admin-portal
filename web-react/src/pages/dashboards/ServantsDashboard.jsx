import { useContext } from 'react'
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
import BaseComponent from 'components/base-component/BaseComponent'
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

  const setServantRoles = (member, memberType, churchType) => {
    let verb

    switch (memberType) {
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

    if (memberType === 'Admin' || memberType === 'ArrivalsAdmin') {
      const adminsOneChurch = member[`${verb}`].length === 1 ?? false
      roles.push({
        name: adminsOneChurch
          ? churchType + ' ' + memberType
          : plural(churchType) + ' ' + memberType,
        church: member[`${verb}`],
        number: member[`${verb}`].length,
        clickCard: () => {
          clickCard(member[`${verb}`][0])
        },
        link: authorisedLink(
          currentUser,
          permittedForLink,
          adminsOneChurch
            ? `/${churchType.toLowerCase()}/displaydetails`
            : `/members/church-list`
        ),
      })

      assessmentChurch = member[`${verb}`][0]
      return
    }

    const leadsOneChurch = member[`${verb}`].length === 1 ?? false
    roles.push({
      name: leadsOneChurch ? churchType : plural(churchType),
      church: member[`${verb}`],
      number: member[`${verb}`]?.length,
      clickCard: () => {
        clickCard(member[`${verb}`][0])
      },
      link: authorisedLink(
        currentUser,
        permittedForLink,
        leadsOneChurch
          ? `/${churchType.toLowerCase()}/displaydetails`
          : `/members/church-list`
      ),
    })

    assessmentChurch = member[`${verb}`][0]
  }

  const getServantRoles = (member) => {
    if (member?.leadsFellowship?.length) {
      setServantRoles(member, 'Leader', 'Fellowship')
    }
    if (member?.leadsBacenta?.length) {
      setServantRoles(member, 'Leader', 'Bacenta')
    }
    if (member?.leadsSonta?.length) {
      setServantRoles(member, 'Leader', 'Sonta')
    }
    if (member?.leadsConstituency?.length) {
      setServantRoles(member, 'Leader', 'Constituency')
    }
    if (member?.isAdminForConstituency?.length) {
      setServantRoles(member, 'Admin', 'Constituency')
    }
    if (member?.isArrivalsAdminForConstituency?.length) {
      setServantRoles(member, 'ArrivalsAdmin', 'Constituency')
    }
    if (member?.leadsCouncil?.length) {
      setServantRoles(member, 'Leader', 'Council')
    }
    if (member?.isAdminForCouncil?.length) {
      setServantRoles(member, 'Admin', 'Council')
    }
    if (member?.isArrivalsAdminForCouncil?.length) {
      setServantRoles(member, 'ArrivalsAdmin', 'Council')
    }
    if (member?.leadsMinistry?.length) {
      setServantRoles(member, 'Leader', 'Ministry')
    }
    if (member?.leadsStream?.length) {
      setServantRoles(member, 'Leader', 'Stream')
    }
    if (member?.isAdminForStream?.length) {
      setServantRoles(member, 'Admin', 'Stream')
    }
    if (member?.isArrivalsAdminForStream?.length) {
      setServantRoles(member, 'ArrivalsAdmin', 'Stream')
    }
    if (member?.leadsGatheringService?.length) {
      setServantRoles(member, 'Leader', 'GatheringService')
    }
    if (member?.isAdminForGatheringService?.length) {
      setServantRoles(member, 'Admin', 'GatheringService')
    }
    if (member?.isArrivalsAdminForGatheringService?.length) {
      setServantRoles(member, 'ArrivalsAdmin', 'GatheringService')
    }
    if (member?.leadsBasonta?.length) {
      setServantRoles(member, 'Leader', 'Basonta')
    }
    //run the get graph function after all checking is done to avoid multiple unnecessary runs
    if (assessmentChurch) {
      return getServiceGraphData(assessmentChurch)
    }

    return
  }

  assessmentChurchData = servant && getServantRoles(servant)

  return (
    <BaseComponent data={data} loading={loading} error={error}>
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
    </BaseComponent>
  )
}

export default ServantsDashboard
