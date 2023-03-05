import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import PlaceholderCustom from 'components/Placeholder'
import SpinnerPage from 'components/SpinnerPage'
import TableFromArrays from 'components/TableFromArrays/TableFromArrays'
import { MemberContext } from 'contexts/MemberContext'
import { Church, ServiceRecord } from 'global-types'
import { parseNeoTime } from 'jd-date-utils'
import React, { useContext, useEffect } from 'react'
import { Col, Container, Row, Button, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import './ServiceDetails.css'

type ServiceDetailsProps = {
  service: ServiceRecord
  church: Church
  loading: boolean
}

const ServiceDetails = ({ service, church, loading }: ServiceDetailsProps) => {
  const { theme, currentUser } = useContext(MemberContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (!service && !loading) {
      navigate(-1)
    }
  }, [service, navigate])

  if (loading) {
    return <SpinnerPage />
  }

  let table: string[][] = [
    [
      'Date of Service',
      new Date(service.serviceDate.date).toDateString() ?? '',
    ],

    ['Form Filled At', parseNeoTime(service.createdAt) ?? ''],
  ]
  if (!service.noServiceReason) {
    table.push(['Attendance', service?.attendance.toString()])

    if (!currentUser.noIncome) {
      table.push(['Number of Tithers', service?.numberOfTithers.toString()])
      if (service?.foreignCurrency) {
        table.push([
          'Foreign Currency',
          service?.foreignCurrency?.toString() ?? '',
        ])
      }
      table.push(
        ['Income', service.income.toString()],
        ...service.treasurers.map((treasurer, i) => [
          `Treasurer ${i + 1}`,
          treasurer.fullName ?? '',
        ])
      )
    }
  }

  if (service.noServiceReason) {
    table.push(['No Service Reason', service.noServiceReason])
  }

  return (
    <Container>
      <PlaceholderCustom as="h3" loading={loading}>
        <HeadingPrimary>{`${church?.__typename} Service Details`}</HeadingPrimary>
      </PlaceholderCustom>
      <PlaceholderCustom as="h6" loading={loading}>
        <HeadingSecondary>{`${church?.name} ${church?.__typename}`}</HeadingSecondary>
        {service?.created_by && (
          <p>{`Recorded by ${service?.created_by?.fullName}`}</p>
        )}
        {!currentUser.noIncome && service?.bankingSlipUploader && (
          <p className="fw-bold">{`Banking Slip Uploaded by ${service?.bankingSlipUploader.fullName}`}</p>
        )}
        {!currentUser.noIncome && service?.offeringBankedBy && (
          <p className="fw-bold">{`Offering Banked by ${service?.offeringBankedBy.fullName}`}</p>
        )}
      </PlaceholderCustom>
      <Row>
        <Col>
          {service?.attendance && (
            <Row className="d-flex justify-content-center">
              <TableFromArrays tableArray={table} loading={loading} />
              <div className="text-center">
                {!currentUser.noIncome && service?.treasurerSelfie && (
                  <>
                    <h6>Treasurer Selfie</h6>
                    <div>
                      <PlaceholderCustom
                        className="report-picture placeholder"
                        xs={12}
                        loading={loading}
                      >
                        <img
                          className="report-picture"
                          src={service.treasurerSelfie}
                          alt="treasurer selfie"
                        />
                      </PlaceholderCustom>
                    </div>
                  </>
                )}
                {service.familyPicture && (
                  <>
                    <h6>Family Picture</h6>
                    <div>
                      <PlaceholderCustom
                        loading={loading}
                        className="report-picture placeholder"
                        xs={12}
                      >
                        <img
                          className="report-picture"
                          src={service.familyPicture}
                          alt="service report"
                        />
                      </PlaceholderCustom>
                    </div>
                  </>
                )}
                {!currentUser.noIncome && service?.offeringBankedBy && (
                  <div className="mb-4">
                    {`${service?.offeringBankedBy.fullName} used the Self Banking Feature. Click this button to see
                    Details`}
                    <p>
                      <Button onClick={() => navigate('/self-banking/receipt')}>
                        View Banking Details
                      </Button>
                    </p>
                  </div>
                )}
                {!currentUser.noIncome && service?.bankingSlip && (
                  <>
                    <h6>Banking Slip</h6>

                    <div>
                      <PlaceholderCustom
                        loading={loading}
                        className="report-picture placeholder"
                        xs={12}
                      >
                        <img
                          className="report-picture"
                          src={service.bankingSlip}
                          alt="banking slip"
                        />
                      </PlaceholderCustom>
                    </div>
                  </>
                )}{' '}
                {!currentUser.noIncome &&
                  !service?.bankingProof &&
                  !service.bankingSlip &&
                  service?.treasurerSelfie && (
                    <p className="fw-bold text-danger">
                      You Have Not Submitted Your Banking Slip!!!
                    </p>
                  )}
                <div className="d-grid gap-2">
                  <Button
                    className={`btn-graphs ${theme}`}
                    onClick={() => {
                      navigate(`/${church?.__typename.toLowerCase()}/graphs`)
                    }}
                  >
                    View Graphs
                  </Button>
                </div>
              </div>
            </Row>
          )}
          {service?.noServiceReason && (
            <Card>
              <Card.Body>
                <div>{`Cancelled Service was held on ${new Date(
                  service?.serviceDate.date
                ).toDateString()}`}</div>
                <div>{`Reason: ${service?.noServiceReason}`}</div>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default ServiceDetails
