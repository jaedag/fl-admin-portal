import { useMutation, useQuery } from '@apollo/client'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import PlaceholderCustom from 'components/Placeholder'
import { ChurchContext } from 'contexts/ChurchContext'
import { ServiceContext } from 'contexts/ServiceContext'
import { Formik, Form, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import { useContext } from 'react'
import { Card, Container } from 'react-bootstrap'
import { DISPLAY_BUSSING_RECORDS } from './arrivalsQueries'
import {
  CONFIRM_BUSSING_BY_ADMIN,
  RECORD_ARRIVAL_TIME,
  SEND_BUSSING_SUPPORT,
  SET_BUSSING_SUPPORT,
} from './arrivalsMutation'
import { useNavigate } from 'react-router'
import SubmitButton from 'components/formik/SubmitButton'
import { alertMsg, throwErrorMsg } from 'global-utils'
import { BacentaWithArrivals, BussingRecord } from './arrivals-types'
import Input from 'components/formik/Input'
import Textarea from 'components/formik/Textarea'
import RadioButtons from 'components/formik/RadioButtons'

type FormOptions = {
  attendance: string
  numberOfSprinters: string
  numberOfUrvans: string
  numberOfCars: string
  comments: string
  addMoreLater: 'true' | 'false'
}

const FormAttendanceConfirmation = () => {
  const navigate = useNavigate()
  const { bacentaId } = useContext(ChurchContext)
  const { bussingRecordId } = useContext(ServiceContext)

  const { data, loading, error } = useQuery(DISPLAY_BUSSING_RECORDS, {
    variables: { bussingRecordId: bussingRecordId, bacentaId: bacentaId },
  })
  const [ConfirmBussingByAdmin] = useMutation(CONFIRM_BUSSING_BY_ADMIN)
  const [SetBussingSupport] = useMutation(SET_BUSSING_SUPPORT)
  const [SendBussingSupport] = useMutation(SEND_BUSSING_SUPPORT)
  const [RecordArrivalTime] = useMutation(RECORD_ARRIVAL_TIME)

  const bussing: BussingRecord = data?.bussingRecords[0]
  const bacenta: BacentaWithArrivals = data?.bacentas[0]

  const initialValues: FormOptions = {
    attendance: '',
    numberOfSprinters: bussing?.numberOfSprinters.toString() ?? '0',
    numberOfUrvans: bussing?.numberOfUrvans.toString() ?? '0',
    numberOfCars: bussing?.numberOfCars.toString() ?? '0',
    comments: '',
    addMoreLater: 'false',
  }

  const validationSchema = Yup.object({
    attendance: Yup.number()
      .typeError('Please enter a valid number')
      .positive()
      .integer('You cannot have attendance with decimals!')
      .required('This is a required field'),
    numberOfSprinters: Yup.number()
      .typeError('Please enter a valid number')
      .integer('You cannot have busses with decimals!')
      .required('This is a required field'),
    numberOfUrvans: Yup.number()
      .typeError('Please enter a valid number')
      .integer('You cannot have busses with decimals!')
      .required('This is a required field'),
    numberOfCars: Yup.number()
      .typeError('Please enter a valid number')
      .integer('You cannot have busses with decimals!')
      .required('This is a required field'),
    comments: Yup.string().when(
      ['attendance', 'numberOfSprinters', 'numberOfUrvans', 'numberOfCars'],
      {
        is: (
          attendance: number,
          numberOfSprinters: number,
          numberOfUrvans: number,
          numberOfCars: number
        ) => {
          if (
            attendance !== bussing?.leaderDeclaration ||
            numberOfSprinters !== bussing?.numberOfSprinters ||
            numberOfUrvans !== bussing?.numberOfUrvans ||
            numberOfCars !== bussing?.numberOfCars
          ) {
            return true
          }
        },
        then: Yup.string().required(
          'You need to explain if the numbers are different'
        ),
      }
    ),
  })

  const onSubmit = async (
    values: FormOptions,
    onSubmitProps: FormikHelpers<FormOptions>
  ) => {
    const { setSubmitting } = onSubmitProps
    setSubmitting(true)

    const res = await ConfirmBussingByAdmin({
      variables: {
        bussingRecordId: bussingRecordId,
        attendance: parseInt(values.attendance),
        numberOfSprinters: parseInt(values.numberOfSprinters),
        numberOfUrvans: parseInt(values.numberOfUrvans),
        comments: values.comments,
      },
    }).catch((error) =>
      throwErrorMsg('There was an error confirming bussing', error)
    )

    if (values.addMoreLater === 'true') {
      navigate(`/bacenta/bussing-details`)
      return
    }

    const bussingData = res?.data.ConfirmBussingByAdmin

    await Promise.all([
      SetBussingSupport({
        variables: {
          bussingRecordId: bussingRecordId,
        },
      }),
      RecordArrivalTime({
        variables: {
          bussingRecordId,
        },
      }),
    ]).catch((error) =>
      throwErrorMsg('There was an error setting bussing support', error)
    )

    if (!bussingData.bussingTopUp || bacenta?.stream_name === 'Anagkazo') {
      //if there is no value for the bussing top up
      navigate(`/bacenta/bussing-details`)
    }

    if (bussingData.arrivalTime) {
      //If arrival time has been logged then send bussing support
      try {
        const supportRes = await SendBussingSupport({
          variables: {
            bussingRecordId: bussingRecordId,
            stream_name: bacenta?.stream_name,
          },
        })

        alertMsg(
          'Money Successfully Sent to ' +
            supportRes.data.SendBussingSupport.momoNumber
        )
        setSubmitting(false)
        navigate(`/bacenta/bussing-details`)
      } catch (error: any) {
        setSubmitting(false)
        throwErrorMsg(error)
      }
    }
    navigate(`/bacenta/bussing-details`)
  }

  return (
    <ApolloWrapper data={data} loading={loading} error={error}>
      <>
        <Container>
          <PlaceholderCustom as="h3" loading={loading}>
            <HeadingPrimary>{`${bacenta?.__typename} Attendance Form`}</HeadingPrimary>
          </PlaceholderCustom>
          <PlaceholderCustom as="h6" loading={loading}>
            <HeadingSecondary>{`${bacenta?.name} ${bacenta?.__typename}`}</HeadingSecondary>
            <p>{`Picture Submitted by ${bussing?.created_by.fullName}`}</p>
          </PlaceholderCustom>
        </Container>

        <Container className="mb-2">
          <Card>
            <Card.Body>
              <div className="text-secondary">
                Total Bussing Cost:{' '}
                <span className="fw-bold text-info">
                  GHS {bussing?.bussingCost || 0}
                </span>
              </div>
            </Card.Body>
          </Card>
        </Container>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => (
            <Container>
              <Form>
                <Input
                  name="attendance"
                  label="Attendance (from Picture)*"
                  placeholder={bussing?.attendance.toString()}
                />

                <Textarea name="comments" label="Comments" />
                <Card border="warning" className="my-3">
                  <Card.Body>
                    <RadioButtons
                      name="addMoreLater"
                      options={[
                        {
                          key: 'Will Add More Vehicles',
                          value: 'true',
                        },
                        {
                          key: 'No More Vehicles Coming',
                          value: 'false',
                        },
                      ]}
                    />
                  </Card.Body>
                </Card>

                <Card className="text-center">
                  <Card.Body>
                    I can confirm that the above data is correct and I approve
                    the bussing top up for this bacenta
                  </Card.Body>
                  <Card.Footer>
                    <SubmitButton formik={formik} />
                  </Card.Footer>
                </Card>
              </Form>
            </Container>
          )}
        </Formik>
      </>
    </ApolloWrapper>
  )
}

export default FormAttendanceConfirmation
