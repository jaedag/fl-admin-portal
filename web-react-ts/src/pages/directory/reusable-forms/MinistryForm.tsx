import { useMutation, useQuery } from '@apollo/client'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { Form, Formik, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import { makeSelectOptions, throwToSentry } from 'global-utils'
import { GET_CREATIVEARTS, GET_STREAMS } from 'queries/ListQueries'
import React, { useContext, useState } from 'react'
import { ChurchContext } from 'contexts/ChurchContext'
import { MAKE_MINISTRY_INACTIVE } from 'pages/directory/update/CloseChurchMutations'
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

export interface MinistryFormValues extends FormikInitialValues {
  creativeArts: string
  leaderId: string
  leaderName: string
  stream: string
}

type MinistryFormProps = {
  initialValues: MinistryFormValues
  onSubmit: (
    values: MinistryFormValues,
    onSubmitProps: FormikHelpers<MinistryFormValues>
  ) => void
  title: string
  newMinistry: boolean
}

const MinistryForm = ({
  initialValues,
  onSubmit,
  title,
  newMinistry,
}: MinistryFormProps) => {
  const { clickCard, ministryId } = useContext(ChurchContext)
  const { theme } = useContext(MemberContext)
  const { togglePopup, isOpen } = usePopup()
  const navigate = useNavigate()

  const {
    data: creativeArtsData,
    loading: creativeArtsLoading,
    error: creativeArtsError,
  } = useQuery(GET_CREATIVEARTS)
  const {
    data: streamData,
    loading: streamLoading,
    error: streamError,
  } = useQuery(GET_STREAMS)
  const [buttonLoading, setButtonLoading] = useState(false)
  const [CloseDownMinistry] = useMutation(MAKE_MINISTRY_INACTIVE)

  const creativeArtsOptions = makeSelectOptions(creativeArtsData?.creativearts)

  const streamsOptions = makeSelectOptions(streamData?.streams)

  const validationSchema = Yup.object({
    creativeArts: Yup.string().required(`Federal Ministry is a required field`),
    stream: Yup.string().required(`Stream is a required field`),
    leaderId: Yup.string().required(
      'Please choose a leader from the drop down'
    ),
  })

  return (
    <ApolloWrapper
      loading={streamLoading && creativeArtsLoading}
      error={streamError && creativeArtsError}
      data={streamData && creativeArtsData && initialValues}
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
                        name="stream"
                        label="Select a Stream"
                        options={streamsOptions}
                        defaultOption="Select a Stream"
                      />

                      <Select
                        name="creativeArts"
                        label="Select a Federal Ministry"
                        options={creativeArtsOptions}
                        defaultOption="Select a Federal Ministry"
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
                  Are you sure you want to close down this Ministry?
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={buttonLoading}
                    className={`btn-main ${theme}`}
                    onClick={() => {
                      setButtonLoading(true)
                      CloseDownMinistry({
                        variables: {
                          id: ministryId,
                          leaderId: initialValues.leaderId,
                        },
                      })
                        .then((res) => {
                          setButtonLoading(false)
                          clickCard(res.data.CloseDownMinistry)
                          togglePopup()
                          navigate(`/ministry/displayall`)
                        })
                        .catch((error) => {
                          throwToSentry(
                            `There was an error closing down this Ministry`,
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

              {!newMinistry && (
                <Button
                  variant="primary"
                  size="lg"
                  disabled={formik.isSubmitting}
                  className={`btn-secondary ${theme} mt-3`}
                  onClick={togglePopup}
                >
                  {`Close Down Ministry`}
                </Button>
              )}
            </Container>
          )}
        </Formik>
      </>
    </ApolloWrapper>
  )
}

export default MinistryForm
