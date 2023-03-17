import SubmitButton from 'components/formik/SubmitButton'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import { Form, Formik, FormikHelpers } from 'formik'
import { useMutation, useQuery } from '@apollo/client'
import { useContext, useEffect } from 'react'
import * as Yup from 'yup'
import { Col, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import { ChurchContext } from 'contexts/ChurchContext'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { isToday } from 'jd-date-utils'
import { alertMsg } from 'global-utils'
import Input from 'components/formik/Input'
import ImageUpload from 'components/formik/ImageUpload'
import { BacentaWithArrivals, BussingRecord } from './arrivals-types'
import { beforeMobilisationDeadline } from './arrivals-utils'
import { UPLOAD_MOBILISATION_PICTURE } from './arrivalsMutation'
import { BACENTA_ARRIVALS } from './arrivalsQueries'

type FormOptions = {
  serviceDate: string
  mobilisationPicture: string
}

const FormMobilisationSubmission = () => {
  const navigate = useNavigate()
  const { bacentaId, clickCard } = useContext(ChurchContext)
  const initialValues: FormOptions = {
    serviceDate: new Date().toISOString().slice(0, 10),
    mobilisationPicture: '',
  }

  const { data, loading, error } = useQuery(BACENTA_ARRIVALS, {
    variables: { id: bacentaId },
  })
  const [UploadMobilisationPicture] = useMutation(UPLOAD_MOBILISATION_PICTURE)

  const validationSchema = Yup.object({
    serviceDate: Yup.date()
      .max(new Date(), 'Service could not possibly have happened after today')
      .required('Date is a required field'),
    mobilisationPicture: Yup.string().required('You must upload a picture'),
  })

  const onSubmit = (
    values: FormOptions,
    onSubmitProps: FormikHelpers<FormOptions>
  ) => {
    onSubmitProps.setSubmitting(true)
    UploadMobilisationPicture({
      variables: {
        bacentaId,
        serviceDate: values.serviceDate,
        mobilisationPicture: values.mobilisationPicture,
      },
    })
      .then((res) => {
        clickCard(res.data.UploadMobilisationPicture)
        onSubmitProps.resetForm()
        onSubmitProps.setSubmitting(false)
        navigate(`/bacenta/bussing-details`)
      })
      .catch((err) => {
        alertMsg(err)
        onSubmitProps.setSubmitting(false)
      })
  }

  useEffect(() => {
    const bacenta: BacentaWithArrivals = data?.bacentas[0]
    const bussing = bacenta?.bussing.find((bussingData: BussingRecord) =>
      isToday(bussingData.serviceDate.date.toString())
    )

    if (data && !beforeMobilisationDeadline(data?.bacentas[0], bussing)) {
      navigate('/arrivals/bacenta')
    }
  }, [data?.bacentas, navigate, data])

  return (
    <ApolloWrapper data={data} loading={loading} error={error}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        validateOnMount
      >
        {(formik) => (
          <Container>
            <HeadingPrimary loading={loading}>
              Upload Pre-Mobilisation Picture
            </HeadingPrimary>
            <HeadingSecondary loading={loading}>
              {data?.bacentas[0]?.name} Bacenta
            </HeadingSecondary>
            <HeadingSecondary loading={loading}>
              Code of The Day:{' '}
            </HeadingSecondary>
            <HeadingPrimary className="fw-bold">
              {data?.bacentas[0]?.arrivalsCodeOfTheDay}
            </HeadingPrimary>

            <Form>
              <Row className="row-cols-1 mt-2">
                <Col className="mb-2">
                  <small className="form-text label">
                    Date of Service*
                    <i className="text-secondary">(Day/Month/Year)</i>
                  </small>
                  <Input
                    name="serviceDate"
                    type="date"
                    placeholder="dd/mm/yyyy"
                    aria-describedby="dateofservice"
                  />
                  <ImageUpload
                    name="mobilisationPicture"
                    uploadPreset={
                      import.meta.env.VITE_CLOUDINARY_BUS_MOBILISATION
                    }
                    error={formik.errors.mobilisationPicture}
                    placeholder="Upload Mobilisation Picture"
                    setFieldValue={formik.setFieldValue}
                    aria-describedby="ImageUpload"
                  />
                </Col>
                <Col>
                  <div className="d-grid gap-2">
                    <SubmitButton formik={formik} />
                  </div>
                </Col>
              </Row>
            </Form>
          </Container>
        )}
      </Formik>
    </ApolloWrapper>
  )
}

export default FormMobilisationSubmission
