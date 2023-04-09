import { useMutation, useQuery } from '@apollo/client'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import PlaceholderCustom from 'components/Placeholder'
import { ChurchContext } from 'contexts/ChurchContext'
import { ServiceContext } from 'contexts/ServiceContext'
import { Formik, Form, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import { useContext } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { DISPLAY_VEHICLE_PAYMENT_RECORDS } from './arrivalsQueries'
import { SEND_VEHICLE_SUPPORT } from './arrivalsMutation'
import { useNavigate } from 'react-router'
import SubmitButton from 'components/formik/SubmitButton'
import { alertMsg } from 'global-utils'
import { VehicleRecord } from './arrivals-types'
import Input from 'components/formik/Input'
import CloudinaryImage from 'components/CloudinaryImage'
import './Arrivals.css'
import { convertOutboundToString } from 'pages/directory/update/UpdateBusPaymentDetails'
import CurrencySpan from 'components/CurrencySpan'
import TableFromArrays from 'components/TableFromArrays/TableFromArrays'

type FormOptions = {
  momoNumber: string
  momoName: string
  vehicleTopUp: number
}

const FormPayVehicleRecord = () => {
  const navigate = useNavigate()
  const { bacentaId } = useContext(ChurchContext)
  const { vehicleRecordId } = useContext(ServiceContext)

  const { data, loading, error } = useQuery(DISPLAY_VEHICLE_PAYMENT_RECORDS, {
    variables: { vehicleRecordId, bacentaId },
  })
  const [SendVehicleSupport] = useMutation(SEND_VEHICLE_SUPPORT)

  const vehicle: VehicleRecord = data?.vehicleRecords[0]
  const bacenta = data?.bacentas[0]

  const initialValues: FormOptions = {
    momoName: vehicle?.momoName,
    momoNumber: vehicle?.momoNumber,
    vehicleTopUp: vehicle?.vehicleTopUp,
  }

  const validationSchema = Yup.object({
    attendance: Yup.number()
      .typeError('Please enter a valid number')
      .integer('You cannot have attendance with decimals!')
      .required('This is a required field'),
    vehicle: Yup.string().required('This is a required field'),
    comments: Yup.string().when(['attendance', 'vehicle'], {
      is: (attendance: number, vehicleType: string) => {
        if (
          attendance !== vehicle?.leaderDeclaration ||
          vehicleType !== vehicle?.vehicle
        ) {
          return true
        }
      },
      then: Yup.string().required(
        'You need to explain if the numbers are different'
      ),
    }),
  })

  const onSubmit = async (
    values: FormOptions,
    onSubmitProps: FormikHelpers<FormOptions>
  ) => {
    const { setSubmitting } = onSubmitProps
    setSubmitting(true)

    await SendVehicleSupport({
      variables: {
        vehicleRecordId: vehicleRecordId,
        momoNumber: values.momoNumber,
        momoName: values.momoName,
        vehicleTopUp: values.vehicleTopUp,
      },
    }).catch((error) =>
      alertMsg(`There was an error setting vehicle support ${error}`)
    )

    //If arrival time has been logged then send vehicle support
    try {
      const supportRes = await SendVehicleSupport({
        variables: {
          vehicleRecordId: vehicleRecordId,
          stream_name: bacenta?.stream_name,
        },
      })

      alertMsg(
        'Money Successfully Sent to ' +
          supportRes.data.SendVehicleSupport.momoNumber
      )
      setSubmitting(false)
      navigate(`/bacenta/vehicle-details`)
    } catch (error: any) {
      setSubmitting(false)
      alertMsg(error)
    }

    navigate(`/bacenta/vehicle-details`)
  }

  const detailRows = [
    ['Stream', bacenta?.stream.name],
    ['Council Pastor', bacenta?.constituency.council.leader.fullName],
    ['Council', bacenta?.constituency.council.name],
    ['Constituency', bacenta?.constituency.name],
    ['Attendance', `${vehicle?.attendance || 0}`],
    ['Vehicle Type', vehicle?.vehicle || 0],
    ['In and Out', convertOutboundToString(vehicle?.outbound) || 0],
    [
      'Top Up From Church',
      <CurrencySpan className="fw-bold good" number={vehicle?.vehicleTopUp} />,
    ],
  ]

  return (
    <ApolloWrapper data={data} loading={loading} error={error}>
      <>
        <Container>
          <PlaceholderCustom as="h3" loading={loading}>
            <HeadingPrimary>{`Vehicle Attendance Form`}</HeadingPrimary>
          </PlaceholderCustom>
        </Container>

        <Container className="my-4">
          <Card>
            <Card.Header>
              <Row>
                <Col className="col-auto">
                  <CloudinaryImage
                    src={bacenta?.leader.pictureUrl}
                    className="avatar"
                  />
                </Col>
                <Col>
                  <div>{`${bacenta?.name} Bacenta`}</div>
                  <div className="text-secondary">{`Leader: ${bacenta?.leader.fullName}`}</div>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
              <Row>
                <TableFromArrays tableArray={detailRows} loading={loading} />
              </Row>
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
                  name="vehicleTopUp"
                  label="Vehicle Top Up Amount*"
                  placeholder={vehicle?.vehicleTopUp.toString()}
                />

                <Input
                  name="momoNumber"
                  label="Momo Number*"
                  placeholder={vehicle?.momoNumber.toString()}
                />
                <Input
                  name="momoName"
                  label="Momo Name*"
                  placeholder={vehicle?.momoName.toString()}
                />

                <Card className="text-center mt-4">
                  <Card.Body>
                    I can confirm that the above data is correct and I approve
                    the vehicle top up for this bacenta
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

export default FormPayVehicleRecord
