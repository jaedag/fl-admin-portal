import { useMutation, useQuery } from '@apollo/client'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import Select from 'components/formik/Select'
import { ChurchContext } from 'contexts/ChurchContext'
import { Form, Formik, FormikHelpers } from 'formik'
import { FormikSelectOptions } from 'global-utils'
import { BusZone } from 'pages/arrivals/arrivals-types'
import React, { useContext } from 'react'
import * as Yup from 'yup'
import { Col, Container, Row } from 'react-bootstrap'
import {
  DISPLAY_CONSTITUENCY_BUSSING_DETAILS,
  UPDATE_CONSTITUENCY_ZONE,
} from './UpdateBacentaArrivals'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import SubmitButton from 'components/formik/SubmitButton'
import { useNavigate } from 'react-router'

type FormOptions = {
  zone: string
  constituencyId: string
}

const UpdateConstituencyZone = () => {
  const { constituencyId } = useContext(ChurchContext)
  const { data, loading, error } = useQuery(
    DISPLAY_CONSTITUENCY_BUSSING_DETAILS,
    { variables: { id: constituencyId } }
  )

  const [UpdateConstituencyZone] = useMutation(UPDATE_CONSTITUENCY_ZONE)
  const navigate = useNavigate()
  const constituency = data?.constituencies[0]
  const initialValues: FormOptions = {
    constituencyId: constituencyId,
    zone: constituency?.zone?.number ?? '',
  }

  const validationSchema = Yup.object({
    zone: Yup.string().required('This is a required field'),
  })

  const onSubmit = async (
    values: FormOptions,
    onSubmitProps: FormikHelpers<FormOptions>
  ) => {
    await UpdateConstituencyZone({
      variables: {
        constituencyId,
        zone: parseInt(values.zone),
      },
    })
    onSubmitProps.resetForm()
    navigate('/constituency/displaydetails')
  }

  const zone: FormikSelectOptions = data?.busZones.map((zone: BusZone) => {
    return {
      value: zone.number,
      key: `Zn ${zone.number} - Sprinter - ${zone.sprinterCost}, Urvan - ${zone.urvanCost}`,
    }
  })

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
                  <Select
                    options={zone}
                    name="zone"
                    label="Select a Zone"
                    defaultOption="Select Zone"
                  />
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

export default UpdateConstituencyZone
