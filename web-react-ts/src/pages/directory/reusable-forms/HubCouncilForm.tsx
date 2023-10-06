import { useMutation, useQuery } from '@apollo/client'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { Form, Formik, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import { makeSelectOptions, throwToSentry } from 'global-utils'
import React, { useContext, useState } from 'react'
import { ChurchContext } from 'contexts/ChurchContext'
import { MAKE_HUBCOUNCIL_INACTIVE } from 'pages/directory/update/CloseChurchMutations'
import { useNavigate } from 'react-router'
import Popup from 'components/Popup/Popup'
import { Button, Container, Row, Col } from 'react-bootstrap'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import SubmitButton from 'components/formik/SubmitButton'
import usePopup from 'hooks/usePopup'
import Select from 'components/formik/Select'
import SearchMember from 'components/formik/SearchMember'
import { FormikInitialValues } from 'components/formik/formik-types'
import { GET_MINISTRY_COUNCILS } from './SontaListQueries'

export interface HubCouncilFormValues extends FormikInitialValues {
  ministry: string
  council: string
  leaderId: string
  leaderName: string
}

type HubCouncilFormProps = {
  initialValues: HubCouncilFormValues
  onSubmit: (
    values: HubCouncilFormValues,
    onSubmitProps: FormikHelpers<HubCouncilFormValues>
  ) => void
  title: string
  newHubCouncil: boolean
}

const HubCouncilForm = ({
  initialValues,
  onSubmit,
  title,
  newHubCouncil,
}: HubCouncilFormProps) => {
  const { clickCard, hubcouncilId, ministryId } = useContext(ChurchContext)
  const { togglePopup, isOpen } = usePopup()
  const navigate = useNavigate()

  const { data, loading, error } = useQuery(GET_MINISTRY_COUNCILS, {
    variables: {
      ministryId,
    },
  })
  const [buttonLoading, setButtonLoading] = useState(false)
  const [CloseDownHubCouncil] = useMutation(MAKE_HUBCOUNCIL_INACTIVE)

  const ministry = data?.ministries[0]
  const councilsOptions = makeSelectOptions(data?.ministries[0].councils)

  const validationSchema = Yup.object({
    council: Yup.string().required(`Council is a required field`),
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
                      {ministry?.name}
                      <Select
                        name="council"
                        label="Select a Council"
                        options={councilsOptions}
                        defaultOption="Select a Council"
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
                  Are you sure you want to close down this hubcouncil?
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={buttonLoading}
                    className={`btn-main `}
                    onClick={() => {
                      setButtonLoading(true)
                      CloseDownHubCouncil({
                        variables: {
                          id: hubcouncilId,
                          leaderId: initialValues.leaderId,
                        },
                      })
                        .then((res) => {
                          setButtonLoading(false)
                          clickCard(res.data.CloseDownHubCouncil)
                          togglePopup()
                          navigate(`/hubcouncil/displayall`)
                        })
                        .catch((error) => {
                          throwToSentry(
                            `There was an error closing down this HubCouncil`,
                            error
                          )
                        })
                    }}
                  >
                    {buttonLoading ? `Submitting...` : `Yes, I'm sure`}
                  </Button>
                  <Button
                    variant="primary"
                    className={`btn-secondary mt-2 `}
                    onClick={togglePopup}
                  >
                    No, take me back
                  </Button>
                </Popup>
              )}

              {!newHubCouncil && (
                <Button
                  variant="primary"
                  size="lg"
                  disabled={formik.isSubmitting}
                  className={`btn-secondary mt-3`}
                  onClick={togglePopup}
                >
                  {`Close Down HubCouncil`}
                </Button>
              )}
            </Container>
          )}
        </Formik>
      </>
    </ApolloWrapper>
  )
}

export default HubCouncilForm
