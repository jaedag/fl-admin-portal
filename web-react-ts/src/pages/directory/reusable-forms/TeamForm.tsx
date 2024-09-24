import { useMutation } from '@apollo/client'
import { Form, Formik, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import { throwToSentry } from 'global-utils'
import { useContext, useState } from 'react'
import { ChurchContext } from 'contexts/ChurchContext'
import { MAKE_TEAM_INACTIVE } from 'pages/directory/update/CloseChurchMutations'
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
import SearchBacenta from 'components/formik/SearchBacenta'
import { FormikInitialValues } from 'components/formik/formik-types'
import { Bacenta, Council, Hub } from 'global-types'
import {
  MOVE_BACENTA_TO_TEAM,
  MOVE_HUB_TO_TEAM,
} from '../update/UpdateMutations'
import NoDataComponent from 'pages/arrivals/CompNoData'
import { DISPLAY_TEAM, DISPLAY_COUNCIL } from '../display/ReadQueries'
import BtnSubmitText from 'components/formik/BtnSubmitText'
import SearchHub from 'components/formik/SearchHub'

export interface TeamFormValues extends FormikInitialValues {
  council?: Council
  bacentas?: Bacenta[]
  hubs?: Hub[]
  hub?: Hub
  bacenta?: Bacenta
}

type TeamFormProps = {
  initialValues: TeamFormValues
  onSubmit: (
    values: TeamFormValues,
    onSubmitProps: FormikHelpers<TeamFormValues>
  ) => void
  title: string
  newTeam: boolean
}

const TeamForm = ({
  initialValues,
  onSubmit,
  title,
  newTeam,
}: TeamFormProps) => {
  const { clickCard, teamId } = useContext(ChurchContext)
  const [bacentaModal, setBacentaModal] = useState(false)
  const [hubModal, setHubModal] = useState(false)
  const [closeDown, setCloseDown] = useState(false)

  const navigate = useNavigate()
  const [buttonLoading, setButtonLoading] = useState(false)
  const [CloseDownTeam] = useMutation(MAKE_TEAM_INACTIVE, {
    refetchQueries: [
      { query: DISPLAY_COUNCIL, variables: { id: initialValues.council?.id } },
    ],
  })
  const [MoveBacentaToTeam] = useMutation(MOVE_BACENTA_TO_TEAM, {
    refetchQueries: [{ query: DISPLAY_TEAM, variables: { id: teamId } }],
  })
  const [MoveHubToTeam] = useMutation(MOVE_HUB_TO_TEAM, {
    refetchQueries: [{ query: DISPLAY_TEAM, variables: { id: teamId } }],
  })

  const validationSchema = Yup.object({
    name: Yup.string().required(`Team Name is a required field`),
    leaderId: Yup.string().required(
      'Please choose a leader from the drop down'
    ),
  })

  return (
    <Container>
      <HeadingPrimary>{title}</HeadingPrimary>
      <HeadingSecondary>{initialValues.name + ' Team'}</HeadingSecondary>

      <ButtonGroup className="mt-3">
        {!newTeam && (
          <>
            <Button onClick={() => setBacentaModal(true)}>Add Bacenta</Button>
            <Button variant="warning" onClick={() => setHubModal(true)}>
              Add Hub
            </Button>
            <Button variant="success" onClick={() => setCloseDown(true)}>
              {`Close Down Team`}
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
                      label={`Name of Team`}
                      placeholder={`Name of Team`}
                    />

                    <Row className="d-flex align-items-center mb-3">
                      <RoleView roles={permitAdmin('Council')}>
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
                      {initialValues.bacentas?.length && (
                        <p className="fw-bold fs-5">Bacentas</p>
                      )}
                      {initialValues.bacentas?.map((bacenta, index) => {
                        if (!bacenta && !index)
                          return <NoDataComponent text="No Bacentas" />
                        return (
                          <Button variant="secondary" className="text-start">
                            {bacenta.name} {bacenta.__typename}
                          </Button>
                        )
                      })}
                    </div>

                    <div className="d-grid gap-2 mt-3">
                      {initialValues.hubs?.length && (
                        <p className="fw-bold fs-5">Hubs</p>
                      )}
                      {initialValues.hubs?.map((hub, index) => {
                        if (!hub && !index)
                          return <NoDataComponent text="No Hubs" />
                        return (
                          <Button variant="secondary" className="text-start">
                            {hub.name} {hub.__typename}
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

            <Modal
              show={bacentaModal}
              onHide={() => setBacentaModal(false)}
              centered
            >
              <Modal.Header closeButton>Add A Bacenta</Modal.Header>
              <Modal.Body>
                <p>Choose a bacenta to move to this team</p>
                <SearchBacenta
                  name={`bacenta`}
                  placeholder="Bacenta Name"
                  initialValue=""
                  setFieldValue={formik.setFieldValue}
                  aria-describedby="Bacenta Name"
                />
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="success"
                  type="submit"
                  disabled={buttonLoading || !formik.values.bacenta}
                  onClick={async () => {
                    try {
                      setButtonLoading(true)
                      const res = await MoveBacentaToTeam({
                        variables: {
                          bacentaId: formik.values.bacenta?.id,
                          historyRecord: `${formik.values.bacenta?.name} Bacenta has been moved to ${formik.values.name} Team from ${formik.values.bacenta?.team.name} Team`,
                          newTeamId: teamId,
                          oldTeamId: formik.values.bacenta?.team.id,
                        },
                      })

                      clickCard(res.data.MoveBacentaToTeam)
                      setBacentaModal(false)
                    } catch (error) {
                      throwToSentry(
                        `There was an error moving this bacenta to this team`,
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
                  onClick={() => setBacentaModal(false)}
                >
                  Close
                </Button>
              </Modal.Footer>
            </Modal>

            <Modal show={hubModal} onHide={() => setHubModal(false)} centered>
              <Modal.Header closeButton>Add A Hub</Modal.Header>
              <Modal.Body>
                <p>Choose a hub to move to this team</p>
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
                      const res = await MoveHubToTeam({
                        variables: {
                          hubId: formik.values.hub?.id,
                          historyRecord: `${formik.values.hub?.name} Hub has been moved to ${formik.values.name} Team from ${formik.values.hub?.team.name} Team`,
                          newTeamId: teamId,
                          oldTeamId: formik.values.hub?.team.id,
                        },
                      })

                      clickCard(res.data.MoveHubToTeam)
                      setHubModal(false)
                    } catch (error) {
                      throwToSentry(
                        `There was an error moving this hub to this team`,
                        error
                      )
                    } finally {
                      setButtonLoading(false)
                    }
                  }}
                >
                  <BtnSubmitText loading={buttonLoading} />
                </Button>
                <Button variant="primary" onClick={() => setHubModal(false)}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>

            <Modal show={closeDown} onHide={() => setCloseDown(false)} centered>
              <Modal.Header closeButton>Close Down Team</Modal.Header>
              <Modal.Body>
                <p className="text-info">
                  Are you sure you want to close down this team?
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
                      const res = await CloseDownTeam({
                        variables: {
                          id: teamId,
                          leaderId: initialValues.leaderId,
                          adminId: initialValues?.adminId,
                        },
                      })

                      setButtonLoading(false)
                      clickCard(res.data.CloseDownTeam)
                      setCloseDown(false)
                      navigate(`/team/displayall`)
                    } catch (error) {
                      setButtonLoading(false)
                      throwToSentry(
                        `There was an error closing down this team`,
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

export default TeamForm
