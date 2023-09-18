import { useMutation } from '@apollo/client'
import { Form, Formik, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import { throwToSentry } from 'global-utils'
import { useContext, useState } from 'react'
import { ChurchContext } from 'contexts/ChurchContext'
import { MAKE_CONSTITUENCY_INACTIVE } from 'pages/directory/update/CloseChurchMutations'
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
import { Bacenta, Council } from 'global-types'
import { MOVE_BACENTA_TO_CONSTITUENCY } from '../update/UpdateMutations'
import NoDataComponent from 'pages/arrivals/CompNoData'
import { DISPLAY_CONSTITUENCY, DISPLAY_COUNCIL } from '../display/ReadQueries'

export interface ConstituencyFormValues extends FormikInitialValues {
  council?: Council
  bacentas?: Bacenta[]
  bacenta?: Bacenta
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
  const [bacentaModal, setBacentaModal] = useState(false)
  const [closeDown, setCloseDown] = useState(false)

  const navigate = useNavigate()
  const [buttonLoading, setButtonLoading] = useState(false)
  const [CloseDownConstituency] = useMutation(MAKE_CONSTITUENCY_INACTIVE, {
    refetchQueries: [
      { query: DISPLAY_COUNCIL, variables: { id: constituencyId } },
    ],
  })
  const [MoveBacentaToConstituency] = useMutation(
    MOVE_BACENTA_TO_CONSTITUENCY,
    {
      refetchQueries: [
        { query: DISPLAY_CONSTITUENCY, variables: { id: constituencyId } },
      ],
    }
  )

  const validationSchema = Yup.object({
    name: Yup.string().required(`Constituency Name is a required field`),
    leaderId: Yup.string().required(
      'Please choose a leader from the drop down'
    ),
  })

  return (
    <Container>
      <HeadingPrimary>{title}</HeadingPrimary>
      <HeadingSecondary>
        {initialValues.name + ' Constituency'}
      </HeadingSecondary>
      <ButtonGroup className="mt-3">
        {!newConstituency && (
          <>
            <Button onClick={() => setBacentaModal(true)}>Add Bacenta</Button>
            <Button variant="success" onClick={() => setCloseDown(true)}>
              {`Close Down Constituency`}
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
                      label={`Name of Constituency`}
                      placeholder={`Name of Constituency`}
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
                      <p className="fw-bold fs-5">Bacentas</p>
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
                <p>Choose a bacenta to move to this constituency</p>
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
                      const res = await MoveBacentaToConstituency({
                        variables: {
                          bacentaId: formik.values.bacenta?.id,
                          historyRecord: `${formik.values.bacenta?.name} Bacenta has been moved to ${formik.values.name} Constituency from ${formik.values.bacenta?.constituency.name} Constituency`,
                          newConstituencyId: constituencyId,
                          oldConstituencyId:
                            formik.values.bacenta?.constituency.id,
                        },
                      })

                      clickCard(res.data.MoveBacentaToConstituency)
                      setBacentaModal(false)
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
                  onClick={() => setBacentaModal(false)}
                >
                  Close
                </Button>
              </Modal.Footer>
            </Modal>

            <Modal show={closeDown} onHide={() => setCloseDown(false)} centered>
              <Modal.Header closeButton>Close Down Constituency</Modal.Header>
              <Modal.Body>
                <p className="text-info">
                  Are you sure you want to close down this constituency?
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
                      const res = await CloseDownConstituency({
                        variables: {
                          id: constituencyId,
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

export default ConstituencyForm
