import { useMutation } from '@apollo/client'
import { Form, Formik, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import { VACATION_OPTIONS, throwToSentry } from 'global-utils'
import { FormikInitialValues } from 'components/formik/formik-types'
import { Constituency, Fellowship } from 'global-types'
import { permitAdminArrivals } from 'permission-utils'
import { useContext, useState } from 'react'
import { ChurchContext } from 'contexts/ChurchContext'
import { useNavigate } from 'react-router'
import { MAKE_BACENTA_INACTIVE } from 'pages/directory/update/CloseChurchMutations'
import RoleView from 'auth/RoleView'
import {
  Container,
  Row,
  Col,
  Button,
  ButtonGroup,
  Modal,
} from 'react-bootstrap'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import SubmitButton from 'components/formik/SubmitButton'
import {
  DISPLAY_BACENTA,
  DISPLAY_CONSTITUENCY,
} from 'pages/directory/display/ReadQueries'
import Select from 'components/formik/Select'
import Input from 'components/formik/Input'
import SearchMember from 'components/formik/SearchMember'
import NoDataComponent from 'pages/arrivals/CompNoData'
import SearchFellowship from 'components/formik/SearchFellowship'
import { MOVE_FELLOWSHIP_TO_BACENTA } from '../update/UpdateMutations'

export interface BacentaFormValues extends FormikInitialValues {
  constituency?: Constituency
  graduationStatus: string
  vacationStatus: string
  fellowship?: Fellowship
  fellowships?: Fellowship[]
}

type BacentaFormProps = {
  initialValues: BacentaFormValues
  onSubmit: (
    values: BacentaFormValues,
    onSubmitProps: FormikHelpers<BacentaFormValues>
  ) => void
  title: string
  newBacenta: boolean
}

const BacentaForm = ({
  initialValues,
  onSubmit,
  title,
  newBacenta,
}: BacentaFormProps) => {
  const { clickCard, bacentaId } = useContext(ChurchContext)
  const [fellowshipModal, setFellowshipModal] = useState(false)
  const [closeDown, setCloseDown] = useState(false)

  const navigate = useNavigate()
  const [buttonLoading, setButtonLoading] = useState(false)
  const [CloseDownBacenta] = useMutation(MAKE_BACENTA_INACTIVE, {
    refetchQueries: [
      {
        query: DISPLAY_CONSTITUENCY,
        variables: { id: initialValues.constituency },
      },
    ],
  })
  const [MoveFellowshipToBacenta] = useMutation(MOVE_FELLOWSHIP_TO_BACENTA, {
    refetchQueries: [{ query: DISPLAY_BACENTA, variables: { id: bacentaId } }],
  })

  const validationSchema = Yup.object({
    name: Yup.string().required('Bacenta Name is a required field'),
    leaderId: Yup.string().required('Please choose a leader from the dropdown'),
    vacationStatus: Yup.string().required(
      'Vacation Status is a required field'
    ),
  })

  return (
    <Container>
      <HeadingPrimary>{title}</HeadingPrimary>
      <HeadingSecondary>{initialValues.name}</HeadingSecondary>
      <ButtonGroup className="mt-3">
        {!newBacenta && (
          <>
            <Button onClick={() => setFellowshipModal(true)}>
              Add Fellowship
            </Button>

            <Button variant="danger" onClick={() => setCloseDown(true)}>
              {`Close Down Constituency`}
            </Button>
          </>
        )}
      </ButtonGroup>

      <RoleView roles={permitAdminArrivals('Stream')}>
        <Button
          variant="warning"
          className="mt-1"
          onClick={() => navigate('/bacenta/editbussing')}
        >
          Edit Bussing Details
        </Button>
      </RoleView>

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
                    <Row className="form-row">
                      <Col>
                        <Input
                          name="name"
                          label="Name of Bacenta"
                          placeholder="Enter Name Here"
                        />
                        <Select
                          name="vacationStatus"
                          options={VACATION_OPTIONS}
                          defaultOption="Choose Vacation Status"
                          label="Status"
                        />
                      </Col>
                    </Row>

                    <Row className="d-flex align-items-center mb-3">
                      <RoleView roles={permitAdminArrivals('Constituency')}>
                        <Col>
                          <SearchMember
                            name="leaderId"
                            initialValue={initialValues?.leaderName}
                            placeholder="Start typing"
                            label="Select a Leader"
                            setFieldValue={formik.setFieldValue}
                            aria-describedby="Member Search Box"
                            error={formik.errors.leaderId}
                          />
                        </Col>
                      </RoleView>
                    </Row>

                    <div className="d-grid gap-2">
                      <div className="fw-bold fs-5">Fellowship</div>
                      {initialValues.fellowships?.map((fellowship, index) => {
                        if (!fellowship && !index)
                          return <NoDataComponent text="No Fellowships" />
                        return (
                          <Button variant="secondary" className="text-start">
                            {fellowship.name} {fellowship.__typename}
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
              show={fellowshipModal}
              onHide={() => setFellowshipModal(false)}
              centered
            >
              <Modal.Header closeButton>Add A Fellowship</Modal.Header>
              <Modal.Body>
                <p>Choose a fellowship to move to this bacenta</p>
                <SearchFellowship
                  name={`fellowship`}
                  placeholder="Fellowship Name"
                  initialValue=""
                  setFieldValue={formik.setFieldValue}
                  aria-describedby="Fellowship Name"
                />
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="success"
                  type="submit"
                  disabled={buttonLoading || !formik.values.fellowship}
                  onClick={async () => {
                    try {
                      setButtonLoading(true)
                      const res = await MoveFellowshipToBacenta({
                        variables: {
                          fellowshipId: formik.values.fellowship?.id,
                          historyRecord: `${formik.values.fellowship?.name} Fellowship has been moved to ${formik.values.name} Bacenta from ${formik.values.fellowship?.bacenta.name} Bacenta`,
                          newBacentaId: bacentaId,
                          oldBacentaId: formik.values.fellowship?.bacenta.id,
                        },
                      })

                      clickCard(res.data.MoveFellowshipToBacenta)
                      setFellowshipModal(false)
                    } catch (error) {
                      throwToSentry(
                        `There was an error moving this bacenta to this constituency`,
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
                  onClick={() => setFellowshipModal(false)}
                >
                  Close
                </Button>
              </Modal.Footer>
            </Modal>

            <Modal show={closeDown} onHide={() => setCloseDown(false)} centered>
              <Modal.Header closeButton>Close Down Bacenta</Modal.Header>
              <Modal.Body>
                <p className="text-info">
                  Are you sure you want to close down this bacenta?
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
                      const res = await CloseDownBacenta({
                        variables: {
                          id: bacentaId,
                          leaderId: initialValues.leaderId,
                        },
                      })

                      setButtonLoading(false)
                      clickCard(res.data.CloseDownConstituency)
                      setCloseDown(false)
                      navigate(`/constituency/displayall`)
                    } catch (error) {
                      setButtonLoading(false)
                      throwToSentry(
                        `There was an error closing down this constituency`,
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
  )
}

export default BacentaForm
