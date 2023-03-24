import { useMutation, useQuery } from '@apollo/client'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { Form, Formik, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import { makeSelectOptions, throwToSentry } from 'global-utils'
import { GET_HUBS, GET_MINISTRIES } from 'queries/ListQueries'
import React, { useContext, useState } from 'react'
import { ChurchContext } from 'contexts/ChurchContext'
import { MAKE_SONTA_INACTIVE } from 'pages/directory/update/CloseChurchMutations'
import { useNavigate } from 'react-router'
import Popup from 'components/Popup/Popup'
import { Button, Container, Row, Col } from 'react-bootstrap'
import { MemberContext } from 'contexts/MemberContext'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import SubmitButton from 'components/formik/SubmitButton'
import usePopup from 'hooks/usePopup'
import Select from 'components/formik/Select'
import SearchMember from 'components/formik/SearchMember'
import { FormikInitialValues } from 'components/formik/formik-types'

export interface SontaFormValues extends FormikInitialValues {
  hub: string
  ministry: string
}

type SontaFormProps = {
  initialValues: SontaFormValues
  onSubmit: (
    values: SontaFormValues,
    onSubmitProps: FormikHelpers<SontaFormValues>
  ) => void
  title: string
  newSonta: boolean
}

const SontaForm = ({
  initialValues,
  onSubmit,
  title,
  newSonta,
}: SontaFormProps) => {
  const { clickCard, sontaId } = useContext(ChurchContext)
  const { theme } = useContext(MemberContext)
  const { togglePopup, isOpen } = usePopup()
  const navigate = useNavigate()
  const {
    data: hubData,
    loading: hubLoading,
    error: hubError,
  } = useQuery(GET_HUBS)
  const {
    data: ministryData,
    loading: ministryLoading,
    error: ministryError,
  } = useQuery(GET_MINISTRIES)
  const [buttonLoading, setButtonLoading] = useState(false)
  const [CloseDownSonta] = useMutation(MAKE_SONTA_INACTIVE)

  const hubsOptions = makeSelectOptions(hubData?.hubs)
  const ministriesOptions = makeSelectOptions(ministryData?.ministries)

  const validationSchema = Yup.object({
    ministry: Yup.string().required(`Ministry is a required field`),
    hub: Yup.string().required(`Hub is a required field`),
    leaderId: Yup.string().required(
      'Please choose a leader from the drop down'
    ),
  })

  return (
    <ApolloWrapper
      loading={hubLoading && ministryLoading}
      error={hubError && ministryError}
      data={hubData && ministryData && initialValues}
    >
      <>
        <Container>
          <HeadingPrimary>{title}</HeadingPrimary>
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
                      <Select
                        name="ministry"
                        label="Select a Ministry"
                        options={ministriesOptions}
                        defaultOption="Select a Ministry"
                      />

                      <Select
                        name="hub"
                        label="Select a Hub"
                        options={hubsOptions}
                        defaultOption="Select a Hub"
                      />

                      <Row className="d-flex align-items-center mb-3">
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
                      </Row>
                    </Col>
                  </Row>
                </div>

                <SubmitButton formik={formik} />
              </Form>

              {isOpen && (
                <Popup handleClose={togglePopup}>
                  Are you sure you want to close down this sonta?
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={buttonLoading}
                    className={`btn-main ${theme}`}
                    onClick={() => {
                      setButtonLoading(true)
                      CloseDownSonta({
                        variables: {
                          id: sontaId,
                          leaderId: initialValues.leaderId,
                        },
                      })
                        .then((res) => {
                          setButtonLoading(false)
                          clickCard(res.data.CloseDownSonta)
                          togglePopup()
                          navigate(`/sonta/displayall`)
                        })
                        .catch((error) => {
                          throwToSentry(
                            `There was an error closing down this Sonta`,
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

              {!newSonta && (
                <Button
                  variant="primary"
                  size="lg"
                  disabled={formik.isSubmitting}
                  className={`btn-secondary ${theme} mt-3`}
                  onClick={togglePopup}
                >
                  {`Close Down Sonta`}
                </Button>
              )}
            </Container>
          )}
        </Formik>
      </>
    </ApolloWrapper>
  )
}

export default SontaForm
