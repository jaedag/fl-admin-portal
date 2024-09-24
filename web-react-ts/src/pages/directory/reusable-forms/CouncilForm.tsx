import { useMutation } from '@apollo/client'
import { Form, Formik, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import { throwToSentry } from 'global-utils'
import { useContext, useState } from 'react'
import { ChurchContext } from 'contexts/ChurchContext'
import { MAKE_COUNCIL_INACTIVE } from 'pages/directory/update/CloseChurchMutations'
import { useNavigate } from 'react-router'
import RoleView from 'auth/RoleView'
import {
  Button,
  Container,
  Row,
  Col,
  ButtonGroup,
  Modal,
} from 'react-bootstrap'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import SubmitButton from 'components/formik/SubmitButton'
import { permitAdmin } from 'permission-utils'
import Input from 'components/formik/Input'
import SearchMember from 'components/formik/SearchMember'
import SearchTeam from 'components/formik/SearchTeam'
import { FormikInitialValues } from 'components/formik/formik-types'
import { Team, HubCouncil } from 'global-types'
import {
  MOVE_TEAM_TO_COUNCIL,
  MOVE_HUBCOUNCIL_TO_COUNCIL,
} from '../update/UpdateMutations'
import NoDataComponent from 'pages/arrivals/CompNoData'
import { DISPLAY_COUNCIL, DISPLAY_STREAM } from '../display/ReadQueries'
import { Stream } from '@jaedag/admin-portal-types'
import BtnSubmitText from 'components/formik/BtnSubmitText'
import SearchHubCouncil from 'components/formik/SearchHubCouncil'

export interface CouncilFormValues extends FormikInitialValues {
  stream?: Stream
  teams?: Team[]
  team?: Team
  hubCouncil?: HubCouncil
  hubCouncils?: HubCouncil[]
}

type CouncilFormProps = {
  initialValues: CouncilFormValues
  onSubmit: (
    values: CouncilFormValues,
    onSubmitProps: FormikHelpers<CouncilFormValues>
  ) => void
  title: string
  newCouncil: boolean
}

const CouncilForm = ({
  initialValues,
  onSubmit,
  title,
  newCouncil,
}: CouncilFormProps) => {
  const { clickCard, councilId } = useContext(ChurchContext)
  const [teamModal, setTeamModal] = useState(false)
  const [hubCouncilModal, setHubCouncilModal] = useState(false)
  const [closeDown, setCloseDown] = useState(false)

  const navigate = useNavigate()
  const [buttonLoading, setButtonLoading] = useState(false)
  const [CloseDownCouncil] = useMutation(MAKE_COUNCIL_INACTIVE, {
    refetchQueries: [
      { query: DISPLAY_STREAM, variables: { id: initialValues?.stream?.id } },
    ],
  })
  const [MoveTeamToCouncil] = useMutation(MOVE_TEAM_TO_COUNCIL, {
    refetchQueries: [{ query: DISPLAY_COUNCIL, variables: { id: councilId } }],
  })
  const [MoveHubCouncilToCouncil] = useMutation(MOVE_HUBCOUNCIL_TO_COUNCIL, {
    refetchQueries: [{ query: DISPLAY_COUNCIL, variables: { id: councilId } }],
  })

  const validationSchema = Yup.object({
    name: Yup.string().required(`Council Name is a required field`),
    leaderId: Yup.string().required(
      'Please choose a leader from the drop down'
    ),
  })

  return (
    <Container>
      <HeadingPrimary>{title}</HeadingPrimary>
      <HeadingSecondary>{initialValues.name + ' Council'}</HeadingSecondary>
      <ButtonGroup className="mt-3">
        {!newCouncil && (
          <>
            <Button onClick={() => setTeamModal(true)}>Add Team</Button>
            <Button variant="warning" onClick={() => setHubCouncilModal(true)}>
              Add Hub Council
            </Button>
            <Button variant="success" onClick={() => setCloseDown(true)}>
              {`Close Down Council`}
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
                      label={`Name of Council`}
                      placeholder={`Name of Council`}
                    />

                    <Row className="d-flex align-items-center mb-3">
                      <RoleView roles={permitAdmin('Stream')}>
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
                    <div className="d-grid gap-2">
                      {initialValues.teams?.length && (
                        <p className="fw-bold fs-5">Teams</p>
                      )}

                      {initialValues.teams?.map((team, index) => {
                        if (!team && !index)
                          return <NoDataComponent text="No Teams" />
                        return (
                          <Button variant="secondary" className="text-start">
                            {team.name} Team
                          </Button>
                        )
                      })}
                    </div>

                    <div className="d-grid gap-2 mt-3">
                      {!!initialValues.hubCouncils?.length && (
                        <p className="fw-bold fs-5">Hub Councils</p>
                      )}

                      {initialValues.hubCouncils?.map((hubCouncil, index) => {
                        if (!hubCouncil && !index)
                          return <NoDataComponent text="No Hub Councils" />
                        return (
                          <Button variant="secondary" className="text-start">
                            {hubCouncil.name} Hub Council
                          </Button>
                        )
                      })}
                    </div>
                  </Col>
                </Row>
              </div>

              <div className="text-center mt-5">
                <SubmitButton formik={formik} />
              </div>
            </Form>

            <Modal show={teamModal} onHide={() => setTeamModal(false)} centered>
              <Modal.Header closeButton>Add A Team</Modal.Header>
              <Modal.Body>
                <p>Choose a team to move to this council</p>
                <SearchTeam
                  name={`team`}
                  placeholder="Team Name"
                  initialValue=""
                  setFieldValue={formik.setFieldValue}
                  aria-describedby="Team Name"
                />
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="success"
                  type="submit"
                  disabled={buttonLoading || !formik.values.team}
                  onClick={async () => {
                    try {
                      setButtonLoading(true)
                      const res = await MoveTeamToCouncil({
                        variables: {
                          teamId: formik.values.team?.id,
                          historyRecord: `${formik.values.team?.name} Team has been moved to ${formik.values.name} Council from ${formik.values.team?.council.name} Council`,
                          newCouncilId: councilId,
                          oldCouncilId: formik.values.team?.council.id,
                        },
                      })

                      clickCard(res.data.MoveTeamToCouncil)
                      setTeamModal(false)
                    } catch (error) {
                      throwToSentry(
                        `There was an error moving this team to this council`,
                        error
                      )
                    } finally {
                      setButtonLoading(false)
                    }
                  }}
                >
                  <BtnSubmitText loading={buttonLoading} />
                </Button>
                <Button variant="primary" onClick={() => setTeamModal(false)}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>

            <Modal
              show={hubCouncilModal}
              onHide={() => setHubCouncilModal(false)}
              centered
            >
              <Modal.Header closeButton>Add A Hub Council</Modal.Header>
              <Modal.Body>
                <p>Choose a hub council to move to this council</p>
                <SearchHubCouncil
                  name={`hubCouncil`}
                  placeholder="Hub Council Name"
                  initialValue=""
                  setFieldValue={formik.setFieldValue}
                  aria-describedby="Hub Council Name"
                />
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="success"
                  type="submit"
                  disabled={buttonLoading || !formik.values.hubCouncil}
                  onClick={async () => {
                    try {
                      setButtonLoading(true)
                      const res = await MoveHubCouncilToCouncil({
                        variables: {
                          hubCouncilId: formik.values.hubCouncil?.id,
                          historyRecord: `${formik.values.hubCouncil?.name} Hub Council has been moved to ${formik.values.name} Council from ${formik.values.hubCouncil?.council.name} Council`,
                          newCouncilId: councilId,
                          oldCouncilId: formik.values.hubCouncil?.council.id,
                        },
                      })

                      clickCard(res.data.MoveHubCouncilToCouncil)
                      setHubCouncilModal(false)
                    } catch (error) {
                      throwToSentry(
                        `There was an error moving this hub council to this council`,
                        error
                      )
                    } finally {
                      setButtonLoading(false)
                    }
                  }}
                >
                  <BtnSubmitText loading={buttonLoading} />
                </Button>
                <Button
                  variant="primary"
                  onClick={() => setHubCouncilModal(false)}
                >
                  Close
                </Button>
              </Modal.Footer>
            </Modal>

            <Modal show={closeDown} onHide={() => setCloseDown(false)} centered>
              <Modal.Header closeButton>Close Down Council</Modal.Header>
              <Modal.Body>
                <p className="text-info">
                  Are you sure you want to close down this council?
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
                      const res = await CloseDownCouncil({
                        variables: {
                          id: councilId,
                          leaderId: initialValues.leaderId,
                          adminId: initialValues?.adminId,
                        },
                      })

                      setButtonLoading(false)
                      clickCard(res.data.CloseDownCouncil)
                      setCloseDown(false)
                      navigate(`/council/displayall`)
                    } catch (error) {
                      setButtonLoading(false)
                      throwToSentry(
                        `There was an error closing down this council`,
                        error
                      )
                    }
                  }}
                >
                  <BtnSubmitText loading={buttonLoading} />
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
  )
}

export default CouncilForm
