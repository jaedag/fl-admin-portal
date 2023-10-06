import { useMutation } from '@apollo/client'
import { Form, Formik, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import { throwToSentry } from 'global-utils'
import { useContext, useState } from 'react'
import { ChurchContext } from 'contexts/ChurchContext'
import { MAKE_HUB_INACTIVE } from 'pages/directory/update/CloseChurchMutations'
import { useNavigate } from 'react-router'
import {
  Button,
  Container,
  Row,
  Col,
  ButtonGroup,
  Modal,
} from 'react-bootstrap'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import SubmitButton from 'components/formik/SubmitButton'
import SearchMember from 'components/formik/SearchMember'
import Input from 'components/formik/Input'
import { FormikInitialValues } from 'components/formik/formik-types'
import { HubFellowship } from 'global-types'
import { DISPLAY_HUB } from '../display/ReadQueries'
import HeadingSecondary from 'components/HeadingSecondary'
import { MOVE_HUBFELLOWSHIP_TO_HUB } from '../update/UpdateMutations'
import NoDataComponent from 'pages/arrivals/CompNoData'
import SearchHubFellowship from 'components/formik/SearchHubFellowship'

export interface HubFormValues extends FormikInitialValues {
  name: string
  hubCouncil?: string
  vacationStatus: 'Active' | 'Vacation'
  hubFellowship?: HubFellowship
  hubFellowships?: HubFellowship[]
}

type HubFormProps = {
  initialValues: HubFormValues
  onSubmit: (
    values: HubFormValues,
    onSubmitProps: FormikHelpers<HubFormValues>
  ) => void
  title: string
  newHub: boolean
}

const HubForm = ({ initialValues, onSubmit, title, newHub }: HubFormProps) => {
  const { clickCard, hubId } = useContext(ChurchContext)
  const [hubFellowshipModal, setHubFellowshipModal] = useState(false)
  const [closeDown, setCloseDown] = useState(false)
  const navigate = useNavigate()

  const [buttonLoading, setButtonLoading] = useState(false)
  const [CloseDownHub] = useMutation(MAKE_HUB_INACTIVE, {
    refetchQueries: [
      {
        query: DISPLAY_HUB,
        variables: { id: hubId },
      },
    ],
  })
  const [MoveHubFellowshipToHub] = useMutation(MOVE_HUBFELLOWSHIP_TO_HUB, {
    refetchQueries: [
      {
        query: DISPLAY_HUB,
        variables: { id: hubId },
      },
    ],
  })

  const validationSchema = Yup.object({
    name: Yup.string().required(`Hub Name is a required field`),
    leaderId: Yup.string().required(
      'Please choose a leader from the drop down'
    ),
  })

  return (
    <>
      <Container>
        <HeadingPrimary>{title}</HeadingPrimary>
        <HeadingSecondary>
          {initialValues.name + ' Creative Arts'}
        </HeadingSecondary>
        <ButtonGroup className="mt-3">
          {!newHub && (
            <>
              <Button onClick={() => setHubFellowshipModal(true)}>
                Add Hub
              </Button>
              <Button variant="success" onClick={() => setCloseDown(true)}>
                {`Close Down Hub`}
              </Button>
            </>
          )}
        </ButtonGroup>

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
                      <Input
                        name="name"
                        label={`Name of Creative Arts`}
                        placeholder={`Name of Creative Arts`}
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
                      <div className="d-grid gap-2">
                        {initialValues.hubFellowships?.length === 0 ? (
                          <NoDataComponent text="No Hub Fellowships" />
                        ) : (
                          <p className="fw-bold fs-5">Hub Councils</p>
                        )}

                        {initialValues.hubFellowships?.map((hubFellowship) => (
                          <Button
                            key={hubFellowship.id}
                            variant="secondary"
                            className="text-start"
                          >
                            {hubFellowship.name} Hub Fellowship
                          </Button>
                        ))}
                      </div>
                    </Col>
                  </Row>
                </div>

                <div className="text-center mt-5">
                  <SubmitButton formik={formik} />
                </div>
              </Form>

              <Modal
                show={hubFellowshipModal}
                onHide={() => setHubFellowshipModal(false)}
                centered
              >
                <Modal.Header closeButton>Add A Hub</Modal.Header>
                <Modal.Body>
                  <p>Choose a hubFellowship to move to this hub</p>
                  <SearchHubFellowship
                    name={`hubFellowship`}
                    placeholder="Hub Fellowship Name"
                    initialValue=""
                    setFieldValue={formik.setFieldValue}
                    aria-describedby="Hub Fellowship Name"
                  />
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="success"
                    type="submit"
                    disabled={buttonLoading || !formik.values.hubFellowship}
                    onClick={async () => {
                      try {
                        setButtonLoading(true)
                        const res = await MoveHubFellowshipToHub({
                          variables: {
                            hubFellowshipId: formik.values.hubFellowship?.id,
                            historyRecord: `${formik.values.hubFellowship?.name} Hub has been moved to ${formik.values.name} Hub from ${formik.values.hubFellowship?.hub.name} Hub`,
                            newHubId: hubId,
                            oldHubId: formik.values.hubFellowship?.hub.id,
                          },
                        })

                        clickCard(res.data.MoveHubFellowshipToHub)
                        setHubFellowshipModal(false)
                      } catch (error) {
                        throwToSentry(
                          `There was an error moving this hubFellowship to this hub`,
                          error
                        )
                      } finally {
                        setButtonLoading(false)
                      }
                    }}
                  >
                    {buttonLoading ? `Submitting...` : `Yes, I'm sure`}
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => setHubFellowshipModal(false)}
                  >
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>

              <Modal
                show={closeDown}
                onHide={() => setCloseDown(false)}
                centered
              >
                <Modal.Header closeButton>Close Down Hub</Modal.Header>
                <Modal.Body>
                  <p className="text-info">
                    Are you sure you want to close down this hub?
                  </p>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="success"
                    type="submit"
                    disabled={buttonLoading}
                    onClick={async () => {
                      try {
                        setButtonLoading(true)
                        const res = await CloseDownHub({
                          variables: {
                            id: hubId,
                            leaderId: initialValues.leaderId,
                          },
                        })

                        setButtonLoading(false)
                        clickCard(res.data.CloseDownHub)
                        setCloseDown(false)
                        navigate(`/stream/displayall`)
                      } catch (error) {
                        setButtonLoading(false)
                        throwToSentry(
                          `There was an error closing down this hub`,
                          error
                        )
                      }
                    }}
                  >
                    {buttonLoading ? `Submitting...` : `Yes, I'm sure`}
                  </Button>
                  <Button variant="primary" onClick={() => setCloseDown(false)}>
                    No, take me back
                  </Button>
                </Modal.Footer>
              </Modal>
            </Container>
          )}
        </Formik>
      </Container>
    </>
  )
}

export default HubForm
