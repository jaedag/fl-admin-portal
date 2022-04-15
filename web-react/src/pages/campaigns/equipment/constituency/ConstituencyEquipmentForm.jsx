import React, { useContext } from 'react'
import FormikControl from 'components/formik-components/FormikControl'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { Col, Container, Row, Button } from 'react-bootstrap'
import HeadingSecondary from 'components/HeadingSecondary'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import { MemberContext } from 'contexts/MemberContext'
import { useMutation, useQuery } from '@apollo/client'
import {
  CONSTITUENCY_LATEST_EQUIPMENT_RECORD,
  CREATE_CONSTITUENCY_EQUIPMENT_RECORD,
} from '../../CampaignQueries'
import { ChurchContext } from 'contexts/ChurchContext'
import { useNavigate } from 'react-router'
import BaseComponent from 'components/base-component/BaseComponent'

const ConstituencyEquipmentForm = () => {
  const { currentUser } = useContext(MemberContext)
  const { constituencyId } = useContext(ChurchContext)
  const church = currentUser.currentChurch
  const churchType = currentUser.currentChurch?.__typename

  const { data, loading, error } = useQuery(
    CONSTITUENCY_LATEST_EQUIPMENT_RECORD,
    {
      variables: {
        constituencyId: constituencyId,
      },
    }
  )

  const constituency = data?.constituencies[0]

  const constituencyRecordId = constituency?.latestEquipmenRecord?.id
  const equipmentDate = constituency?.latestEquipmenRecord?.equipmentDate?.date
  const pulpits = constituency?.latestEquipmenRecord?.pulpits

  const [CreateEquipmentRecord] = useMutation(
    CREATE_CONSTITUENCY_EQUIPMENT_RECORD
  )
  const { theme } = useContext(MemberContext)
  const navigate = useNavigate()

  const initialValues = {
    pulpits: pulpits,
    date: equipmentDate?.slice(0, 10),
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

  const onSubmit = (values, onSubmitProps) => {
    onSubmitProps.setSubmitting(true)
    CreateEquipmentRecord({
      variables: {
        constituencyRecordId: constituencyRecordId,
        pulpits: parseInt(values.pulpits),
      },
    }).then(() => {
      onSubmitProps.setSubmitting(false)
      onSubmitProps.resetForm()
      navigate('/campaigns/constituency/equipment/form-details')
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
    </BaseComponent>
  )
}

export default ConstituencyEquipmentForm
