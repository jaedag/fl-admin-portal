import React, { useContext } from 'react'
import FormikControl from 'components/formik-components/FormikControl'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { Col, Container, Row, Button } from 'react-bootstrap'
import HeadingSecondary from 'components/HeadingSecondary'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import { MemberContext } from 'contexts/MemberContext'
import { useMutation } from '@apollo/client'
import { CREATE_CONSTITUENCY_EQUIPMENT_RECORD } from '../../CampaignQueries'
import { ChurchContext } from 'contexts/ChurchContext'
import { useNavigate } from 'react-router'
import { throwErrorMsg } from '../../../../global-utils'

const ConstituencyEquipmentForm = () => {
  const { currentUser } = useContext(MemberContext)
  const { constituencyId } = useContext(ChurchContext)
  const church = currentUser.currentChurch
  const churchType = currentUser.currentChurch?.__typename

  const [CreateEquipmentRecord] = useMutation(
    CREATE_CONSTITUENCY_EQUIPMENT_RECORD
  )
  const { theme } = useContext(MemberContext)
  const navigate = useNavigate()

  const initialValues = {
    pulpits: 0,
    date: new Date().toISOString().slice(0, 10),
  }

  const validationSchema = Yup.object({
    pulpits: Yup.number()
      .typeError('Please enter a valid number')
      .positive()
      .integer('You cannot have pulpits with decimals!')
      .required(
        'You cannot submit this form without entering the number of pulpits'
      ),
  })

  const onSubmit = async (values, onSubmitProps) => {
    onSubmitProps.setSubmitting(true)
    try {
      await CreateEquipmentRecord({
        variables: {
          id: constituencyId,
          pulpits: parseInt(values.pulpits),
          date: new Date().toISOString().slice(0, 10),
        },
      })
    } catch (error) {
      throwErrorMsg(error)
    }
    onSubmitProps.setSubmitting(false)
    onSubmitProps.resetForm()
    navigate('/campaigns/constituency/equipment/form-details')
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
                  Number of Pulpits*{' '}
                </small>
                <FormikControl
                  className="form-control"
                  control="input"
                  name="pulpits"
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

export default ConstituencyEquipmentForm
