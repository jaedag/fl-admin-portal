import React, { useContext } from 'react'
import FormikControl from 'components/formik-components/FormikControl'
import { Formik, Form } from 'formik'
import { Col, Container, Row, Button } from 'react-bootstrap'
import HeadingSecondary from 'components/HeadingSecondary'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import { MemberContext } from 'contexts/MemberContext'
import { useMutation } from '@apollo/client'
import { SET_EQUIPMENT_DEADLINE } from '../../CampaignQueries'
import { ChurchContext } from 'contexts/ChurchContext'
import { useNavigate } from 'react-router'
import { throwErrorMsg } from 'global-utils'

const GatheringServiceEquipmentDeadline = () => {
  const { gatheringServiceId } = useContext(ChurchContext)

  const [SetEquipmentDealine] = useMutation(SET_EQUIPMENT_DEADLINE)
  const { theme } = useContext(MemberContext)
  const navigate = useNavigate()

  const initialValues = {
    startDate: '',
    endDate: '',
  }

  const onSubmit = (values, onSubmitProps) => {
    onSubmitProps.setSubmitting(true)
    SetEquipmentDealine({
      variables: {
        startDate: values.startDate,
        endDate: values.endDate,
        gatheringServiceId: gatheringServiceId,
      },
    })
      .then(() => {
        onSubmitProps.setSubmitting(false)
        onSubmitProps.resetForm()
        navigate('/campaigns/gatheringservice')
        alert('Equipment Deadline Set')
      })
      .catch((error) => {
        throwErrorMsg(error)
      })
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validateOnMount={true}
    >
      {(formik) => (
        <Container>
          <HeadingPrimary className="text-center">
            Equipment Campaign Form
          </HeadingPrimary>
          <HeadingSecondary className="text-center text-secondary">
            Deadline Dates
          </HeadingSecondary>
          <Form>
            <Row className="row-cols-1 row-cols-md-2 mt-5">
              <Col className="mb-2">
                <small htmlFor="date" className="form-text">
                  Start Date*{' '}
                </small>
                <FormikControl
                  className="form-control"
                  control="input"
                  name="startDate"
                  type="date"
                  placeholder="dd/mm/yyyy"
                />
                <small htmlFor="date" className="form-text">
                  End Date*{' '}
                </small>
                <FormikControl
                  className="form-control"
                  control="input"
                  name="endDate"
                  type="date"
                  placeholder="dd/mm/yyyy"
                />
                <div className="d-flex justify-content-center pt-4">
                  <Button
                    variant="primary"
                    size="lg"
                    type="submit"
                    className={`btn-main ${theme}`}
                    disabled={!formik.isValid || formik.isSubmitting}
                  >
                    Submit
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        </Container>
      )}
    </Formik>
  )
}

export default GatheringServiceEquipmentDeadline
