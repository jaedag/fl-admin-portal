import { useQuery } from '@apollo/client'
import RoleView from 'auth/RoleView'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import CloudinaryImage from 'components/CloudinaryImage'
import CurrencySpan from 'components/CurrencySpan'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import PlaceholderCustom from 'components/Placeholder'
import Popup from 'components/Popup/Popup'
import { ChurchContext } from 'contexts/ChurchContext'
import { MemberContext } from 'contexts/MemberContext'
import { ServiceContext } from 'contexts/ServiceContext'
import usePopup from 'hooks/usePopup'
import { getHumanReadableDate, parseNeoTime } from 'jd-date-utils'
import { permitAdminArrivals, permitArrivalsCounter } from 'permission-utils'
import { useContext, useState } from 'react'
import { Button, Col, Container, Row, Table } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import { BacentaWithArrivals, VehicleRecord } from './arrivals-types'
import { beforeCountingDeadline } from './arrivals-utils'
import { DISPLAY_VEHICLE_RECORDS } from './arrivalsQueries'
import './Arrivals.css'

const BusVehicleFormDetails = () => {
  const { bacentaId } = useContext(ChurchContext)
  const { theme } = useContext(MemberContext)
  const { vehicleRecordId } = useContext(ServiceContext)
  const { isOpen, togglePopup } = usePopup()
  const [picturePopup, setPicturePopup] = useState('')
  const { data, loading, error } = useQuery(DISPLAY_VEHICLE_RECORDS, {
    variables: { vehicleRecordId: vehicleRecordId, bacentaId: bacentaId },
  })
  const navigate = useNavigate()
  const vehicle: VehicleRecord = data?.vehicleRecords[0]
  const church: BacentaWithArrivals = data?.bacentas[0]

  return (
    <ApolloWrapper loading={loading} error={error} data={data} placeholder>
      <Container>
        <PlaceholderCustom as="h3" loading={loading}>
          <HeadingPrimary>{`${church?.__typename} Vehicle Details`}</HeadingPrimary>
        </PlaceholderCustom>
        <PlaceholderCustom as="h6" loading={loading}>
          <HeadingSecondary>{`${church?.name} ${church?.__typename}`}</HeadingSecondary>
          <p>{`Recorded by ${vehicle?.created_by.fullName}`}</p>
          {vehicle?.counted_by ? (
            <p className="mb-0">
              {`Counted`}
              <RoleView roles={permitAdminArrivals('Stream')}>
                {` by `}
                <span className="good">{vehicle.counted_by.fullName}</span>
              </RoleView>
            </p>
          ) : null}
        </PlaceholderCustom>

        <Row>
          <Col>
            <Row className="d-flex justify-content-center mt-3">
              <Table variant={theme} striped bordered>
                <tbody>
                  <tr>
                    <td>Date of Service</td>
                    <PlaceholderCustom
                      as="td"
                      xs={12}
                      loading={loading}
                      className="td-placeholder"
                    >
                      <td>{getHumanReadableDate(vehicle?.createdAt)}</td>
                    </PlaceholderCustom>
                  </tr>

                  <tr>
                    <td>Leader Says</td>
                    <td>
                      <PlaceholderCustom loading={loading}>
                        {vehicle?.leaderDeclaration}
                      </PlaceholderCustom>
                    </td>
                  </tr>
                  <tr>
                    <td>Confirmed Attendance</td>
                    <td className="good">
                      <PlaceholderCustom loading={loading}>
                        {vehicle?.attendance}
                      </PlaceholderCustom>
                    </td>
                  </tr>
                  <tr>
                    <td>Vehicle Cost</td>
                    <td>
                      <PlaceholderCustom loading={loading}>
                        <CurrencySpan number={vehicle?.vehicleCost} />
                      </PlaceholderCustom>
                    </td>
                  </tr>

                  <tr>
                    <td>Personal Contribution</td>
                    <td className="good">
                      <PlaceholderCustom loading={loading}>
                        <CurrencySpan number={vehicle?.personalContribution} />
                      </PlaceholderCustom>
                    </td>
                  </tr>

                  <tr>
                    <td>Vehicle Top Up</td>
                    <td className="good">
                      <PlaceholderCustom loading={loading}>
                        <CurrencySpan number={vehicle?.vehicleTopUp} />
                      </PlaceholderCustom>
                    </td>
                  </tr>

                  {vehicle?.vehicle && (
                    <tr>
                      <td>Category</td>
                      <td>
                        <PlaceholderCustom loading={loading}>
                          {vehicle?.vehicle}
                        </PlaceholderCustom>
                      </td>
                    </tr>
                  )}

                  {vehicle?.mobileNetwork && (
                    <tr>
                      <td>Mobile Network</td>
                      <td>
                        <PlaceholderCustom loading={loading}>
                          {vehicle?.mobileNetwork}
                        </PlaceholderCustom>
                      </td>
                    </tr>
                  )}
                  {vehicle?.momoNumber && (
                    <tr>
                      <td>Momo Number</td>
                      <td>
                        <PlaceholderCustom loading={loading}>
                          {vehicle?.momoNumber}
                        </PlaceholderCustom>
                      </td>
                    </tr>
                  )}
                  {vehicle?.momoName && (
                    <tr>
                      <td>Momo Name</td>
                      <td>
                        <PlaceholderCustom loading={loading}>
                          {vehicle?.momoName}
                        </PlaceholderCustom>
                      </td>
                    </tr>
                  )}
                  {vehicle?.arrivalTime && (
                    <tr>
                      <td>Arrival Time</td>
                      <td className="fw-bold good">
                        <PlaceholderCustom loading={loading}>
                          {parseNeoTime(vehicle?.arrivalTime.toString())}
                        </PlaceholderCustom>
                      </td>
                    </tr>
                  )}
                  {vehicle?.outbound && (
                    <tr>
                      <td>In and Out</td>
                      <td className="fw-bold text-warning">
                        <PlaceholderCustom loading={loading}>
                          {vehicle?.outbound ? 'In and Out' : 'In Only'}
                        </PlaceholderCustom>
                      </td>
                    </tr>
                  )}
                  {vehicle?.comments && (
                    <tr>
                      <td>Comments</td>
                      <td>
                        <i>
                          <PlaceholderCustom loading={loading}>
                            {vehicle?.comments}
                          </PlaceholderCustom>
                        </i>
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
              <Row className="text-center">
                {isOpen && (
                  <Popup handleClose={togglePopup}>
                    <CloudinaryImage
                      src={picturePopup}
                      className="full-width"
                      size="respond"
                    />
                  </Popup>
                )}
                {vehicle?.picture ? (
                  <>
                    <h6>Vehicle Picture</h6>
                    <div className="container card-button-row">
                      <table>
                        <tbody>
                          <tr className="col-height">
                            <td
                              onClick={() => {
                                setPicturePopup(vehicle?.picture)
                                togglePopup()
                              }}
                              key={vehicle?.picture}
                            >
                              <CloudinaryImage
                                src={vehicle?.picture}
                                size="respond"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </>
                ) : null}
              </Row>
            </Row>
          </Col>
        </Row>
        <div className="d-grid gap-2">
          <RoleView roles={permitArrivalsCounter()}>
            {beforeCountingDeadline(vehicle, church) && (
              <>
                {!vehicle.arrivalTime && (
                  <>
                    <Button
                      variant="warning"
                      onClick={() =>
                        navigate('/arrivals/submit-vehicle-attendance')
                      }
                    >
                      I Want to Count
                    </Button>
                  </>
                )}
              </>
            )}
            <Button
              variant="outline-danger"
              onClick={() => navigate('/arrivals/bacentas-to-count')}
            >
              Continue Counting
            </Button>
          </RoleView>
          <Button
            variant="outline-primary"
            size="lg"
            onClick={() => navigate('/arrivals')}
          >
            Back to Arrivals Home
          </Button>
        </div>
      </Container>
    </ApolloWrapper>
  )
}

export default BusVehicleFormDetails
