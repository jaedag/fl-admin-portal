import { useLazyQuery, useQuery } from '@apollo/client'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import ChurchGraph from 'components/ChurchGraph/ChurchGraph'
import Input from 'components/formik/Input'
import SubmitButton from 'components/formik/SubmitButton'
import HeadingSecondary from 'components/HeadingSecondary'
import { ChurchContext } from 'contexts/ChurchContext'
import { Form, Formik, FormikHelpers } from 'formik'
import { getServiceGraphData } from 'pages/services/graphs/graphs-utils'
import React, { useContext, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Check2Circle } from 'react-bootstrap-icons'
import {
  BACENTA_SWOLLEN_DETAILS,
  BACENTA_SWOLLEN_SUNDAY_GRAPHS,
} from '../SwollenSundayQueries'
import SwollenSundayTrends from '../SwollenSundayTrends'
import * as Yup from 'yup'

type FormOptions = {
  fromDate: string
  toDate: string
}

const BacentaSwollenSundayTrends = () => {
  const { bacentaId } = useContext(ChurchContext)

  const [bussing] = useState(true)

  const initialValues: FormOptions = {
    fromDate: '2022-01-01',
    toDate: new Date().toISOString().slice(0, 10),
  }

  const [churchData, setChurchData] = useState<any[] | undefined>([])
  const {
    data: bacentaData,
    loading: bacentaLoading,
    error: bacentaError,
  } = useQuery(BACENTA_SWOLLEN_DETAILS, {
    variables: {
      bacentaId,
    },
  })

  const [bacentaSwollenSundayGraph, { loading }] = useLazyQuery(
    BACENTA_SWOLLEN_SUNDAY_GRAPHS,
    {
      onCompleted: (data) => {
        if (!setChurchData) return
        setChurchData(getServiceGraphData(data?.bacentas[0], 'swellBussing'))
      },
      fetchPolicy: 'cache-and-network',
    }
  )

  const onSubmit = (
    values: FormOptions,
    onSubmitProps: FormikHelpers<FormOptions>
  ) => {
    onSubmitProps.setSubmitting(true)

    bacentaSwollenSundayGraph({
      variables: {
        bacentaId,
        startDate: values.fromDate,
        endDate: values.toDate,
      },
    })
    onSubmitProps.setSubmitting(false)
  }

  const church = bacentaData?.bacentas[0]
  const churchBelow = [
    {
      name: 'Fellowships',
      number: church?.fellowshipCount,
    },
  ]

  const validationSchema = Yup.object({
    fromDate: Yup.date().required('From Date is a required field'),
    toDate: Yup.date()
      .required('To Date is a required field')
      .when(
        'fromDate',
        (fromDate, Yup) =>
          fromDate && Yup.min(fromDate, 'To Date cannot be before From Date')
      ),
  })

  return (
    <ApolloWrapper
      loading={bacentaLoading}
      error={bacentaError}
      data={bacentaData}
    >
      <Container>
        <h6>{church?.name} Bacenta</h6>
        <HeadingSecondary>Swollen Sunday</HeadingSecondary>
        <SwollenSundayTrends churchBelow={churchBelow} church={church} />

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          validateOnMount
        >
          {(formik) => (
            <>
              <div className="text-center mt-3">
                <select
                  className="dropdown-quick-facts"
                  name="dropdown"
                  id="dropdown"
                >
                  <option>Bussing</option>
                </select>
              </div>
              <Form>
                <div className="mt-3">
                  <Row className="align-items-center gx-1 justify-content-between ">
                    <Col className="d-inline-block" xs={5}>
                      <Input
                        name="fromDate"
                        type="date"
                        placeholder="dd/mm/yyyy"
                        aria-describedby="fromDate"
                      />
                    </Col>
                    <Col className="d-inline-block" xs={5}>
                      <Input
                        name="toDate"
                        type="date"
                        placeholder="dd/mm/yyyy"
                        aria-describedby="toDate"
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
              <div>
                <ChurchGraph
                  loading={loading}
                  stat1="attendance"
                  stat2="target"
                  churchData={churchData || []}
                  church={church?.__typename?.toLowerCase()}
                  bussing={bussing}
                  income={true}
                />
              </div>
            </>
          )}
        </Formik>
      </Container>
    </ApolloWrapper>
  )
}

export default BacentaSwollenSundayTrends
