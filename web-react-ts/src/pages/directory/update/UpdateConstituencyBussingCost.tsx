import { useMutation, useQuery } from '@apollo/client'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { ChurchContext } from 'contexts/ChurchContext'
import { Form, Formik, FormikHelpers } from 'formik'
import { useContext } from 'react'
import * as Yup from 'yup'
import { Col, Container, Row } from 'react-bootstrap'
import {
  DISPLAY_CONSTITUENCY_BUSSING_DETAILS,
  UPDATE_CONSTITUENCY_BUSSING_COST,
} from './UpdateBacentaArrivals'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import SubmitButton from 'components/formik/SubmitButton'
import { useNavigate } from 'react-router'
import Input from 'components/formik/Input'

type FormOptions = {
  constituencyId: string
  sprinterCost: string
  urvanCost: string
}

const UpdateConstituencyBussingCost = () => {
  const { constituencyId } = useContext(ChurchContext)
  const { data, loading, error } = useQuery(
    DISPLAY_CONSTITUENCY_BUSSING_DETAILS,
    { variables: { id: constituencyId } }
  )

  const [UpdateConstituencyBussingCost] = useMutation(
    UPDATE_CONSTITUENCY_BUSSING_COST
  )
  const navigate = useNavigate()
  const constituency = data?.constituencies[0]
  const initialValues: FormOptions = {
    constituencyId: constituencyId,
    sprinterCost: constituency?.sprinterCost || 0,
    urvanCost: constituency?.urvanCost || 0,
  }

  const validationSchema = Yup.object({
    sprinterCost: Yup.string().required('This is a required field'),
    urvanCost: Yup.string().required('This is a required field'),
  })

  const onSubmit = async (
    values: FormOptions,
    onSubmitProps: FormikHelpers<FormOptions>
  ) => {
    await UpdateConstituencyBussingCost({
      variables: {
        constituencyId,
        sprinterCost: parseFloat(values.sprinterCost),
        urvanCost: parseFloat(values.urvanCost),
      },
    })
    onSubmitProps.resetForm()
    navigate('/constituency/displaydetails')
  }

  return (
    <ApolloWrapper data={data} loading={loading} error={error}>
      <Container>
        <HeadingPrimary>Change Constituency Bussing Zone</HeadingPrimary>
        <HeadingSecondary>{constituency?.name} Constituency</HeadingSecondary>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          validateOnMount
        >
          {(formik) => (
            <Form>
              <Row className="form-row">
                <Col>
                  <Input name="sprinterCost" label="Sprinter Cost" />
                  <Input name="urvanCost" label="Urvan Cost" />
                </Col>
              </Row>
              <div className="mt-4">
                <SubmitButton formik={formik}>
                  <>Update</>
                </SubmitButton>
              </div>
            </Form>
          )}
        </Formik>
      </Container>
    </ApolloWrapper>
  )
}

export default UpdateConstituencyBussingCost
