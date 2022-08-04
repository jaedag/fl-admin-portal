import React, { useContext } from 'react'
import FormikControl from 'components/formik-components/FormikControl'
import { Formik, Form, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import { Col, Container, Row, Button } from 'react-bootstrap'
import HeadingSecondary from 'components/HeadingSecondary'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import { MemberContext } from 'contexts/MemberContext'
import { useMutation } from '@apollo/client'
import { CREATE_FELLOWSHIP_EQUIPMENT_RECORD } from '../../CampaignQueries'
import { ChurchContext } from 'contexts/ChurchContext'
import { useNavigate } from 'react-router'
import { throwErrorMsg } from '../../../../global-utils'

type FormOptions = {
  offeringBags: number
  bluetoothSpeakers: number
  date: string
}

const FellowshipEquipmentForm = () => {
  const { currentUser } = useContext(MemberContext)
  const { fellowshipId } = useContext(ChurchContext)
  const church = currentUser.currentChurch
  const churchType = currentUser.currentChurch?.__typename

  const [CreateEquipmentRecord] = useMutation(
    CREATE_FELLOWSHIP_EQUIPMENT_RECORD
  )
  const { theme } = useContext(MemberContext)
  const navigate = useNavigate()

  const initialValues: FormOptions = {
    offeringBags: 0,
    bluetoothSpeakers: 0,
    date: new Date().toISOString().slice(0, 10),
  }

  const validationSchema = Yup.object({
    offeringBags: Yup.number()
      .typeError('Please enter a valid number')
      .positive()
      .integer('You cannot have offering bags with decimals!')
      .required(
        'You cannot submit this form without entering the number of offerigBags'
      ),
    bluetoothSpeakers: Yup.number()
      .typeError('Please enter a valid number')
      .positive()
      .integer('You cannot have bluetooth speakers with decimals!')
      .required(
        'You cannot submit this form without entering the number of bluetooth speakers'
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
          id: fellowshipId,
          offeringBags: values.offeringBags,
          bluetoothSpeakers: values.bluetoothSpeakers,
          date: new Date().toISOString().slice(0, 10),
        },
      })
    } catch (error: any) {
      throwErrorMsg(error)
    }
    onSubmitProps.setSubmitting(false)
    onSubmitProps.resetForm()
    navigate('/campaigns/fellowship/equipment/form-details')
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
          <HeadingPrimary className="text-center">
            Equipment Campaign Form
          </HeadingPrimary>
          <h6 className="text-center text-secondary">{`${church?.name} ${churchType}`}</h6>

          <Form>
            <Row className="row-cols-1 row-cols-md-2 mt-4">
              <Col className="mb-2">
                <small className="form-text ">
                  Date * <i className="text-secondary">(Day/Month/Year)</i>
                </small>
                <FormikControl
                  className="form-control"
                  control="input"
                  name="date"
                  type="date"
                  placeholder="dd/mm/yyyy"
                />
                <small className="form-text ">Number of Offering Bags* </small>
                <FormikControl
                  className="form-control"
                  control="input"
                  name="offeringBags"
                />
                <small className="form-text ">
                  Number of Bluetooth Speakers*{' '}
                </small>
                <FormikControl
                  className="form-control"
                  control="input"
                  name="bluetoothSpeakers"
                />
                <div className="d-flex justify-content-center pt-2">
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

export default FellowshipEquipmentForm
