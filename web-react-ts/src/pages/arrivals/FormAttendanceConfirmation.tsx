import { useMutation, useQuery } from '@apollo/client'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import PlaceholderCustom from 'components/Placeholder'
import { ChurchContext } from 'contexts/ChurchContext'
import { ServiceContext } from 'contexts/ServiceContext'
import { Formik, Form, FormikHelpers } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup'
import { useContext } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { DISPLAY_BUSSING_RECORDS } from './arrivalsQueries'
import {
  CONFIRM_BUSSING_BY_ADMIN,
  SEND_BUSSING_SUPPORT,
  SET_BUSSING_SUPPORT,
} from './arrivalsMutation'
import { useNavigate } from 'react-router'
import FormikControl from 'components/formik-components/FormikControl'
import SubmitButton from 'components/formik-components/SubmitButton'
import CloudinaryImage from 'components/CloudinaryImage'
import { alertMsg, throwErrorMsg } from 'global-utils'
import Popup from 'components/Popup/Popup'
import usePopup from 'hooks/usePopup'
import { BacentaWithArrivals, BussingRecord } from './arrivals-types'

type FormOptions = {
  attendance: string
  numberOfSprinters: string
  numberOfUrvans: string
  comments: string
}

const FormAttendanceConfirmation = () => {
  const navigate = useNavigate()
  const { bacentaId } = useContext(ChurchContext)
  const { bussingRecordId } = useContext(ServiceContext)
  const { isOpen, togglePopup } = usePopup()
  const [picturePopup, setPicturePopup] = useState('')

  const { data, loading, error } = useQuery(DISPLAY_BUSSING_RECORDS, {
    variables: { bussingRecordId: bussingRecordId, bacentaId: bacentaId },
  })
  const [ConfirmBussingByAdmin] = useMutation(CONFIRM_BUSSING_BY_ADMIN)
  const [SetBussingSupport] = useMutation(SET_BUSSING_SUPPORT)
  const [SendBussingSupport] = useMutation(SEND_BUSSING_SUPPORT)

  const bussing: BussingRecord = data?.bussingRecords[0]
  const bacenta: BacentaWithArrivals = data?.bacentas[0]
  const initialValues: FormOptions = {
    attendance: '',
    numberOfSprinters: '0',
    numberOfUrvans: '0',
    comments: '',
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
    comments: Yup.string().when('attendance', {
      is: (attendance: number) => attendance !== bussing?.leaderDeclaration,
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

    const bussingData = res?.data.ConfirmBussingByAdmin

    await SetBussingSupport({
      variables: {
        bussingRecordId: bussingRecordId,
      },
    }).catch((error) =>
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

        <div className="text-center">
          <h6>Bussing Pictures</h6>
          {isOpen && (
            <Popup handleClose={togglePopup}>
              <CloudinaryImage
                src={picturePopup}
                className="full-width"
                size="fullWidth"
              />
            </Popup>
          )}
          <div className="container card-button-row">
            <table>
              <tbody>
                <tr>
                  {bussing?.bussingPictures.map((picture, index: number) => (
                    <td
                      onClick={() => {
                        setPicturePopup(picture)
                        togglePopup()
                      }}
                      key={index}
                    >
                      <CloudinaryImage
                        key={index}
                        src={picture}
                        className="report-picture"
                        size="respond"
                      />
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
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
                <FormikControl
                  control="input"
                  name="attendance"
                  label="Attendance (from Picture)*"
                  placeholder={bussing?.attendance}
                />
                <Row>
                  <Col>
                    <FormikControl
                      control="input"
                      name="numberOfSprinters"
                      label="Number of Sprinters *"
                    />
                  </Col>
                  <Col>
                    <FormikControl
                      control="input"
                      name="numberOfUrvans"
                      label="Number of Urvans *"
                    />
                  </Col>
                </Row>

                <FormikControl
                  control="textarea"
                  name="comments"
                  label="Comments"
                />
                <Card className="text-center mt-3 ">
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
