import { useQuery } from '@apollo/client'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import MemberDisplayCard from 'components/card/MemberDisplayCard'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import { ChurchContext } from 'contexts/ChurchContext'
import { FunctionReturnsVoid, MemberType, StreamInterface } from 'global-types'
import React, { useContext, useState } from 'react'
import { Button, Col, Container, Modal, Row } from 'react-bootstrap'
import { STREAM_BANK_TELLERS } from './Treasury.gql'
import './TellerSelect.css'
import * as Yup from 'yup'
import { Form, Formik } from 'formik'
import FormikControl from 'components/formik-components/FormikControl'
import ModalSubmitButton from './ModalSubmitButton'

interface StreamWithTellers extends StreamInterface {
  bankTellers: MemberType[]
  activeFellowshipCount: number
}

const TellerSelect = () => {
  const { streamId } = useContext(ChurchContext)
  const { data, loading, error } = useQuery(STREAM_BANK_TELLERS, {
    variables: { id: streamId },
  })
  const [show, setShow] = useState(false)
  const handleOpen: FunctionReturnsVoid = () => setShow(true)
  const handleClose: FunctionReturnsVoid = () => setShow(false)

  const stream: StreamWithTellers = data?.streams[0]

  const initialValues = {
    tellerName: '',
    tellerSelect: '',
  }

  const validationSchema = Yup.object({
    tellerSelect: Yup.string().required(
      'Please select a teller from the dropdown'
    ),
  })

  const onSubmit = (
    values: any,
    onSubmitProps: { setSubmitting: (arg: boolean) => void }
  ) => {
    onSubmitProps.setSubmitting(true)
    console.log('submitted')
    onSubmitProps.setSubmitting(false)
    return
  }

  return (
    <ApolloWrapper data={data} loading={loading} error={error}>
      <Container>
        <HeadingPrimary>{`Select ${stream?.name} Tellers`}</HeadingPrimary>
        <HeadingSecondary>
          Use the buttons below to choose tellers
        </HeadingSecondary>
        <div>{`Number of Active Fellowships: ${stream?.activeFellowshipCount}`}</div>

        <Modal
          contentClassName="dark"
          show={show}
          onHide={handleClose}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Choose a Treasurer</Modal.Title>
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
                      <FormikControl
                        control="memberSearch"
                        name="tellerSelect"
                        initialValue={initialValues?.tellerName}
                        placeholder="Select a Name"
                        setFieldValue={formik.setFieldValue}
                        aria-describedby="Member Search"
                        error={formik.errors.tellerSelect}
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
          <Button variant="success" size="lg" onClick={handleOpen}>
            Choose Treasurers
          </Button>
        </div>

        {stream?.bankTellers?.map((teller: MemberType) => (
          <div key={teller.id}>
            <MemberDisplayCard member={teller} />
          </div>
        ))}
      </Container>
    </ApolloWrapper>
  )
}

export default TellerSelect
