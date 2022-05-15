import React, { useContext } from 'react'
import FormikControl from 'components/formik-components/FormikControl'
import { Formik, Form } from 'formik'
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

  const initialValues = {
    offeringBags: 0,
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
  })

  const onSubmit = async (values, onSubmitProps) => {
    onSubmitProps.setSubmitting(true)
    try {
      await CreateEquipmentRecord({
        variables: {
          id: fellowshipId,
          offeringBags: parseInt(values.offeringBags),
          date: new Date().toISOString().slice(0, 10),
        },
      })
    } catch (error) {
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
          <HeadingSecondary className="text-center">{`${church?.name} ${churchType}`}</HeadingSecondary>
          <Form>
            <Row className="row-cols-1 row-cols-md-2 mt-5">
              <Col className="mb-2">
                <small htmlFor="date" className="form-text ">
                  Date * <i className="text-secondary">(Day/Month/Year)</i>
                </small>
                <FormikControl
                  className="form-control"
                  control="input"
                  name="date"
                  type="date"
                  placeholder="dd/mm/yyyy"
                />
                <small htmlFor="date" className="form-text ">
                  Number of Offering Bags*{' '}
                </small>
                <FormikControl
                  className="form-control"
                  control="input"
                  name="offeringBags"
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
