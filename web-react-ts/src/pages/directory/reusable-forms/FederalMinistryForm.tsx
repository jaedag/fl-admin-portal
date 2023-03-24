import { useMutation, useQuery } from '@apollo/client'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { Form, Formik, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import { makeSelectOptions, throwToSentry } from 'global-utils'
import { GET_GATHERINGSERVICES } from 'queries/ListQueries'
import React, { useContext, useState } from 'react'
import { ChurchContext } from 'contexts/ChurchContext'
import { MAKE_FEDERAL_MINISTRY_INACTIVE } from 'pages/directory/update/CloseChurchMutations'
import { useNavigate } from 'react-router'
import Popup from 'components/Popup/Popup'
import { Button, Container, Row, Col } from 'react-bootstrap'
import { MemberContext } from 'contexts/MemberContext'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import SubmitButton from 'components/formik/SubmitButton'
import usePopup from 'hooks/usePopup'
import Select from 'components/formik/Select'
import SearchMember from 'components/formik/SearchMember'
import Input from 'components/formik/Input'
import { FormikInitialValues } from 'components/formik/formik-types'

export interface FederalMinistryFormValues extends FormikInitialValues {
  name: string
  gatheringService: string
}

type FederalMinistryFormProps = {
  initialValues: FederalMinistryFormValues
  onSubmit: (
    values: FederalMinistryFormValues,
    onSubmitProps: FormikHelpers<FederalMinistryFormValues>
  ) => void
  title: string
  newFederalMinistry: boolean
}

const FederalMinistryForm = ({
  initialValues,
  onSubmit,
  title,
  newFederalMinistry,
}: FederalMinistryFormProps) => {
  const { clickCard, federalMinstryId } = useContext(ChurchContext)
  const { theme } = useContext(MemberContext)
  const { togglePopup, isOpen } = usePopup()
  const navigate = useNavigate()

  const { data, loading, error } = useQuery(GET_GATHERINGSERVICES)
  const [buttonLoading, setButtonLoading] = useState(false)
  const [CloseDownFederalMinistry] = useMutation(MAKE_FEDERAL_MINISTRY_INACTIVE)

  const gatheringServiceOptions = makeSelectOptions(data?.gatheringServices)

  const validationSchema = Yup.object({
    gatheringService: Yup.string().required(
      `Gathering Service is a required field`
    ),
    name: Yup.string().required(`Federal Ministry Name is a required field`),
    leaderId: Yup.string().required(
      'Please choose a leader from the drop down'
    ),
  })

  return (
    <ApolloWrapper loading={loading} error={error} data={data && initialValues}>
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
                        name="gatheringService"
                        label="Select a Gathering Service"
                        options={gatheringServiceOptions}
                        defaultOption="Select a Gathering Service"
                      />

                      <Input
                        name="name"
                        label={`Name of Federal Ministry`}
                        placeholder={`Name of Federal Ministry`}
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
                  Are you sure you want to close down this Federal Ministry?
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={buttonLoading}
                    className={`btn-main ${theme}`}
                    onClick={() => {
                      setButtonLoading(true)
                      CloseDownFederalMinistry({
                        variables: {
                          id: federalMinstryId,
                          leaderId: initialValues.leaderId,
                        },
                      })
                        .then((res) => {
                          setButtonLoading(false)
                          clickCard(res.data.CloseDownFederalMinistry)
                          togglePopup()
                          navigate(`/federalministry/displayall`)
                        })
                        .catch((error) => {
                          throwToSentry(
                            `There was an error closing down this Federal Ministry`,
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

              {!newFederalMinistry && (
                <Button
                  variant="primary"
                  size="lg"
                  disabled={formik.isSubmitting}
                  className={`btn-secondary ${theme} mt-3`}
                  onClick={togglePopup}
                >
                  {`Close Down Federal Ministry`}
                </Button>
              )}
            </Container>
          )}
        </Formik>
      </>
    </ApolloWrapper>
  )
}

export default FederalMinistryForm
