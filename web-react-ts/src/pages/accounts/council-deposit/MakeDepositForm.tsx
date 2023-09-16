import { useQuery } from '@apollo/client'
import { ChurchContext } from 'contexts/ChurchContext'
import { useContext } from 'react'
import { useNavigate } from 'react-router'
import { COUNCIL_ACCOUNT_DASHBOARD } from '../accountsGQL'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import { Button, Container, Modal } from 'react-bootstrap'
import { Form, Formik, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import Input from 'components/formik/Input'
import SubmitButton from 'components/formik/SubmitButton'
import useModal from 'hooks/useModal'

const MakeDepositForm = () => {
  const { councilId } = useContext(ChurchContext)
  const { show, handleClose, handleShow } = useModal()
  const navigate = useNavigate()

  const { data, loading, error } = useQuery(COUNCIL_ACCOUNT_DASHBOARD, {
    variables: {
      id: councilId,
    },
  })

  const council = data?.councils[0]

  const initialValues = {
    currentBalanceDepositAmount: '',
    bussingPurseDepositAmount: '',
  }
  const validationSchema = Yup.object({
    currentBalanceDepositAmount: Yup.number()
      .typeError('Please enter a valid number')
      .required('This is a required field'),
    bussingPurseDepositAmount: Yup.number()
      .typeError('Please enter a valid number')
      .required('This is a required field'),
  })

  const onSubmit = (
    values: typeof initialValues,
    onSubmitProps: FormikHelpers<typeof initialValues>
  ) => {
    const { setSubmitting } = onSubmitProps

    setSubmitting(true)
    console.log('🚀 ~ file: MakeDepositForm.tsx:46 ~ values:', values)

    navigate('#')
    setSubmitting(false)
  }

  return (
    <ApolloWrapper data={data} loading={loading} error={error}>
      <Container>
        <HeadingPrimary>{`${council?.name} ${council?.__typename}`}</HeadingPrimary>
        <HeadingSecondary>{council?.leader.fullName}</HeadingSecondary>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => (
            <Form>
              <Container className="mb-4">
                <Input
                  name="currentBalanceDepositAmount"
                  label="Current Balace Deposit Amount"
                  placeholder="Enter an amount"
                />
                <Input
                  name="bussingPurseDepositAmount"
                  label="Bussing Purse Deposit Amount"
                  placeholder="Enter an amount"
                />

                <Modal show={show} onHide={handleClose} centered scrollable>
                  <Modal.Header closeButton>
                    Please confirm the amounts to deposit
                  </Modal.Header>
                  <Modal.Body>
                    <p>
                      Current Balance:{' '}
                      <span className="text-info">
                        GHS{' '}
                        {parseFloat(
                          formik.values.currentBalanceDepositAmount
                        ).toLocaleString('en-US')}
                      </span>
                    </p>

                    <p>
                      Bussing Purse Balance:{' '}
                      <span className="text-info">
                        GHS{' '}
                        {parseFloat(
                          formik.values.bussingPurseDepositAmount
                        ).toLocaleString('en-US')}
                      </span>
                    </p>
                  </Modal.Body>

                  <Modal.Footer>
                    <SubmitButton
                      onClick={formik.handleSubmit}
                      formik={formik}
                    />
                    <Button variant="primary" onClick={handleClose}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>

                <div className="text-center mt-5">
                  <Button onClick={handleShow} className="px-5">
                    Submit
                  </Button>
                </div>
              </Container>
            </Form>
          )}
        </Formik>
      </Container>
    </ApolloWrapper>
  )
}

export default MakeDepositForm
