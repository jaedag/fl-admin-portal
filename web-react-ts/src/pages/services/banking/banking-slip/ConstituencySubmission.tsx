import FormikControl from 'components/formik-components/FormikControl'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import { ServiceContext } from 'contexts/ServiceContext'
import { Formik, Form, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import React, { useContext } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import {
  BANKING_SLIP_SUBMISSION,
  CONSTITUENCY_SERVICE_RECORDS,
} from '../../ServicesQueries'
import { useMutation, useQuery } from '@apollo/client'
import HeadingSecondary from 'components/HeadingSecondary'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { useNavigate } from 'react-router'
import { getHumanReadableDate } from 'jd-date-utils'
import { throwErrorMsg } from 'global-utils'
import SubmitButton from 'components/formik-components/SubmitButton'

type FormOptions = {
  bankingSlip: string
}

const ConstituencyBankingSlipSubmission = () => {
  const { serviceRecordId } = useContext(ServiceContext)
  const navigate = useNavigate()

  const { data, loading, error } = useQuery(CONSTITUENCY_SERVICE_RECORDS, {
    variables: { serviceId: serviceRecordId },
  })
  const constituency = data?.serviceRecords[0]?.serviceLog?.constituency[0]

  const initialValues = {
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

      navigate(`/constituency/service-details`)
    } catch (error: any) {
      throwErrorMsg(error)
    }
  }

  return (
    <ApolloWrapper loading={loading} error={error} data={data && constituency}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        validateOnMount={true}
      >
        {(formik) => (
          <Container>
            <HeadingPrimary>Banking Slip Submission</HeadingPrimary>
            <HeadingSecondary>{constituency?.name}</HeadingSecondary>
            <p>
              Date of Joint Service Code:{' '}
              {getHumanReadableDate(
                data.serviceRecords[0].serviceDate.date,
                true
              )}
            </p>
            <p>Expected Income: {data.serviceRecords[0].income}</p>
            <Form>
              <Row className="row-cols-1 row-cols-md-2 mt-5">
                <Col className="mb-2">
                  <FormikControl
                    label="Upload a Picture of Your Banking Slip"
                    control="imageUpload"
                    name="bankingSlip"
                    error={formik.errors.bankingSlip}
                    uploadPreset={process.env.REACT_APP_CLOUDINARY_BANKING}
                    placeholder="Choose"
                    setFieldValue={formik.setFieldValue}
                    aria-describedby="UploadBankingSlip"
                  />
                  <SubmitButton formik={formik} />
                </Col>
              </Row>
            </Form>
          </Container>
        )}
      </Formik>
    </ApolloWrapper>
  )
}

export default ConstituencyBankingSlipSubmission
