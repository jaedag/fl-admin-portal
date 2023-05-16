import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import Input from 'components/formik/Input'
import SubmitButton from 'components/formik/SubmitButton'
import { Form, Formik, FormikHelpers } from 'formik'
import React, { useContext } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import * as Yup from 'yup'
import {
  GET_MEMBER_TITLES,
  UPDATE_MEMBER_APPOINTMENT_DATE,
  UPDATE_MEMBER_CONSECRATION_DATE,
  UPDATE_MEMBER_ORDINATION_DATE,
} from './MemberTitleGQL'
import { MemberContext } from 'contexts/MemberContext'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { useMutation, useQuery } from '@apollo/client'
import { throwToSentry } from 'global-utils'

const MemberTitleForm = () => {
  const { memberId } = useContext(MemberContext)
  const navigate = useNavigate()
  const { data, loading, error } = useQuery(GET_MEMBER_TITLES, {
    variables: {
      id: memberId,
    },
  })
  const [UpdateMemberAppointmentDate] = useMutation(
    UPDATE_MEMBER_APPOINTMENT_DATE
  )
  const [UpdateMemberOrdinationDate] = useMutation(
    UPDATE_MEMBER_ORDINATION_DATE
  )
  const [UpdateMemberConsecrationDate] = useMutation(
    UPDATE_MEMBER_CONSECRATION_DATE
  )
  const member = data?.members[0]

  const initialValues = {
    appointmentDate: '',
    ordinationDate: '',
    consecrationDate: '',
  }

  const validationSchema = Yup.object({
    appointmentDate: Yup.string(),
    ordinationDate: Yup.string(),
    consecrationDate: Yup.string(),
  })

  const onSubmit = async (
    values: typeof initialValues,
    onSubmitProps: FormikHelpers<typeof initialValues>
  ) => {
    onSubmitProps.setSubmitting(true)

    const promises = []

    if (values.appointmentDate) {
      promises.push(
        UpdateMemberAppointmentDate({
          variables: {
            id: memberId,
            appointmentDate: values.appointmentDate,
          },
        })
      )
    }

    if (values.ordinationDate) {
      promises.push(
        UpdateMemberOrdinationDate({
          variables: {
            id: memberId,
            ordinationDate: values.ordinationDate,
          },
        })
      )
    }

    if (values.consecrationDate) {
      promises.push(
        UpdateMemberConsecrationDate({
          variables: {
            id: memberId,
            consecrationDate: values.consecrationDate,
          },
        })
      )
    }

    try {
      await Promise.all(promises)
      navigate('/member/displaydetails')
    } catch (err) {
      throwToSentry('Error Updating Member Title', err)
    }

    onSubmitProps.setSubmitting(false)
  }

  return (
    <ApolloWrapper data={data} loading={loading} error={error}>
      <Container>
        <HeadingPrimary>Member Title Form</HeadingPrimary>
        <HeadingSecondary>{member?.name}</HeadingSecondary>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => (
            <Form>
              <div className="form-group">
                <Row className="row-cols-1 row-cols-md-2">
                  <Col>
                    <Input
                      name="appointmentDate"
                      label="Pastoral Appointment Date"
                      type="date"
                    />
                  </Col>
                  <Col>
                    <Input
                      name="ordinationDate"
                      label="Ordination Date"
                      type="date"
                    />
                  </Col>
                  <Col>
                    <Input
                      name="consecrationDate"
                      label="Consecration Date"
                      type="date"
                    />
                  </Col>
                </Row>
                <SubmitButton formik={formik} />
              </div>
            </Form>
          )}
        </Formik>
      </Container>
    </ApolloWrapper>
  )
}

export default MemberTitleForm
