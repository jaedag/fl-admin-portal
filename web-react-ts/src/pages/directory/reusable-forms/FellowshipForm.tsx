import { useMutation } from '@apollo/client'
import { Form, Formik, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import {
  DECIMAL_NUM_REGEX,
  isAuthorised,
  SERVICE_DAY_OPTIONS,
  throwToSentry,
  VACATION_ONLINE_OPTIONS,
  VACATION_OPTIONS,
} from 'global-utils'
import { useContext, useState } from 'react'
import { ChurchContext } from 'contexts/ChurchContext'
import { MAKE_FELLOWSHIP_INACTIVE } from 'pages/directory/update/CloseChurchMutations'
import { useNavigate } from 'react-router'
import RoleView from 'auth/RoleView'
import {
  Container,
  Row,
  Col,
  Button,
  Spinner,
  ButtonGroup,
  Modal,
} from 'react-bootstrap'
import { MemberContext } from 'contexts/MemberContext'
import './Forms.css'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import SubmitButton from 'components/formik/SubmitButton'
import { DISPLAY_BACENTA } from 'pages/directory/display/ReadQueries'
import { permitAdmin, permitMe } from 'permission-utils'
import Input from 'components/formik/Input'
import SearchMember from 'components/formik/SearchMember'
import Select from 'components/formik/Select'
import { FormikInitialValues } from 'components/formik/formik-types'
import { Bacenta } from 'global-types'

export interface FellowshipFormValues extends FormikInitialValues {
  bacenta?: Bacenta
  meetingDay: string
  vacationStatus: string
  venueLatitude: string | number
  venueLongitude: string | number
}

type FellowshipFormProps = {
  initialValues: FellowshipFormValues
  title: string
  newFellowship: boolean
  onSubmit: (
    values: FellowshipFormValues,
    onSubmitProps: FormikHelpers<FellowshipFormValues>
  ) => void
}

const VerifyNotMe = ({
  leaderId,
  children,
}: {
  leaderId: string
  children: JSX.Element
}) => {
  const { currentUser } = useContext(MemberContext)

  if (currentUser?.id === leaderId) {
    return <></>
  }

  return children
}

const FellowshipForm = (props: FellowshipFormProps) => {
  const { initialValues, onSubmit, title, newFellowship } = props
  const { fellowshipId, clickCard } = useContext(ChurchContext)
  const { currentUser } = useContext(MemberContext)
  const [closeDown, setCloseDown] = useState(false)
  const navigate = useNavigate()

  const [buttonLoading, setButtonLoading] = useState(false)
  const [CloseDownFellowship] = useMutation(MAKE_FELLOWSHIP_INACTIVE, {
    refetchQueries: [
      {
        query: DISPLAY_BACENTA,
        variables: { id: initialValues.bacenta },
      },
    ],
  })

  const validationSchema = Yup.object({
    name: Yup.string().required('Fellowship Name is a required field'),
    leaderId: Yup.string().required(
      'Please choose a leader from the drop down'
    ),
    meetingDay: Yup.string().required('Meeting Day is a required field'),
    vacationStatus: Yup.string().required(
      'Vacation Status is a required field'
    ),
    venueLatitude: Yup.string()
      .required('Please fill in your location info')
      .test(
        'is-decimal',
        'Please enter valid coordinates',
        (value) => !!(value + '').match(DECIMAL_NUM_REGEX)
      ),
    venueLongitude: Yup.string()
      .required('Please fill in your location info')
      .test(
        'is-decimal',
        'Please enter valid coordinates',
        (value) => !!(value + '').match(DECIMAL_NUM_REGEX)
      ),
  })

  const [positionLoading, setPositionLoading] = useState(false)

  const vacationOptions = isAuthorised(permitMe('Campus'), currentUser.roles)
    ? VACATION_ONLINE_OPTIONS
    : VACATION_OPTIONS

  return (
    <>
      <Container>
        <HeadingPrimary>{title}</HeadingPrimary>
        <HeadingSecondary>{initialValues.name}</HeadingSecondary>
        <ButtonGroup className="mt-3">
          {!newFellowship && (
            <>
              <RoleView roles={permitAdmin('Ministry')}>
                <Button
                  variant="warning"
                  onClick={() => {
                    navigate('/fellowship/make-hub-fellowship')
                  }}
                >
                  Hub Fellowship Options
                </Button>
              </RoleView>
              <Button variant="danger" onClick={() => setCloseDown(true)}>
                {`Close Down Fellowship`}
              </Button>
            </>
          )}
        </ButtonGroup>
      </Container>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        validateOnMount
      >
        {(formik) => (
          <Container className="py-4">
            <Form>
              <div className="form-group">
                <Row className="row-cols-1 row-cols-md-2">
                  {/* <!-- Basic Info Div --> */}

                  <Col className="mb-2">
                    <Row className="form-row">
                      <RoleView roles={permitAdmin('Constituency')}>
                        <VerifyNotMe leaderId={initialValues.leaderId}>
                          <>
                            <Col sm={12}>
                              <Input
                                name="name"
                                label="Name of Fellowship"
                                placeholder="Name of Fellowship"
                              />
                            </Col>

                            <Col sm={12}>
                              <Select
                                label="Meeting Day"
                                name="meetingDay"
                                options={SERVICE_DAY_OPTIONS}
                                defaultOption="Pick a Service Day"
                              />
                            </Col>

                            <Col sm={12}>
                              <Select
                                label="Vacation Status"
                                name="vacationStatus"
                                options={vacationOptions}
                                defaultOption="Select Vacation Status"
                              />
                            </Col>
                          </>
                        </VerifyNotMe>
                      </RoleView>
                      <RoleView roles={permitAdmin('Constituency')}>
                        <VerifyNotMe leaderId={initialValues.leaderId}>
                          <Col sm={12}>
                            <SearchMember
                              name="leaderId"
                              label="Fellowship Leader"
                              initialValue={initialValues.leaderName}
                              placeholder="Select a Leader"
                              setFieldValue={formik.setFieldValue}
                              aria-describedby="Member Search Box"
                              error={formik.errors.leaderId}
                            />
                          </Col>
                        </VerifyNotMe>
                      </RoleView>
                    </Row>
                    <small className="text-muted">
                      Enter The Coordinates for the Service Venue
                    </small>

                    <Row className="row-cols-2 d-flex align-items-center">
                      <Col>
                        <Input name="venueLatitude" placeholder="Latitude" />
                      </Col>
                      <Col>
                        <Input name="venueLongitude" placeholder="Longitude" />
                      </Col>
                      <Col className="my-2">
                        <Button
                          variant="primary"
                          className="btn-loading"
                          disabled={positionLoading}
                          onClick={() => {
                            setPositionLoading(true)

                            window.navigator.geolocation.getCurrentPosition(
                              (position) => {
                                formik.setFieldValue(
                                  'venueLatitude',
                                  position.coords.latitude
                                )
                                formik.setFieldValue(
                                  'venueLongitude',
                                  position.coords.longitude
                                )
                                document
                                  .getElementById('venueLongitude')
                                  ?.focus()
                                document
                                  .getElementById('venueLatitude')
                                  ?.focus()
                                document.getElementById('venueLatitude')?.blur()
                                setPositionLoading(false)
                              }
                            )
                          }}
                        >
                          {positionLoading ? (
                            <>
                              <Spinner animation="grow" size="sm" />
                              <span> Loading</span>
                            </>
                          ) : (
                            'Locate Me Now'
                          )}
                        </Button>
                      </Col>
                    </Row>
                    <small className="text-muted">
                      Click this button if you are currently at your fellowship
                      service venue
                    </small>
                  </Col>
                </Row>
              </div>

              <div className="text-center">
                <SubmitButton formik={formik} />
              </div>
            </Form>

            <Modal show={closeDown} onHide={() => setCloseDown(false)} centered>
              <Modal.Header closeButton>Close Down Fellowship</Modal.Header>
              <Modal.Body>
                <p className="text-info">
                  Are you sure you want to close down this fellowship?
                </p>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="primary"
                  type="submit"
                  size="lg"
                  disabled={buttonLoading}
                  onClick={async () => {
                    try {
                      setButtonLoading(true)
                      const res = await CloseDownFellowship({
                        variables: {
                          id: fellowshipId,
                          leaderId: initialValues.leaderId,
                        },
                      })

                      setButtonLoading(false)
                      clickCard(res.data.CloseDownFellowship)
                      setCloseDown(false)
                      navigate('/fellowship/displayall')
                    } catch (error) {
                      setButtonLoading(false)
                      throwToSentry(
                        'There was an error closing down this fellowship',
                        error
                      )
                    }
                  }}
                >
                  {buttonLoading ? `Submitting...` : `Yes, I'm sure`}
                </Button>
              </Modal.Footer>
            </Modal>
          </Container>
        )}
      </Formik>
    </>
  )
}

export default FellowshipForm
