import { useMutation, useQuery } from '@apollo/client'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import {
  FieldArray,
  FieldArrayRenderProps,
  Form,
  Formik,
  FormikHelpers,
} from 'formik'
import * as Yup from 'yup'
import { makeSelectOptions, throwToSentry } from 'global-utils'
import { GET_DENOMINATIONS } from 'queries/ListQueries'
import React, { useContext, useState } from 'react'
import { ChurchContext } from 'contexts/ChurchContext'
import { arrayError } from 'components/formik/formik-utils'
import PlusSign from 'components/buttons/PlusMinusSign/PlusSign'
import MinusSign from 'components/buttons/PlusMinusSign/MinusSign'
import { MAKE_OVERSIGHT_INACTIVE } from 'pages/directory/update/CloseChurchMutations'
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
import SearchCampus from 'components/formik/SearchCampus'
import { FormikInitialValues } from 'components/formik/formik-types'
import { Church } from 'global-types'

export interface OversightFormValues extends FormikInitialValues {
  denomination: string
  campuses?: Church[]
}

type OversightFormProps = {
  initialValues: OversightFormValues
  onSubmit: (
    values: OversightFormValues,
    onSubmitProps: FormikHelpers<OversightFormValues>
  ) => void
  title: string
  newOversight: boolean
}

const OversightForm = ({
  initialValues,
  onSubmit,
  title,
  newOversight,
}: OversightFormProps) => {
  const { clickCard, oversightId } = useContext(ChurchContext)
  const { togglePopup, isOpen } = usePopup()
  const { theme } = useContext(MemberContext)

  const navigate = useNavigate()
  const { data, loading, error } = useQuery(GET_DENOMINATIONS)
  const [buttonLoading, setButtonLoading] = useState(false)
  const [CloseDownOversight] = useMutation(MAKE_OVERSIGHT_INACTIVE)

  const denominationOptions = makeSelectOptions(data?.denominations)
  const validationSchema = Yup.object({
    name: Yup.string().required(`Oversight Name is a required field`),
    leaderId: Yup.string().required(
      'Please choose a leader from the drop down'
    ),
    campuses: newOversight
      ? Yup.array().nullable()
      : Yup.array().of(
          Yup.object().required('Please pick a campus from the dropdown')
        ),
  })

  return (
    <ApolloWrapper loading={loading} error={error} data={data}>
      <>
        <Container>
          <HeadingPrimary>{title}</HeadingPrimary>
          <HeadingSecondary>
            {initialValues.name + ' Oversight'}
          </HeadingSecondary>
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
                      <RoleView roles={permitAdmin('Denomination')}>
                        <Row className="form-row">
                          <Col>
                            <Select
                              name="denomination"
                              label="Select a Denomination Service"
                              options={denominationOptions}
                              defaultOption="Select an Denomination"
                            />
                          </Col>
                        </Row>
                      </RoleView>

                      <Input
                        name="name"
                        label={`Name of Oversight`}
                        placeholder={`Name of Oversight`}
                      />

                      <Row className="d-flex align-items-center mb-3">
                        <RoleView roles={permitAdmin('Oversight')}>
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
                      {!newOversight && (
                        <>
                          <small className="pt-2">
                            {`Select any campuses that are being moved to this Oversight`}
                          </small>
                          <FieldArray name="campuses">
                            {(fieldArrayProps: FieldArrayRenderProps) => {
                              const { push, remove, form } = fieldArrayProps
                              const { values } = form
                              const { campuses } = values

                              return (
                                <>
                                  {campuses.map(
                                    (campus: Church, index: number) => (
                                      <Row key={index} className="form-row">
                                        <Col>
                                          <SearchCampus
                                            name={`campuses[${index}]`}
                                            placeholder="Campus Name"
                                            initialValue={campus?.name}
                                            setFieldValue={formik.setFieldValue}
                                            aria-describedby="Campus Name"
                                            error={arrayError(
                                              formik.errors.campuses,
                                              index
                                            )}
                                          />
                                        </Col>
                                        <Col className="col-auto d-flex">
                                          <PlusSign onClick={() => push('')} />
                                          {(index > 0 ||
                                            campuses?.length !== 1) && (
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
                  Are you sure you want to close down this oversight?
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={buttonLoading}
                    className={`btn-main ${theme}`}
                    onClick={() => {
                      setButtonLoading(true)
                      CloseDownOversight({
                        variables: {
                          id: oversightId,
                          leaderId: initialValues.leaderId,
                        },
                      })
                        .then((res) => {
                          setButtonLoading(false)
                          clickCard(res.data.CloseDownOversight)
                          togglePopup()
                          navigate(`/oversight/displayall`)
                        })
                        .catch((error) => {
                          setButtonLoading(false)
                          throwToSentry(
                            `There was an error closing down this oversight`,
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

              {!newOversight && (
                <Button
                  variant="primary"
                  size="lg"
                  disabled={formik.isSubmitting}
                  className={`btn-secondary ${theme} mt-3`}
                  onClick={togglePopup}
                >
                  {`Close Down Oversight`}
                </Button>
              )}
            </Container>
          )}
        </Formik>
      </>
    </ApolloWrapper>
  )
}

export default OversightForm
