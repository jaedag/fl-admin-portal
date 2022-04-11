import React, { useContext } from 'react'
import FormikControl from 'components/formik-components/FormikControl'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { Col, Container, Row, Button } from 'react-bootstrap'
import HeadingSecondary from 'components/HeadingSecondary'
import BaseComponent from 'components/base-component/BaseComponent'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import { MemberContext } from 'contexts/MemberContext'
import { useMutation, useQuery } from '@apollo/client'
import {
  FELLOWSHIP_EQUIPMENT_RECORD_CREATION,
  LATEST_EQUIPMENT_RECORD,
} from '../../CampaignQueries'
import { ChurchContext } from 'contexts/ChurchContext'
import { useNavigate } from 'react-router'

const FellowshipEquipmentForm = () => {
  const { currentUser } = useContext(MemberContext)
  const { fellowshipId } = useContext(ChurchContext)
  const church = currentUser.currentChurch
  const churchType = currentUser.currentChurch?.__typename

  const { data, loading, error } = useQuery(LATEST_EQUIPMENT_RECORD, {
    variables: {
      churchId: fellowshipId,
    },
  })

  const fellowshipRecordId = data?.latestEquipmentRecord?.id
  const equipmentDate = data?.latestEquipmentRecord?.equipmentDate?.date
  const offeringBags = data?.latestEquipmentRecord?.offeringBags

  const [CreateEquipmentRecord] = useMutation(
    FELLOWSHIP_EQUIPMENT_RECORD_CREATION
  )
  const { theme } = useContext(MemberContext)
  const navigate = useNavigate()

  const initialValues = {
    offeringBags: offeringBags,
    date: equipmentDate?.slice(0, 10),
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

  const onSubmit = (values, onSubmitProps) => {
    onSubmitProps.setSubmitting(true)
    CreateEquipmentRecord({
      variables: {
        fellowshipRecordId: fellowshipRecordId,
        offeringBags: parseInt(values.offeringBags),
      },
    }).then(() => {
      onSubmitProps.setSubmitting(false)
      onSubmitProps.resetForm()
      navigate('/campaigns/fellowship/equipment/form-details')
    })
  }

  return (
    <BaseComponent data={data} loading={loading} error={error}>
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
    </BaseComponent>
  )
}

export default FellowshipEquipmentForm
