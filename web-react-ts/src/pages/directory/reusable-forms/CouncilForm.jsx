import { useMutation, useQuery } from '@apollo/client'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { FieldArray, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { makeSelectOptions, throwErrorMsg } from 'global-utils'
import { GET_STREAMS } from 'queries/ListQueries'
import React, { useContext, useState } from 'react'
import { ChurchContext } from 'contexts/ChurchContext'
import PlusSign from 'components/buttons/PlusMinusSign/PlusSign'
import MinusSign from 'components/buttons/PlusMinusSign/MinusSign'
import { MAKE_COUNCIL_INACTIVE } from 'pages/directory/update/CloseChurchMutations'
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
import { arrayError } from 'components/formik/formik-utils'
import SearchConstituency from 'components/formik/SearchConstituency'

const CouncilForm = ({ initialValues, onSubmit, title, newCouncil }) => {
  const { clickCard, councilId } = useContext(ChurchContext)
  const { togglePopup, isOpen } = usePopup()
  const { theme } = useContext(MemberContext)

  const navigate = useNavigate()
  const { data, loading, error } = useQuery(GET_STREAMS)
  const [buttonLoading, setButtonLoading] = useState(false)
  const [CloseDownCouncil] = useMutation(MAKE_COUNCIL_INACTIVE)

  const streamOptions = makeSelectOptions(data?.streams)

  const validationSchema = Yup.object({
    name: Yup.string().required(`Council Name is a required field`),
    leaderId: Yup.string().required(
      'Please choose a leader from the drop down'
    ),
    constituencies: newCouncil
      ? null
      : Yup.array().of(
          Yup.object().required('Please pick a constituency from the dropdown')
        ),
  })

  return (
    <ApolloWrapper loading={loading} error={error} data={data}>
      <Container>
        <HeadingPrimary>{title}</HeadingPrimary>
        <HeadingSecondary>{initialValues.name + ' Council'}</HeadingSecondary>
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
                    <RoleView roles={permitAdmin('GatheringService')}>
                      <Row className="form-row">
                        <Col>
                          <Select
                            name="stream"
                            label="Select a Stream"
                            options={streamOptions}
                            defaultOption="Select a Stream"
                          />
                        </Col>
                      </Row>
                    </RoleView>

                    <Input
                      name="name"
                      label={`Name of Council`}
                      placeholder={`Name of Council`}
                    />

                    <Row className="d-flex align-items-center mb-3">
                      <RoleView roles={permitAdmin('Stream')}>
                        <Col>
                          <Input
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
                    {!newCouncil && (
                      <>
                        <small className="pt-2">
                          {`Select any constituencies that are being moved to this Council`}
                        </small>
                        <FieldArray name="constituencies">
                          {(fieldArrayProps) => {
                            const { push, remove, form } = fieldArrayProps
                            const { values } = form
                            const { constituencies } = values

                            return (
                              <>
                                {constituencies.map((constituency, index) => (
                                  <Row key={index} className="form-row">
                                    <Col>
                                      <SearchConstituency
                                        name={`constituencies[${index}]`}
                                        placeholder="Constituency Name"
                                        initialValue={constituency?.name}
                                        setFieldValue={formik.setFieldValue}
                                        aria-describedby="Constituency Name"
                                        error={arrayError(
                                          formik.errors.constituencies,
                                          index
                                        )}
                                      />
                                    </Col>
                                    <Col className="col-auto d-flex">
                                      <PlusSign onClick={() => push()} />
                                      {(index > 0 ||
                                        constituencies?.length !== 1) && (
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
                    CloseDownCouncil({
                      variables: {
                        id: councilId,
                        leaderId: initialValues.leaderId,
                      },
                    })
                      .then((res) => {
                        setButtonLoading(false)
                        clickCard(res.data.CloseDownCouncil)
                        togglePopup()
                        navigate(`/council/displayall`)
                      })
                      .catch((error) => {
                        setButtonLoading(false)
                        throwErrorMsg(
                          `There was an error closing down this council`,
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

            {!newCouncil && (
              <Button
                variant="primary"
                size="lg"
                disabled={formik.isSubmitting}
                className={`btn-secondary ${theme} mt-3`}
                onClick={togglePopup}
              >
                {`Close Down Council`}
              </Button>
            )}
          </Container>
        )}
      </Formik>
    </ApolloWrapper>
  )
}

export default CouncilForm
