import { ApolloError, useMutation, useQuery } from '@apollo/client'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { ServiceContext } from 'contexts/ServiceContext'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router'
import {
  DISPLAY_OFFERING_DETAILS,
  PAY_OFFERING_MUTATION,
  SEND_PAYMENT_OTP,
} from './bankingQueries'
import * as Yup from 'yup'
import { Form, Formik, FormikHelpers } from 'formik'
import { MOMO_NUM_REGEX } from 'global-utils'
import { MOBILE_NETWORK_OPTIONS } from 'pages/arrivals/arrivals-utils'
import SubmitButton from 'components/formik/SubmitButton'
import { Button, Col, Container, Modal, Row } from 'react-bootstrap'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import { parseDate } from 'jd-date-utils'
import { Fellowship } from 'global-types'
import usePopup from 'hooks/usePopup'
import ErrorPopup from 'components/Popup/ErrorPopup'
import Input from 'components/formik/Input'
import Select from 'components/formik/Select'
import useModal from 'hooks/useModal'
import './ConfirmPayment.css'

type PayOfferingProps = {
  church: Fellowship
  loading: boolean
  error: ApolloError | undefined
}

type FormOptions = {
  bankingDate: string
  income: number
  momoName: string
  mobileNetwork: string
  mobileNumber: string
}

const PayOffering = (props: PayOfferingProps) => {
  const { church } = props
  const { serviceRecordId } = useContext(ServiceContext)
  const { data, loading, error } = useQuery(DISPLAY_OFFERING_DETAILS, {
    variables: { serviceRecordId: serviceRecordId },
  })
  const [BankServiceOffering] = useMutation(PAY_OFFERING_MUTATION)
  const [SendPaymentOTP] = useMutation(SEND_PAYMENT_OTP)
  const navigate = useNavigate()
  const service = data?.serviceRecords[0]
  const { togglePopup, isOpen } = usePopup()
  const { show, handleClose, handleShow } = useModal()
  const [errorMessage, setErrorMessage] = useState('')
  const [otp, setOtp] = useState('')
  const [otpSent, setOtpSent] = useState(false)

  const initialValues = {
    bankingDate: new Date().toISOString().slice(0, 10),
    income: service?.income,
    momoName: '',
    mobileNetwork: '',
    mobileNumber: '',
  }
  const validationSchema = Yup.object({
    mobileNumber: Yup.string().matches(
      MOMO_NUM_REGEX,
      `Enter a valid MoMo Number without spaces. eg. (02XXXXXXXX)`
    ),
    momoName: Yup.string().when('mobileNumber', {
      is: (mobileNumber: string) => mobileNumber && mobileNumber.length > 0,
      then: Yup.string().required('Please enter the Momo Name'),
    }),
    mobileNetwork: Yup.string().when('mobileNumber', {
      is: (mobileNumber: string) => mobileNumber && mobileNumber.length > 0,
      then: Yup.string().required('Please enter the Mobile Network'),
    }),
  })

  const onSubmit = async (
    values: FormOptions,
    onSubmitProps: FormikHelpers<FormOptions>
  ) => {
    const { setSubmitting } = onSubmitProps

    setSubmitting(true)
    try {
      const paymentRes = await BankServiceOffering({
        variables: {
          serviceRecordId: serviceRecordId,
          stream_name: service.stream_name,
          mobileNetwork: values.mobileNetwork,
          mobileNumber: values.mobileNumber,
          momoName: values.momoName,
        },
      })

      if (paymentRes.data.transactionStatus === 'send OTP') {
        handleShow()
      } else {
        setSubmitting(false)
        navigate('/self-banking/confirm-payment')
      }
    } catch (error: any) {
      setErrorMessage(error.message)
      togglePopup()
    }
  }

  return (
    <div>
      {isOpen && (
        <ErrorPopup
          errorMessage={errorMessage}
          togglePopup={togglePopup}
          link={`/services/${church?.__typename.toLowerCase()}/self-banking`}
        />
      )}

      <Modal show={!show} onHide={handleClose}>
        <Modal.Body>
          <div className="p-4">
            A registration token has just been sent to your phone via text
            message. Please enter it here 👇🏾
          </div>
          <input
            onChange={(e) => setOtp(e.target.value)}
            className="form-control bg-dark"
          ></input>
          <div className="text-center pt-4">
            <Button
              disabled={otpSent}
              onClick={() => {
                setOtpSent(true)
                SendPaymentOTP({
                  variables: {
                    serviceRecordId: service.id,
                    streamName: service.stream_name,
                    reference: service?.transactionReference,
                    otp: otp,
                  },
                }).then(() => navigate('/self-banking/confirm-payment'))
              }}
            >
              {otpSent ? 'Sending' : 'Submit OTP'}
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      <ApolloWrapper data={data} loading={loading} error={error}>
        <Container>
          <HeadingPrimary loading={loading}>
            Offering Self-Banking
          </HeadingPrimary>
          <HeadingSecondary loading={loading}>
            {church?.name} {church?.__typename}
          </HeadingSecondary>
          {church?.bankingCode && (
            <div>{`Banking Code: ${church.bankingCode}`} </div>
          )}

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(formik) => (
              <Form>
                <Row className="row-cols-1 row-cols-md-2 mt-2">
                  <Col className="mb-2">
                    <small className="form-text label">Date of Service</small>
                    <HeadingPrimary>
                      {parseDate(service?.serviceDate.date)}
                    </HeadingPrimary>

                    <small className="form-text label">Income</small>
                    <div className="fw-bold">{service?.income} GHS</div>
                    <Select
                      name="mobileNetwork"
                      label="Mobile Network"
                      options={MOBILE_NETWORK_OPTIONS}
                    />
                    <Input name="mobileNumber" label="MoMo Number" />
                    <Input name="momoName" label="MoMo Name" />
                  </Col>
                </Row>
                <div className="d-flex justify-content-center">
                  <SubmitButton formik={formik}>
                    <>Make Payment</>
                  </SubmitButton>
                </div>
              </Form>
            )}
          </Formik>
        </Container>
      </ApolloWrapper>
    </div>
  )
}

export default PayOffering
