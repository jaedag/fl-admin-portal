import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import { ServiceContext } from 'contexts/ServiceContext'
import { Formik, Form, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import React, { useContext, useState } from 'react'
import { Col, Container, Row, Button } from 'react-bootstrap'
import {
  BANKING_SLIP_SUBMISSION,
  FELLOWSHIP_SERVICE_RECORDS,
} from '../../ServicesQueries'
import { MemberContext } from 'contexts/MemberContext'
import { useMutation, useQuery } from '@apollo/client'
import HeadingSecondary from 'components/HeadingSecondary'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { useNavigate } from 'react-router'
import { ChurchContext } from 'contexts/ChurchContext'
import usePopup from 'hooks/usePopup'
import ErrorPopup from 'components/Popup/ErrorPopup'
import ImageUpload from 'components/formik/ImageUpload'

type FormOptions = {
  bankingSlip: string
}

const FellowshipBankingSlipSubmission = () => {
  const { serviceRecordId } = useContext(ServiceContext)
  const { theme } = useContext(MemberContext)
  const { clickCard } = useContext(ChurchContext)
  const navigate = useNavigate()
  const { togglePopup, isOpen } = usePopup()
  const [errorMessage, setErrorMessage] = useState('')

  const { data, loading, error } = useQuery(FELLOWSHIP_SERVICE_RECORDS, {
    variables: { serviceId: serviceRecordId },
  })
  const fellowship = data?.serviceRecords[0]?.serviceLog?.fellowship[0]

  const initialValues: FormOptions = {
    bankingSlip: '',
  }
  const [SubmitBankingSlip] = useMutation(BANKING_SLIP_SUBMISSION)

  const validationSchema = Yup.object({
    bankingSlip: Yup.string().required('You must upload a banking slip'),
  })

  const onSubmit = async (
    values: FormOptions,
    onSubmitProps: FormikHelpers<FormOptions>
  ) => {
    onSubmitProps.setSubmitting(true)
    try {
      await SubmitBankingSlip({
        variables: {
          serviceRecordId: serviceRecordId,
          bankingSlip: values.bankingSlip,
        },
      })
      onSubmitProps.setSubmitting(false)
      onSubmitProps.resetForm()
      clickCard(fellowship)
      navigate(`/fellowship/service-details`)
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
          link="/services/fellowship/banking-slips"
        />
      )}

      <ApolloWrapper loading={loading} error={error} data={data && fellowship}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          validateOnMount={true}
        >
          {(formik) => (
            <Container>
              <HeadingPrimary>Banking Slip Submission</HeadingPrimary>
              <HeadingSecondary>{fellowship?.name}</HeadingSecondary>
              <p>Banking Code: {fellowship?.bankingCode}</p>
              <p>Expected Income: {data.serviceRecords[0].income}</p>
              <Form>
                <Row className="row-cols-1 row-cols-md-2 mt-5">
                  <Col className="mb-2">
                    <ImageUpload
                      label="Upload a Picture of Your Banking Slip"
                      name="bankingSlip"
                      uploadPreset={process.env.REACT_APP_CLOUDINARY_BANKING}
                      placeholder="Choose"
                      setFieldValue={formik.setFieldValue}
                      aria-describedby="UploadBankingSlip"
                    />
                  </Col>

                  <div className="d-flex justify-content-center">
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
                </Row>
              </Form>
            </Container>
          )}
        </Formik>
      </ApolloWrapper>
    </div>
  )
}

export default FellowshipBankingSlipSubmission
