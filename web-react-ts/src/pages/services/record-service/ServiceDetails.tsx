import { useMutation } from '@apollo/client'
import RoleView from 'auth/RoleView'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import PlaceholderCustom from 'components/Placeholder'
import SpinnerPage from 'components/SpinnerPage'
import TableFromArrays, {
  TableArray,
} from 'components/TableFromArrays/TableFromArrays'
import { MemberContext } from 'contexts/MemberContext'
import { Church, ServiceRecord } from 'global-types'
import { alertMsg } from 'global-utils'
import { parseNeoTime } from 'jd-date-utils'
import { permitAdmin } from 'permission-utils'
import { useContext, useEffect, useState } from 'react'
import { Col, Container, Row, Button, Card } from 'react-bootstrap'
import { CheckCircleFill, FileEarmarkArrowUpFill } from 'react-bootstrap-icons'
import { useNavigate } from 'react-router'
import { MANUALLY_CONFIRM_OFFERING_PAYMENT } from './RecordServiceMutations'
import './ServiceDetails.css'
import CurrencySpan from 'components/CurrencySpan'

type ServiceDetailsProps = {
  service: ServiceRecord
  church: Church
  loading: boolean
}

const ServiceDetails = ({ service, church, loading }: ServiceDetailsProps) => {
  const { theme, currentUser } = useContext(MemberContext)
  const navigate = useNavigate()
  const [ManuallyConfirmOfferingPayment] = useMutation(
    MANUALLY_CONFIRM_OFFERING_PAYMENT
  )
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!service && !loading) {
      navigate(-1)
    }
  }, [service, navigate])

  if (loading) {
    return <SpinnerPage />
  }

  let table: TableArray = [
    [
      'Date of Service',
      new Date(service?.serviceDate.date).toDateString() ?? '',
    ],

    ['Form Filled At', parseNeoTime(service?.createdAt) ?? ''],
  ]
  if (!service?.noServiceReason) {
    // Service Wasn't Cancelled
    table.push(['Attendance', service?.attendance.toString()])

    table.push(['Income', <CurrencySpan number={service?.income} />])
    // There is income for service
    if (service?.cash) {
      table.push(['Number of Tithers', service?.numberOfTithers?.toString()])
      if (service?.foreignCurrency) {
        table.push([
          'Foreign Currency',
          service?.foreignCurrency?.toString() ?? '',
        ])
      }

      table.push(['Cash', <CurrencySpan number={service?.cash} />])

      table.push(
        ...service?.treasurers.map((treasurer, i) => [
          `Treasurer ${i + 1}`,
          treasurer.fullName ?? '',
        ])
      )
    }

    if (service?.onlineGiving) {
      table.push(['Income', <CurrencySpan number={service?.income} />])
      table.push([
        'Online Giving',
        <CurrencySpan number={service?.onlineGiving} />,
      ])
    }
  }

  if (service?.noServiceReason) {
    table.push(['No Service Reason', service?.noServiceReason])
  }

  const noBankingProof =
    service?.income &&
    !service?.bankingProof &&
    !service?.bankingSlip &&
    !service?.onlineGiving

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
        {!currentUser.noIncomeTracking && service?.bankingSlipUploader && (
          <p className="fw-bold">{`Banking Slip Uploaded by ${service?.bankingSlipUploader.fullName}`}</p>
        )}
        {!currentUser.noIncomeTracking &&
          service?.transactionStatus === 'success' && (
            <p className="fw-bold">{`Offering Banked by ${service?.offeringBankedBy.fullName}`}</p>
          )}
        <RoleView roles={permitAdmin('Council')}>
          {!currentUser.noIncomeTracking && service?.bankingConfirmer && (
            <p className="fw-bold">{`Offering Confirmed by ${service?.bankingConfirmer.fullName}`}</p>
          )}
        </RoleView>
      </PlaceholderCustom>
      <Row>
        <Col>
          {service?.attendance && (
            <Row className="d-flex justify-content-center">
              <TableFromArrays tableArray={table} loading={loading} />
              <div className="text-center">
                {!currentUser.noIncomeTracking && service?.treasurerSelfie && (
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
                          src={service?.treasurerSelfie}
                          alt="treasurer selfie"
                        />
                      </PlaceholderCustom>
                    </div>
                  </>
                )}
                {service?.familyPicture && (
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
                          src={service?.familyPicture}
                          alt="service report"
                        />
                      </PlaceholderCustom>
                    </div>
                  </>
                )}
                {!currentUser.noIncomeTracking && service?.offeringBankedBy && (
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
                {!currentUser.noIncomeTracking && service?.bankingSlip && (
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
                          src={service?.bankingSlip}
                          alt="banking slip"
                        />
                      </PlaceholderCustom>
                    </div>
                  </>
                )}{' '}
                {noBankingProof && church.__typename !== 'Sonta' && (
                  <p className="fw-bold text-danger">
                    You Have Not Submitted Your Banking Slip!!!
                  </p>
                )}
                {noBankingProof && church.__typename !== 'Sonta' && (
                  <div className="d-grid gap-2">
                    <RoleView roles={permitAdmin('Oversight')}>
                      <Button
                        className="mt-3"
                        variant="warning"
                        disabled={submitting}
                        onClick={() => {
                          setSubmitting(true)
                          const confirmBox = window.confirm(
                            'Do you want to confirm banking for this service?'
                          )

                          if (confirmBox === true) {
                            ManuallyConfirmOfferingPayment({
                              variables: { serviceRecordId: service?.id },
                            }).then(() => {
                              setSubmitting(false)
                              alertMsg(
                                'Offering Payment has been confirmed. Thank you!'
                              )
                            })
                          }
                        }}
                      >
                        <CheckCircleFill />
                        {submitting ? 'Confirming...' : 'Confirm Offering'}
                      </Button>
                    </RoleView>
                    <RoleView roles={permitAdmin('Campus')}>
                      <Button
                        className="mb-3"
                        variant="danger"
                        onClick={() => {
                          navigate(
                            `/${church?.__typename.toLowerCase()}/banking-slip/submission`
                          )
                        }}
                      >
                        <FileEarmarkArrowUpFill />
                        Upload Banking Slip
                      </Button>
                    </RoleView>
                  </div>
                )}
                <div className="d-grid gap-2">
                  <Button
                    className={`btn-graphs ${theme}`}
                    onClick={() => {
                      navigate(`/${church?.__typename.toLowerCase()}/graphs`)
                    }}
                  >
                    View Last 4 Weeks
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
