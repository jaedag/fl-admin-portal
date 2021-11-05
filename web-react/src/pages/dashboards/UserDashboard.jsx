import React, { useContext } from 'react'
import { useHistory } from 'react-router'
import ChurchGraph from 'components/ChurchGraph/ChurchGraph'
import './Dashboards.css'
import { MemberContext } from 'contexts/MemberContext'
import RoleCard from './RoleCard'
import { getMonthlyStatAverage } from '../reports/report-utils'
import StatDisplay from 'pages/reports/CompStatDisplay'
import Container from 'react-bootstrap/Container'
import { Col, Row } from 'react-bootstrap'
import Placeholder from '../../components/Placeholder'

const UserDashboard = () => {
  const { currentUser, userJobs } = useContext(MemberContext)
  const history = useHistory()

  return (
    <>
      <Container>
        <p className="mb-0">{`Welcome to`}</p>
        <Placeholder loading={!currentUser?.fullName} element="h5">
          <h5 className="font-weight-bold roboto">{`${currentUser?.fullName}'s Dashboard`}</h5>
        </Placeholder>

        <div className="card-button-row">
          <table>
            <tbody>
              <tr>
                {userJobs?.jobs &&
                  userJobs.jobs.map((role, i) => {
                    return (
                      <td
                        className="col-auto pl-0"
                        key={i}
                        onClick={() => {
                          role.clickCard()
                          history.push(role.link)
                        }}
                      >
                        <RoleCard number={role.number} role={role.name} />
                      </td>
                    )
                  })}
              </tr>
            </tbody>
          </table>
        </div>

        {userJobs?.assessmentData && (
          <>
            <Row className="mt-3">
              <Col>
                <StatDisplay
                  title="Avg Attendance"
                  loading={!userJobs}
                  statistic={getMonthlyStatAverage(
                    userJobs.assessmentData,
                    'attendance'
                  )}
                />
              </Col>

              <Col>
                <StatDisplay
                  title="Avg Income (in GH₵)"
                  loading={!userJobs}
                  statistic={getMonthlyStatAverage(
                    userJobs.assessmentData,
                    'income'
                  )}
                />
              </Col>
            </Row>
            <ChurchGraph
              loading={!userJobs}
              stat1="attendance"
              stat2="income"
              churchData={userJobs?.assessmentData}
              secondaryTitle={`${userJobs?.assessmentChurch.name} ${userJobs?.assessmentChurch.__typename}`}
            />
          </>
        )}
      </Container>
    </>
  )
}

export default UserDashboard
