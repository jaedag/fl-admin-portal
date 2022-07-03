import React, { useContext } from 'react'
import { useNavigate } from 'react-router'
import ChurchGraph from 'components/ChurchGraph/ChurchGraph'
import './Dashboards.css'
import { MemberContext } from 'contexts/MemberContext'
import RoleCard from './RoleCard'
import {
  getMonthlyStatAverage,
  getServiceGraphData,
} from '../services/graphs/graphs-utils'
import StatDisplay from 'pages/services/graphs/CompStatDisplay'
import { Col, Row, Table, Container } from 'react-bootstrap'
import Placeholder from '../../components/Placeholder'
import { ChurchContext } from 'contexts/ChurchContext'
import useComponentQuery from './useComponentQuery'

const UserDashboard = () => {
  const { currentUser, userJobs } = useContext(MemberContext)
  const { clickCard } = useContext(ChurchContext)
  const navigate = useNavigate()
  const { assessmentChurch } = useComponentQuery()
  const assessmentData = getServiceGraphData(assessmentChurch)

  return (
    <>
      <Container>
        <Placeholder loading={!currentUser?.fullName} as="p">
          <p className="mb-0">{`Welcome to`}</p>
        </Placeholder>
        <Placeholder loading={!currentUser?.fullName} as="h5">
          <h5 className="font-weight-bold roboto">{`${currentUser?.fullName}'s Dashboard`}</h5>
        </Placeholder>

        <div className="card-button-row">
          <Table className="border-bottom-0">
            <tbody>
              <tr /*className="row justify-content-start"*/>
                {userJobs ? (
                  userJobs?.map((role, i) => (
                    <td
                      className="col-auto p-0"
                      key={i}
                      onClick={() => {
                        clickCard(currentUser)
                        clickCard(role.church[0])
                        navigate(role.link)
                      }}
                    >
                      <RoleCard number={role.number} role={role.name} />
                    </td>
                  ))
                ) : (
                  <td className="col-auto pl-0">
                    <RoleCard loading={!userJobs} />
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
                loading={!assessmentData}
                statistic={getMonthlyStatAverage(assessmentData, 'attendance')}
              />
            </Col>

            <Col>
              <StatDisplay
                title="Avg Weekly Income (GH₵)"
                loading={!assessmentData}
                statistic={getMonthlyStatAverage(assessmentData, 'income')}
              />
            </Col>
          </Row>
          <ChurchGraph
            loading={!assessmentChurch}
            stat1="attendance"
            stat2="income"
            church={assessmentChurch?.__typename.toLowerCase()}
            churchData={assessmentData}
            secondaryTitle={`${assessmentChurch?.name} ${assessmentChurch?.__typename}`}
          />
        </>
      </Container>
    </>
  )
}

export default UserDashboard
