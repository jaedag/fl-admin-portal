import { useMutation } from '@apollo/client'
import { Form, Formik, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import { throwToSentry } from 'global-utils'
import { useContext, useState } from 'react'
import { ChurchContext } from 'contexts/ChurchContext'
import { MAKE_HUBCOUNCIL_INACTIVE } from 'pages/directory/update/CloseChurchMutations'
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
import { Hub } from 'global-types'
import { DISPLAY_HUBCOUNCIL } from '../display/ReadQueries'
import HeadingSecondary from 'components/HeadingSecondary'
import SearchHub from 'components/formik/SearchHub'
import { MOVE_HUB_TO_HUBCOUNCIL } from '../update/UpdateMutations'
import NoDataComponent from 'pages/arrivals/CompNoData'

export interface HubCouncilFormValues extends FormikInitialValues {
  name: string
  hubCouncil?: string
  hub?: Hub
  hubs?: Hub[]
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
  const { clickCard, hubCouncilId } = useContext(ChurchContext)
  const [hubModal, setHubModal] = useState(false)
  const [closeDown, setCloseDown] = useState(false)
  const navigate = useNavigate()

  const [buttonLoading, setButtonLoading] = useState(false)
  const [CloseDownHubCouncil] = useMutation(MAKE_HUBCOUNCIL_INACTIVE, {
    refetchQueries: [
      {
        query: DISPLAY_HUBCOUNCIL,
        variables: { id: hubCouncilId },
      },
    ],
  })
  const [MoveHubToHubCouncil] = useMutation(MOVE_HUB_TO_HUBCOUNCIL, {
    refetchQueries: [
      {
        query: DISPLAY_HUBCOUNCIL,
        variables: { id: hubCouncilId },
      },
    ],
  })

  const validationSchema = Yup.object({
    name: Yup.string().required(`Hub Council Name is a required field`),
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
          {!newHubCouncil && (
            <>
              <Button onClick={() => setHubModal(true)}>Add Hub</Button>
              <Button variant="success" onClick={() => setCloseDown(true)}>
                {`Close Down Hub Council`}
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
                        {initialValues.hubs?.length === 0 ? (
                          <NoDataComponent text="No Hub Councils" />
                        ) : (
                          <p className="fw-bold fs-5">Hub Councils</p>
                        )}

                        {initialValues.hubs?.map((hub, index) => (
                          <Button variant="secondary" className="text-start">
                            {hub.name} Hub
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

              <Modal show={hubModal} onHide={() => setHubModal(false)} centered>
                <Modal.Header closeButton>Add A Hub</Modal.Header>
                <Modal.Body>
                  <p>Choose a hub to move to this hubCouncil</p>
                  <SearchHub
                    name={`hub`}
                    placeholder="Hub Name"
                    initialValue=""
                    setFieldValue={formik.setFieldValue}
                    aria-describedby="Hub Name"
                  />
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="success"
                    type="submit"
                    disabled={buttonLoading || !formik.values.hub}
                    onClick={async () => {
                      try {
                        setButtonLoading(true)
                        const res = await MoveHubToHubCouncil({
                          variables: {
                            hubId: formik.values.hub?.id,
                            historyRecord: `${formik.values.hub?.name} Hub has been moved to ${formik.values.name} HubCouncil from ${formik.values.hub?.hubCouncil.name} HubCouncil`,
                            newHubCouncilId: hubCouncilId,
                            oldHubCouncilId: formik.values.hub?.hubCouncil.id,
                          },
                        })

                        clickCard(res.data.MoveHubToHubCouncil)
                        setHubModal(false)
                      } catch (error) {
                        throwToSentry(
                          `There was an error moving this hub to this hubCouncil`,
                          error
                        )
                      } finally {
                        setButtonLoading(false)
                      }
                    }}
                  >
                    {buttonLoading ? `Submitting...` : `Yes, I'm sure`}
                  </Button>
                  <Button variant="primary" onClick={() => setHubModal(false)}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>

              <Modal
                show={closeDown}
                onHide={() => setCloseDown(false)}
                centered
              >
                <Modal.Header closeButton>Close Down HubCouncil</Modal.Header>
                <Modal.Body>
                  <p className="text-info">
                    Are you sure you want to close down this hubCouncil?
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
                        const res = await CloseDownHubCouncil({
                          variables: {
                            id: hubCouncilId,
                            leaderId: initialValues.leaderId,
                          },
                        })

                        setButtonLoading(false)
                        clickCard(res.data.CloseDownHubCouncil)
                        setCloseDown(false)
                        navigate(`/stream/displayall`)
                      } catch (error) {
                        setButtonLoading(false)
                        throwToSentry(
                          `There was an error closing down this hubCouncil`,
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

export default HubCouncilForm
