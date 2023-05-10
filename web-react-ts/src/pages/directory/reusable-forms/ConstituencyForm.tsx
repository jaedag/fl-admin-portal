import { useMutation, useQuery } from '@apollo/client'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { FieldArray, Form, Formik, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import { makeSelectOptions, throwToSentry } from 'global-utils'
import { GET_COUNCILS } from 'queries/ListQueries'
import React, { useContext, useState } from 'react'
import { ChurchContext } from 'contexts/ChurchContext'
import PlusSign from 'components/buttons/PlusMinusSign/PlusSign'
import MinusSign from 'components/buttons/PlusMinusSign/MinusSign'
import { MAKE_CONSTITUENCY_INACTIVE } from 'pages/directory/update/CloseChurchMutations'
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
import SearchBacenta from 'components/formik/SearchBacenta'
import { FormikInitialValues } from 'components/formik/formik-types'
import { Bacenta } from 'global-types'

export interface ConstituencyFormValues extends FormikInitialValues {
  council: string
  bacentas?: Bacenta[]
}

type ConstituencyFormProps = {
  initialValues: ConstituencyFormValues
  onSubmit: (
    values: ConstituencyFormValues,
    onSubmitProps: FormikHelpers<ConstituencyFormValues>
  ) => void
  title: string
  newConstituency: boolean
}

const ConstituencyForm = ({
  initialValues,
  onSubmit,
  title,
  newConstituency,
}: ConstituencyFormProps) => {
  const { clickCard, constituencyId } = useContext(ChurchContext)
  const { togglePopup, isOpen } = usePopup()
  const { theme } = useContext(MemberContext)

  const navigate = useNavigate()
  const {
    data: councilData,
    loading: councilLoading,
    error: councilError,
  } = useQuery(GET_COUNCILS)

  const [buttonLoading, setButtonLoading] = useState(false)
  const [CloseDownConstituency] = useMutation(MAKE_CONSTITUENCY_INACTIVE)

  const constituencyCouncilOptions = makeSelectOptions(councilData?.councils)

  const validationSchema = Yup.object({
    name: Yup.string().required(`Constituency Name is a required field`),
    leaderId: Yup.string().required(
      'Please choose a leader from the drop down'
    ),
    bacentas: newConstituency
      ? Yup.array().nullable()
      : Yup.array().of(
          Yup.object().required('Please pick a bacenta from the dropdown')
        ),
  })

  return (
    <ApolloWrapper
      loading={councilLoading}
      error={councilError}
      data={councilData}
    >
      <>
        <Container>
          <HeadingPrimary>{title}</HeadingPrimary>
          <HeadingSecondary>
            {initialValues.name + ' Constituency'}
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
                      <RoleView roles={permitAdmin('Stream')}>
                        <Row className="form-row">
                          <Col>
                            <Select
                              name="council"
                              label="Select a Council"
                              options={constituencyCouncilOptions}
                              defaultOption="Select a Council"
                            />
                          </Col>
                        </Row>
                      </RoleView>

                      <Input
                        name="name"
                        label={`Name of Constituency`}
                        placeholder={`Name of Constituency`}
                      />

                      <Row className="d-flex align-items-center mb-3">
                        <RoleView roles={permitAdmin('Council')}>
                          <Col>
                            <SearchMember
                              name="leaderId"
                              label="Choose a CO"
                              placeholder="Start typing..."
                              initialValue={initialValues?.leaderName}
                              setFieldValue={formik.setFieldValue}
                              aria-describedby="Member Search Box"
                              error={formik.errors.leaderId}
                            />
                          </Col>
                        </RoleView>
                      </Row>

                      {!newConstituency && (
                        <>
                          <small className="pt-2">
                            {`Select any bacentas that are being moved to this Constituency`}
                          </small>
                          <FieldArray name="bacentas">
                            {(fieldArrayProps) => {
                              const { push, remove, form } = fieldArrayProps
                              const { values } = form
                              const { bacentas } = values

                              return (
                                <>
                                  {bacentas.map(
                                    (bacenta: Bacenta, index: number) => (
                                      <Row key={index} className="form-row">
                                        <Col>
                                          <SearchBacenta
                                            name={`bacentas[${index}]`}
                                            placeholder="Bacenta Name"
                                            initialValue={bacenta?.name}
                                            setFieldValue={formik.setFieldValue}
                                            aria-describedby="Bacenta Name"
                                            error={
                                              formik.errors.bacentas?.length
                                                ? formik.errors.bacentas[index]
                                                : ''
                                            }
                                          />
                                        </Col>
                                        <Col className="col-auto d-flex">
                                          <PlusSign onClick={() => push('')} />
                                          {(index > 0 ||
                                            bacentas?.length !== 1) && (
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
                  Are you sure you want to close down this constituency?
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={buttonLoading}
                    className={`btn-main ${theme}`}
                    onClick={() => {
                      setButtonLoading(true)

                      CloseDownConstituency({
                        variables: {
                          id: constituencyId,
                          leaderId: initialValues.leaderId,
                          adminId: initialValues.adminId,
                        },
                      })
                        .then((res) => {
                          setButtonLoading(false)
                          clickCard(res.data.CloseDownConstituency)
                          togglePopup()
                          navigate(`/constituency/displayall`)
                        })
                        .catch((error) => {
                          setButtonLoading(false)
                          throwToSentry('', error)
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

              {!newConstituency && (
                <Button
                  variant="primary"
                  size="lg"
                  disabled={formik.isSubmitting}
                  className={`btn-secondary ${theme} mt-3`}
                  onClick={togglePopup}
                >
                  {`Close Down Constituency`}
                </Button>
              )}
            </Container>
          )}
        </Formik>
      </>
    </ApolloWrapper>
  )
}

export default ConstituencyForm
