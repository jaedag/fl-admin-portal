import React, { useContext } from 'react'
import { Formik, Form, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import { Col, Container, Row } from 'react-bootstrap'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import { MemberContext } from 'contexts/MemberContext'
import { useMutation } from '@apollo/client'
import { CREATE_GOVERNORSHIP_EQUIPMENT_RECORD } from '../../CampaignQueries'
import { ChurchContext } from 'contexts/ChurchContext'
import { useNavigate } from 'react-router'
import { throwToSentry } from '../../../../global-utils'
import Input from 'components/formik/Input'
import SubmitButton from 'components/formik/SubmitButton'
import HeadingSecondary from 'components/HeadingSecondary'

type FormOptions = {
  pulpits: string
  date: string
}

const GovernorshipEquipmentForm = () => {
  const { currentUser } = useContext(MemberContext)
  const { governorshipId } = useContext(ChurchContext)
  const church = currentUser.currentChurch
  const churchType = currentUser.currentChurch?.__typename

  const [CreateEquipmentRecord] = useMutation(
    CREATE_GOVERNORSHIP_EQUIPMENT_RECORD
  )

  const navigate = useNavigate()

  const initialValues: FormOptions = {
    pulpits: '0',
    date: new Date().toISOString().slice(0, 10),
  }

  const validationSchema = Yup.object({
    pulpits: Yup.number()
      .typeError('Please enter a valid number')
      .integer('You cannot have pulpits with decimals!')
      .min(0)
      .max(1)
      .required(
        'You cannot submit this form without entering the number of pulpits'
      ),
  })

  const onSubmit = async (
    values: FormOptions,
    onSubmitProps: FormikHelpers<FormOptions>
  ) => {
    onSubmitProps.setSubmitting(true)
    try {
      await CreateEquipmentRecord({
        variables: {
          id: governorshipId,
          pulpits: parseInt(values.pulpits),
          date: new Date().toISOString().slice(0, 10),
        },
      })
    } catch (error: any) {
      throwToSentry(error)
      navigate(-1)
    }
    onSubmitProps.setSubmitting(false)
    onSubmitProps.resetForm()
    navigate('/campaigns/governorship/equipment/form-details')
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      validateOnMount={true}
    >
      {(formik) => (
        <Container>
          <div className="text-center">
            <HeadingPrimary>{`${church?.name} ${churchType}`}</HeadingPrimary>
            <HeadingSecondary>Equipment Campaign Form</HeadingSecondary>
          </div>
          <Form>
            <Row className="row-cols-1 row-cols-md-2 mt-5">
              <Col className="mb-2">
                <small className="form-text ">
                  Date * <i className="text-secondary">(Day/Month/Year)</i>
                </small>
                <Input
                  className="form-control"
                  name="date"
                  type="date"
                  placeholder="dd/mm/yyyy"
                />
                <small className="form-text ">Number of Pulpits* </small>
                <Input className="form-control" name="pulpits" />
                <div className="d-flex justify-content-center pt-2">
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

export default GovernorshipEquipmentForm
