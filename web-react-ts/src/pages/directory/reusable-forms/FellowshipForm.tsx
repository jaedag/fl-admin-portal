import { useMutation, useQuery } from '@apollo/client'
import { Form, Formik, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import {
  DECIMAL_NUM_REGEX,
  makeSelectOptions,
  SERVICE_DAY_OPTIONS,
  throwErrorMsg,
  VACATION_OPTIONS,
} from 'global-utils'
import {
  GET_COUNCIL_CONSTITUENCIES,
  GET_CONSTITUENCY_BACENTAS,
} from 'queries/ListQueries'
import React, { useContext, useState } from 'react'
import { ChurchContext } from 'contexts/ChurchContext'
import { MAKE_FELLOWSHIP_INACTIVE } from 'pages/directory/update/CloseChurchMutations'
import { useNavigate } from 'react-router'
import Popup from 'components/Popup/Popup'
import RoleView from 'auth/RoleView'
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap'
import { MemberContext } from 'contexts/MemberContext'
import './Forms.css'
import LoadingScreen from 'components/base-component/LoadingScreen'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import SubmitButton from 'components/formik/SubmitButton'
import { DISPLAY_BACENTA } from 'pages/directory/display/ReadQueries'
import { permitAdmin } from 'permission-utils'
import usePopup from 'hooks/usePopup'
import Input from 'components/formik/Input'
import SearchMember from 'components/formik/SearchMember'
import Select from 'components/formik/Select'
import SelectWithQuery from 'components/formik/SelectWithQuery'
import { FormikInitialValues } from 'components/formik/formiik-types'

export interface FellowshipFormValues extends FormikInitialValues {
  constituencySelect: string
  bacenta: string
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

const FellowshipForm = (props: FellowshipFormProps) => {
  const { fellowshipId, councilId, clickCard } = useContext(ChurchContext)
  const { togglePopup, isOpen } = usePopup()
  const { theme } = useContext(MemberContext)
  const navigate = useNavigate()

  const { data, error } = useQuery(GET_COUNCIL_CONSTITUENCIES, {
    variables: { id: councilId },
  })

  const [buttonLoading, setButtonLoading] = useState(false)
  const [CloseDownFellowship] = useMutation(MAKE_FELLOWSHIP_INACTIVE, {
    refetchQueries: [
      {
        query: DISPLAY_BACENTA,
        variables: { id: props.initialValues.bacenta },
      },
    ],
  })

  if (error) {
    throwErrorMsg('', error)
  }

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

  const constituencyOptions = data
    ? makeSelectOptions(data.councils[0]?.constituencies)
    : []

  let constituencyIdVar = props.initialValues.constituencySelect

  if (!props.initialValues.name && !props.newFellowship) {
    return <LoadingScreen />
  }

  return (
    <>
      <Container>
        <HeadingPrimary>{props.title}</HeadingPrimary>
        <HeadingSecondary>{props.initialValues.name}</HeadingSecondary>
      </Container>
      <Formik
        initialValues={props.initialValues}
        validationSchema={validationSchema}
        onSubmit={props.onSubmit}
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
                        <Col>
                          <Select
                            label={`Constituency`}
                            name="constituencySelect"
                            options={constituencyOptions}
                            onChange={(e: any) => {
                              formik.setFieldValue(
                                'constituencySelect',
                                e.target.value
                              )
                              constituencyIdVar = e.target.value
                            }}
                            defaultOption={`Select a Constituency`}
                          />

                          <SelectWithQuery
                            name="bacenta"
                            label="Bacenta"
                            optionsQuery={GET_CONSTITUENCY_BACENTAS}
                            queryVariable="id"
                            dataset="bacentas"
                            varValue={
                              constituencyIdVar || props.initialValues.bacenta
                            }
                            defaultOption="Select a Bacenta"
                            initialValue={''}
                          />
                        </Col>
                      </RoleView>
                    </Row>

                    <Row className="form-row">
                      <RoleView roles={permitAdmin('Constituency')}>
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
                            options={VACATION_OPTIONS}
                            defaultOption="Select Vacation Status"
                          />
                        </Col>
                      </RoleView>
                      <RoleView roles={permitAdmin('Constituency')}>
                        <Col sm={12}>
                          <SearchMember
                            name="leaderId"
                            label="Fellowship Leader"
                            initialValue={props.initialValues.leaderName}
                            placeholder="Select a Leader"
                            setFieldValue={formik.setFieldValue}
                            aria-describedby="Member Search Box"
                            error={formik.errors.leaderId}
                          />
                        </Col>
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

              <SubmitButton formik={formik} />
            </Form>
            {isOpen && (
              <Popup handleClose={togglePopup}>
                Are you sure you want to close down this fellowship?
                <Button
                  variant="primary"
                  type="submit"
                  size="lg"
                  className={`btn-main ${theme}`}
                  onClick={() => {
                    setButtonLoading(false)
                    CloseDownFellowship({
                      variables: {
                        id: fellowshipId,
                        leaderId: props.initialValues.leaderId,
                      },
                    })
                      .then((res) => {
                        setButtonLoading(false)
                        clickCard(res.data.CloseDownFellowship)
                        togglePopup()
                        navigate('/bacenta/displaydetails')
                      })
                      .catch((error) => {
                        setButtonLoading(false)
                        throwErrorMsg(
                          'There was an error closing down this fellowship',
                          error
                        )
                      })
                  }}
                >
                  {buttonLoading ? `Submitting...` : `Yes, I'm sure`}
                </Button>
                <Button
                  variant="primary"
                  className={`btn-secondary mt-2 ${theme}`}
                  onClick={togglePopup}
                >
                  No, take me back
                </Button>
              </Popup>
            )}

            {!props.newFellowship && (
              <Button
                variant="primary"
                size="lg"
                disabled={formik.isSubmitting}
                className={`btn-secondary ${theme} mt-3`}
                onClick={togglePopup}
              >
                Close Down Fellowship
              </Button>
            )}
          </Container>
        )}
      </Formik>
    </>
  )
}

export default FellowshipForm
