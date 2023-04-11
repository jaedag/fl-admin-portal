import { useMutation, useQuery } from '@apollo/client'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import MemberDisplayCard from 'components/card/MemberDisplayCard'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import { ChurchContext } from 'contexts/ChurchContext'
import { FunctionReturnsVoid, Member, Stream } from 'global-types'
import React, { useContext, useState } from 'react'
import { Button, Col, Container, Modal, Row, Spinner } from 'react-bootstrap'
import {
  MAKE_STREAM_ARRIVALSPAYER,
  REMOVE_STREAM_ARRIVALSPAYER,
  STREAM_ARRIVALSPAYERS,
} from './ArrivalsHelpersGQL'
import './ArrivalsHelpers.css'
import * as Yup from 'yup'
import { Form, Formik, FormikHelpers } from 'formik'
import { alertMsg, throwToSentry } from 'global-utils'
import NoDataComponent from 'pages/arrivals/CompNoData'
import SearchMember from 'components/formik/SearchMember'
import ModalSubmitButton from 'pages/services/banking/anagkazo/ModalSubmitButton'

interface StreamWithArrivalsPayers extends Stream {
  arrivalsPayers: Member[]
  activeBacentaCount: number
}

type FormOptions = {
  arrivalsPayerName: string
  arrivalsPayerSelect: string
}

const ArrivalsPayerSelect = () => {
  const { streamId } = useContext(ChurchContext)
  const { data, loading, error } = useQuery(STREAM_ARRIVALSPAYERS, {
    variables: { id: streamId },
  })
  const [submitting, setSubmitting] = useState(false)
  const [show, setShow] = useState(false)
  const handleOpen: FunctionReturnsVoid = () => setShow(true)
  const handleClose: FunctionReturnsVoid = () => setShow(false)

  const stream: StreamWithArrivalsPayers = data?.streams[0]

  const [MakeStreamArrivalsPayer] = useMutation(MAKE_STREAM_ARRIVALSPAYER, {
    refetchQueries: [
      {
        query: STREAM_ARRIVALSPAYERS,
        variables: { id: streamId },
      },
    ],
  })

  const [RemoveStreamArrivalsPayer] = useMutation(REMOVE_STREAM_ARRIVALSPAYER, {
    refetchQueries: [
      {
        query: STREAM_ARRIVALSPAYERS,
        variables: { id: streamId },
      },
    ],
  })

  const initialValues: FormOptions = {
    arrivalsPayerName: '',
    arrivalsPayerSelect: '',
  }

  const validationSchema = Yup.object({
    arrivalsPayerSelect: Yup.string().required(
      'Please select a arrivals payment team member from the dropdown'
    ),
  })

  const onSubmit = async (
    values: FormOptions,
    onSubmitProps: FormikHelpers<FormOptions>
  ) => {
    onSubmitProps.setSubmitting(true)
    try {
      await MakeStreamArrivalsPayer({
        variables: {
          streamId: streamId,
          arrivalsPayerId: values.arrivalsPayerSelect,
        },
      })

      handleClose()
      onSubmitProps.setSubmitting(false)
      alert('Arrivals Payment Team Member has been added successfully!')
    } catch (e: any) {
      onSubmitProps.setSubmitting(false)
      throwToSentry(e)
    }
    onSubmitProps.setSubmitting(false)
    return
  }

  return (
    <ApolloWrapper data={data} loading={loading} error={error}>
      <Container>
        <HeadingPrimary>{`Select ${stream?.name} Arrivals Payment Team Members`}</HeadingPrimary>
        <HeadingSecondary>
          Use the buttons below to choose Arrivals Payment Team Members
        </HeadingSecondary>
        <div>{`Number of Active Bacentas: ${stream?.activeBacentaCount}`}</div>

        <Modal
          contentClassName="dark"
          show={show}
          onHide={handleClose}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Choose an Arrivals Payment Team Member</Modal.Title>
          </Modal.Header>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(formik) => (
              <Form>
                <Modal.Body>
                  <Row className="form-row">
                    <Col>
                      <SearchMember
                        name="arrivalsPayerSelect"
                        initialValue={initialValues?.arrivalsPayerName}
                        placeholder="Select a Name"
                        setFieldValue={formik.setFieldValue}
                        aria-describedby="Member Search"
                        error={formik.errors.arrivalsPayerSelect}
                      />
                    </Col>
                  </Row>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <ModalSubmitButton formik={formik} onClick={handleClose} />
                </Modal.Footer>
              </Form>
            )}
          </Formik>
        </Modal>

        <div className="d-grid gap-2 mt-5">
          <Button variant="success" onClick={handleOpen}>
            Choose Arrivals Payment Team Members
          </Button>
        </div>

        {stream?.arrivalsPayers?.map((arrivalsPayer: Member) => (
          <div key={arrivalsPayer.id}>
            <MemberDisplayCard member={arrivalsPayer} />
            <div className="d-grid gap-2">
              <Button
                disabled={submitting}
                variant="danger"
                onClick={async () => {
                  const confirmBox = window.confirm(
                    `Do you want to delete ${arrivalsPayer.fullName} as a arrivalsPayer`
                  )

                  if (confirmBox === true) {
                    setSubmitting(true)
                    try {
                      await RemoveStreamArrivalsPayer({
                        variables: {
                          streamId: streamId,
                          arrivalsPayerId: arrivalsPayer.id,
                        },
                      })
                      setSubmitting(false)
                      alertMsg(`${arrivalsPayer.fullName} Deleted Successfully`)
                    } catch (error: any) {
                      throwToSentry('', error)
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
          </div>
        ))}

        {!stream?.arrivalsPayers?.length && (
          <NoDataComponent text="You have no Arrivals Payment Team Members at this time" />
        )}
      </Container>
    </ApolloWrapper>
  )
}

export default ArrivalsPayerSelect
