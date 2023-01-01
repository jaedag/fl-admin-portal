import { useLazyQuery } from '@apollo/client'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import Input from 'components/formik/Input'
import SubmitButton from 'components/formik/SubmitButton'
import { ChurchContext } from 'contexts/ChurchContext'
import { MemberContext } from 'contexts/MemberContext'
import { FormikHelpers, Formik, Form } from 'formik'
import FloatingLabelFormControl from 'pages/campaigns/components/inputs/FloatingLabelFormControl'
import React, { useContext, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Check2Circle } from 'react-bootstrap-icons'
import { STREAM_STAT_FOR_YEAR_TILL_DATE } from '../ShepherdingControlQueries'
import * as Yup from 'yup'

type FormOptions = {
  startDate: string
  endDate: string
}

const StreamShepherdingControlYearTillDate = () => {
  const { streamId } = useContext(ChurchContext)

  const { currentUser } = useContext(MemberContext)

  const church = currentUser?.currentChurch

  const initialValues: FormOptions = {
    startDate: '2022-01-01',
    endDate: new Date().toISOString().slice(0, 10),
  }

  const [streamStatForYearTillDate, { data, loading, error }] = useLazyQuery(
    STREAM_STAT_FOR_YEAR_TILL_DATE
  )

  const onSubmit = (
    values: FormOptions,
    onSubmitProps: FormikHelpers<FormOptions>
  ) => {
    onSubmitProps.setSubmitting(true)

    streamStatForYearTillDate({
      variables: {
        streamId,
        startDate: values.startDate,
        endDate: values.endDate,
      },
    })
    onSubmitProps.setSubmitting(false)
  }

  const validationSchema = Yup.object({
    startDate: Yup.date().required('Start Date is a required field'),
    endDate: Yup.date()
      .required('End Date is a required field')
      .when(
        'startDate',
        (startDate, Yup) =>
          startDate &&
          Yup.min(startDate, 'End Date cannot be before Start Date')
      ),
  })

  const statsForYearTillDate = data?.streams[0]?.statsForYearTillDate

  useEffect(() => {
    streamStatForYearTillDate({
      variables: {
        streamId,
        startDate: initialValues.startDate,
        endDate: initialValues.endDate,
      },
    })
  }, [])

  return (
    <Container>
      <h6>{church?.name} Stream</h6>
      <h6 className="text-primary">Stats Till Date</h6>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        validateOnMount
      >
        {(formik) => (
          <>
            <Form>
              <div className="mt-3 px-2">
                <Row className="align-items-center gx-1 justify-content-between ">
                  <Col className="d-inline-block" xs={5}>
                    <Input
                      name="startDate"
                      type="date"
                      placeholder="dd/mm/yyyy"
                      aria-describedby="startDate"
                    />
                  </Col>
                  <Col className="d-inline-block" xs={5}>
                    <Input
                      name="endDate"
                      type="date"
                      placeholder="dd/mm/yyyy"
                      aria-describedby="startDate"
                    />
                  </Col>
                  <Col xs={2} className="text-center">
                    <SubmitButton formik={formik}>
                      <Check2Circle size={23} />
                    </SubmitButton>
                  </Col>
                </Row>
              </div>
            </Form>
            <ApolloWrapper loading={loading} error={error} data={data}>
              <div className="d-grid gap-2 mt-2">
                <FloatingLabelFormControl
                  label="Average Weekly Bussing Attendance"
                  type={'number'}
                  value={statsForYearTillDate?.bussing}
                  disabled={true}
                />
                <FloatingLabelFormControl
                  label="Average Weekly Weekday Attendance"
                  type={'number'}
                  value={statsForYearTillDate?.attendance}
                  disabled={true}
                />
                <FloatingLabelFormControl
                  label="Average Weekly Weekday Income"
                  type={'number'}
                  value={statsForYearTillDate?.avgWeeklyIncome}
                  disabled={true}
                />
                <FloatingLabelFormControl
                  label="Cumulative Income for the Period"
                  type="number"
                  value={statsForYearTillDate?.income}
                  disabled={true}
                />
              </div>
            </ApolloWrapper>
          </>
        )}
      </Formik>
    </Container>
  )
}

export default StreamShepherdingControlYearTillDate
