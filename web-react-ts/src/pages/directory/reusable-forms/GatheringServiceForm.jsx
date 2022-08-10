import { useMutation, useQuery } from '@apollo/client'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { FieldArray, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { makeSelectOptions, throwErrorMsg } from 'global-utils'
import { permitAdmin } from 'permission-utils'
import { GET_OVERSIGHTS } from 'queries/ListQueries'
import React, { useContext, useState } from 'react'
import { ChurchContext } from 'contexts/ChurchContext'
import FormikControl from 'components/formik-components/FormikControl'
import PlusSign from 'components/buttons/PlusMinusSign/PlusSign'
import MinusSign from 'components/buttons/PlusMinusSign/MinusSign'
import { MAKE_GATHERING_SERVICE_INACTIVE } from 'pages/directory/update/CloseChurchMutations'
import { useNavigate } from 'react-router'
import Popup from 'components/Popup/Popup'
import RoleView from 'auth/RoleView'
import { Button, Container, Row, Col } from 'react-bootstrap'
import { MemberContext } from 'contexts/MemberContext'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import SubmitButton from 'components/formik-components/SubmitButton'
import usePopup from 'hooks/usePopup'

const GatheringServiceForm = ({
  initialValues,
  onSubmit,
  title,
  newGatheringService,
}) => {
  const { clickCard, gatheringServiceId } = useContext(ChurchContext)
  const { theme } = useContext(MemberContext)
  const { togglePopup, isOpen } = usePopup()
  const navigate = useNavigate()
  const { data: oversightData, loading, error } = useQuery(GET_OVERSIGHTS)
  const [buttonLoading, setButtonLoading] = useState(false)
  const [CloseDownGatheringService] = useMutation(
    MAKE_GATHERING_SERVICE_INACTIVE
  )

  const oversightOptions = makeSelectOptions(oversightData?.oversights)

  const validationSchema = Yup.object({
    name: Yup.string().required(`Gathering Service Name is a required field`),
    leaderId: Yup.string().required(
      'Please choose a leader from the drop down'
    ),
    streams: newGatheringService
      ? null
      : Yup.array().of(
          Yup.object().required('Please pick a stream from the dropdown')
        ),
  })

  return (
    <ApolloWrapper loading={loading} error={error} data={oversightData}>
      <Container>
        <HeadingPrimary>{title}</HeadingPrimary>
        <HeadingSecondary>
          {initialValues.name + ' Gathering Service'}
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
                    <RoleView roles={permitAdmin('Oversight')}>
                      <Row className="form-row">
                        <Col>
                          <FormikControl
                            control="select"
                            name="oversight"
                            label="Select an Oversight"
                            options={oversightOptions}
                            defaultOption="Select an Oversight"
                          />
                        </Col>
                      </Row>
                    </RoleView>

                    <FormikControl
                      control="input"
                      name="name"
                      label={`Name of Gathering Service`}
                      placeholder={`Name of Gathering Service`}
                    />

                    <Row className="d-flex align-items-center mb-3">
                      <RoleView roles={permitAdmin('Oversight')}>
                        <Col>
                          <FormikControl
                            control="memberSearch"
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
                    {!newGatheringService && (
                      <>
                        <small className="pt-2">
                          {`Select any streams that are being moved to this Gathering Service`}
                        </small>
                        <FieldArray name="streams">
                          {(fieldArrayProps) => {
                            const { push, remove, form } = fieldArrayProps
                            const { values } = form
                            const { streams } = values
                            return (
                              <>
                                {streams.map((stream, index) => (
                                  <Row key={index} className="form-row">
                                    <Col>
                                      <FormikControl
                                        control="streamSearch"
                                        name={`streams[${index}]`}
                                        placeholder="Stream Name"
                                        initialValue={stream?.name}
                                        setFieldValue={formik.setFieldValue}
                                        aria-describedby="Stream Name"
                                        error={
                                          formik.errors.streams &&
                                          formik.errors.streams[index]
                                        }
                                      />
                                    </Col>
                                    <Col className="col-auto d-flex">
                                      <PlusSign onClick={() => push()} />
                                      {(index > 0 || streams?.length !== 1) && (
                                        <MinusSign
                                          onClick={() => remove(index)}
                                        />
                                      )}
                                    </Col>
                                  </Row>
                                ))}
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
                  className={`btn-main ${theme}`}
                  onClick={() => {
                    setButtonLoading(false)
                    CloseDownGatheringService({
                      variables: {
                        id: gatheringServiceId,
                        leaderId: initialValues.leaderId,
                      },
                    })
                      .then((res) => {
                        setButtonLoading(false)
                        clickCard(res.data.CloseDownGatheringService)
                        togglePopup()
                        navigate(`/gatheringservice/displayall`)
                      })
                      .catch((error) => {
                        throwErrorMsg(
                          `There was an error closing down this stream`,
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

            {!newGatheringService && (
              <Button
                variant="primary"
                size="lg"
                disabled={formik.isSubmitting}
                className={`btn-secondary ${theme} mt-3`}
                onClick={togglePopup}
              >
                {`Close Down Gathering Service`}
              </Button>
            )}
          </Container>
        )}
      </Formik>
    </ApolloWrapper>
  )
}

export default GatheringServiceForm
