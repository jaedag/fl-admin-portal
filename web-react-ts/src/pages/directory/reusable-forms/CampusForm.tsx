import { useMutation, useQuery } from '@apollo/client'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { FieldArray, Form, Formik, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import {
  CURRENCY_OPTIONS,
  YES_NO_OPTIONS,
  makeSelectOptions,
  throwToSentry,
} from 'global-utils'
import { GET_OVERSIGHTS } from 'queries/ListQueries'
import React, { useContext, useState } from 'react'
import { ChurchContext } from 'contexts/ChurchContext'
import { arrayError } from 'components/formik/formik-utils'
import PlusSign from 'components/buttons/PlusMinusSign/PlusSign'
import MinusSign from 'components/buttons/PlusMinusSign/MinusSign'
import { MAKE_CAMPUS_INACTIVE } from 'pages/directory/update/CloseChurchMutations'
import { useNavigate } from 'react-router'
import Popup from 'components/Popup/Popup'
import RoleView from 'auth/RoleView'
import { Button, Container, Row, Col } from 'react-bootstrap'
import { MemberContext } from 'contexts/MemberContext'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import SubmitButton from 'components/formik/SubmitButton'
import { permitAdmin } from 'permission-utils'
import usePopup from 'hooks/usePopup'
import Input from 'components/formik/Input'
import Select from 'components/formik/Select'
import SearchMember from 'components/formik/SearchMember'
import SearchStream from 'components/formik/SearchStream'
import { FormikInitialValues } from 'components/formik/formik-types'
import { Church } from 'global-types'

export interface CampusFormValues extends FormikInitialValues {
  conversionRateToDollar: number
  incomeTracking: string
  currency: string
  oversight: string
  streams?: Church[]
}

type CampusFormProps = {
  initialValues: CampusFormValues
  onSubmit: (
    values: CampusFormValues,
    onSubmitProps: FormikHelpers<CampusFormValues>
  ) => void
  title: string
  newCampus: boolean
}

const CampusForm = ({
  initialValues,
  onSubmit,
  title,
  newCampus,
}: CampusFormProps) => {
  const { clickCard, campusId } = useContext(ChurchContext)
  const { togglePopup, isOpen } = usePopup()
  const { theme } = useContext(MemberContext)

  const navigate = useNavigate()
  const { data, loading, error } = useQuery(GET_OVERSIGHTS)
  const [buttonLoading, setButtonLoading] = useState(false)
  const [CloseDownCampus] = useMutation(MAKE_CAMPUS_INACTIVE)

  const oversightOptions = makeSelectOptions(data?.oversights)
  const validationSchema = Yup.object({
    name: Yup.string().required(`Campus Name is a required field`),
    leaderId: Yup.string().required(
      'Please choose a leader from the drop down'
    ),
    incomeTracking: Yup.string().required(),
    currency: Yup.string(),
    conversionRateToDollar: Yup.number(),
    streams: newCampus
      ? Yup.array().nullable()
      : Yup.array().of(
          Yup.object().required('Please pick a stream from the dropdown')
        ),
  })

  return (
    <ApolloWrapper loading={loading} error={error} data={data}>
      <>
        <Container>
          <HeadingPrimary>{title}</HeadingPrimary>
          <HeadingSecondary>{initialValues.name + ' Campus'}</HeadingSecondary>
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
                      <RoleView roles={permitAdmin('Oversight')}>
                        <Row className="form-row">
                          <Col>
                            <Select
                              name="oversight"
                              label="Select a Oversight Service"
                              options={oversightOptions}
                              defaultOption="Select an Oversight"
                            />
                          </Col>
                        </Row>
                      </RoleView>

                      <Input
                        name="name"
                        label={`Name of Campus`}
                        placeholder={`Name of Campus`}
                      />

                      <Select
                        name="incomeTracking"
                        label="Will you be tracking income for this Campus?"
                        options={YES_NO_OPTIONS}
                        defaultOption="Choose One"
                      />

                      <Select
                        name="currency"
                        label="Currency"
                        options={CURRENCY_OPTIONS}
                        defaultOption="Select a Currency"
                      />

                      <Input
                        name="conversionRateToDollar"
                        label={`Dollar Conversion Rate (How Much Is $1 In Currency)`}
                        placeholder={`Dollar Conversion Rate`}
                      />

                      <Row className="d-flex align-items-center mb-3">
                        <RoleView roles={permitAdmin('Campus')}>
                          <Col>
                            <SearchMember
                              name="leaderId"
                              label="Choose a Leader"
                              placeholder="Start typing..."
                              initialValue={initialValues?.leaderName}
                              setFieldValue={formik.setFieldValue}
                              aria-describedby="Member Search Box"
                              error={formik.errors.leaderId}
                            />
                          </Col>
                        </RoleView>
                      </Row>
                      {!newCampus && (
                        <>
                          <small className="pt-2">
                            {`Select any streams that are being moved to this Campus`}
                          </small>
                          <FieldArray name="streams">
                            {(fieldArrayProps) => {
                              const { push, remove, form } = fieldArrayProps
                              const { values } = form
                              const { streams } = values

                              return (
                                <>
                                  {streams.map(
                                    (stream: Church, index: number) => (
                                      <Row key={index} className="form-row">
                                        <Col>
                                          <SearchStream
                                            name={`streams[${index}]`}
                                            placeholder="Stream Name"
                                            initialValue={stream?.name}
                                            setFieldValue={formik.setFieldValue}
                                            aria-describedby="Stream Name"
                                            error={arrayError(
                                              formik.errors.streams,
                                              index
                                            )}
                                          />
                                        </Col>
                                        <Col className="col-auto d-flex">
                                          <PlusSign onClick={() => push('')} />
                                          {(index > 0 ||
                                            streams?.length !== 1) && (
                                            <MinusSign
                                              onClick={() => remove(index)}
                                            />
                                          )}
                                        </Col>
                                      </Row>
                                    )
                                  )}
                                </>
                              )
                            }}
                          </FieldArray>
                        </>
                      )}
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
                    disabled={buttonLoading}
                    className={`btn-main ${theme}`}
                    onClick={() => {
                      setButtonLoading(true)
                      CloseDownCampus({
                        variables: {
                          id: campusId,
                          leaderId: initialValues.leaderId,
                        },
                      })
                        .then((res) => {
                          setButtonLoading(false)
                          clickCard(res.data.CloseDownCampus)
                          togglePopup()
                          navigate(`/campus/displayall`)
                        })
                        .catch((error) => {
                          setButtonLoading(false)
                          throwToSentry(
                            `There was an error closing down this campus`,
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

              {!newCampus && (
                <Button
                  variant="primary"
                  size="lg"
                  disabled={formik.isSubmitting}
                  className={`btn-secondary ${theme} mt-3`}
                  onClick={togglePopup}
                >
                  {`Close Down Campus`}
                </Button>
              )}
            </Container>
          )}
        </Formik>
      </>
    </ApolloWrapper>
  )
}

export default CampusForm
