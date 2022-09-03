import React, { useContext } from 'react'
import { Formik, Form, FormikHelpers } from 'formik'
import { Col, Container, Row } from 'react-bootstrap'
import { useMutation } from '@apollo/client'
import { SET_EQUIPMENT_DEADLINE } from '../../CampaignQueries'
import { ChurchContext } from 'contexts/ChurchContext'
import { useNavigate } from 'react-router'
import { throwErrorMsg } from 'global-utils'
import Input from 'components/formik/Input'
import SubmitButton from 'components/formik/SubmitButton'

type FormOptions = {
  startDate: string
  endDate: string
}

const GatheringServiceEquipmentDeadline = () => {
  const { gatheringServiceId } = useContext(ChurchContext)

  const [SetEquipmentDealine] = useMutation(SET_EQUIPMENT_DEADLINE)
  const navigate = useNavigate()

  const initialValues: FormOptions = {
    startDate: '',
    endDate: '',
  }

  const onSubmit = (
    values: FormOptions,
    onSubmitProps: FormikHelpers<FormOptions>
  ) => {
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
        alert('The equipment deadline has been set')
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
          <h1 className="text-center text-secondary">
            Equipment Campaign Form
          </h1>
          <h6 className="text-center">Deadline Dates</h6>
          <Form>
            <Row className="row-cols-1 row-cols-md-2 mt-5">
              <Col className="mb-2">
                <small className="form-text">Start Date* </small>
                <Input
                  className="form-control"
                  name="startDate"
                  type="date"
                  placeholder="dd/mm/yyyy"
                />
                <small className="form-text">End Date* </small>
                <Input
                  className="form-control"
                  name="endDate"
                  type="date"
                  placeholder="dd/mm/yyyy"
                />
                <div className="d-flex justify-content-center pt-4">
                  <SubmitButton formik={formik} />
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
