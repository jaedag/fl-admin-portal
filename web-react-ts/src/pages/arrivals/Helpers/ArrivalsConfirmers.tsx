import { useMutation, useQuery } from '@apollo/client'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import MemberDisplayCard from 'components/card/MemberDisplayCard'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import { ChurchContext } from 'contexts/ChurchContext'
import React, { useContext, useState } from 'react'
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap'
import * as Yup from 'yup'
import { Form, Formik, FormikHelpers } from 'formik'
import {
  MAKE_STREAMARRIVALS_CONFIRMER,
  REMOVE_STREAMARRIVALS_CONFIRMER,
  STREAM_ARRIVALS_HELPERS,
} from './ArrivalsHelpersGQL'
import { alertMsg, throwErrorMsg } from 'global-utils'
import Popup from 'components/Popup/Popup'
import SubmitButton from 'components/formik-components/SubmitButton'
import NoData from '../CompNoData'
import usePopup from 'hooks/usePopup'
import { StreamWithArrivals } from '../arrivals-types'
import SearchMember from 'components/formik-components/SearchMember'

type FormOptions = {
  helperName: string
  helperSelect: string
}

const ArrivalsConfirmers = () => {
  const { streamId } = useContext(ChurchContext)
  const { isOpen, togglePopup } = usePopup()
  const [submitting, setSubmitting] = useState(false)

  const { data, loading, error } = useQuery(STREAM_ARRIVALS_HELPERS, {
    variables: { id: streamId },
  })
  const stream: StreamWithArrivals = data?.streams[0]

  const [MakeStreamArrivalsConfirmer] = useMutation(
    MAKE_STREAMARRIVALS_CONFIRMER,
    {
      refetchQueries: [
        {
          query: STREAM_ARRIVALS_HELPERS,
          variables: { id: streamId },
        },
      ],
    }
  )

  const [RemoveStreamArrivalsConfirmer] = useMutation(
    REMOVE_STREAMARRIVALS_CONFIRMER,
    {
      refetchQueries: [
        {
          query: STREAM_ARRIVALS_HELPERS,
          variables: { id: streamId },
        },
      ],
    }
  )

  const initialValues: FormOptions = {
    helperName: '',
    helperSelect: '',
  }

  const validationSchema = Yup.object({
    helperSelect: Yup.string().required(
      'Please select a helper from the dropdown'
    ),
  })

  const onSubmit = async (
    values: FormOptions,
    onSubmitProps: FormikHelpers<FormOptions>
  ) => {
    onSubmitProps.setSubmitting(true)
    try {
      await MakeStreamArrivalsConfirmer({
        variables: {
          streamId: streamId,
          arrivalsConfirmerId: values.helperSelect,
        },
      })

      togglePopup()
      onSubmitProps.setSubmitting(false)
      alert('Arrivals Confirmer has been added successfully')
    } catch (e: any) {
      onSubmitProps.setSubmitting(false)
      throwErrorMsg(e)
    }
  }

  return (
    <ApolloWrapper data={data} loading={loading} error={error}>
      <Container>
        <HeadingPrimary>{`${stream?.name} Arrivals Confirmers`}</HeadingPrimary>
        {isOpen && (
          <Popup handleClose={togglePopup}>
            <b>Add Arrivals Helper</b>
            <p>Please enter the name of the new arrivals rep</p>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {(formik) => (
                <Form>
                  <Row className="form-row">
                    <Col>
                      <SearchMember
                        name="helperSelect"
                        initialValue={initialValues?.helperName}
                        placeholder="Select a Name"
                        setFieldValue={formik.setFieldValue}
                        aria-describedby="Member Search"
                        error={formik.errors.helperSelect}
                      />
                    </Col>
                  </Row>

                  <SubmitButton formik={formik} />
                </Form>
              )}
            </Formik>
          </Popup>
        )}

        <Button onClick={() => togglePopup()}>Add Helpers</Button>

        {stream?.arrivalsConfirmers.map((confirmer, i: number) => (
          <div key={i}>
            <MemberDisplayCard key={i} member={confirmer} />
            <Button
              disabled={submitting}
              onClick={async () => {
                setSubmitting(true)
                const confirmBox = window.confirm(
                  `Do you want to delete ${confirmer.fullName} as a confirmer`
                )

                if (confirmBox === true) {
                  try {
                    await RemoveStreamArrivalsConfirmer({
                      variables: {
                        streamId: streamId,
                        arrivalsConfirmerId: confirmer.id,
                      },
                    })
                    setSubmitting(false)
                    alertMsg(`${confirmer.fullName} Deleted Successfully`)
                  } catch (error: any) {
                    throwErrorMsg(error)
                  }
                }
              }}
            >
              {submitting ? (
                <>
                  <Spinner animation="grow" size="sm" />
                  <span> Submitting</span>
                </>
              ) : (
                'Delete'
              )}
            </Button>
          </div>
        ))}

        {!stream?.arrivalsConfirmers.length && (
          <NoData text="There are no arrivals helpers" />
        )}
      </Container>
    </ApolloWrapper>
  )
}

export default ArrivalsConfirmers
