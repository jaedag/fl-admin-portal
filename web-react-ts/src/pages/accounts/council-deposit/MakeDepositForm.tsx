import { useMutation, useQuery } from '@apollo/client'
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
import {
  DEPOSIT_INTO_COUNCIL_BUSSING_PURSE,
  DEPOSIT_INTO_COUNCIL_CURRENT_ACCOUNTS,
} from './depositGQL'
import { throwToSentry } from 'global-utils'
import RoleView from 'auth/RoleView'

const MakeDepositForm = () => {
  const { councilId } = useContext(ChurchContext)
  const { show, handleClose, handleShow } = useModal()
  const navigate = useNavigate()

  const { data, loading, error } = useQuery(COUNCIL_ACCOUNT_DASHBOARD, {
    variables: {
      id: councilId,
    },
  })
  const [depositIntoCouncilCurrentAccount] = useMutation(
    DEPOSIT_INTO_COUNCIL_CURRENT_ACCOUNTS
  )
  const [depositIntoCouncilBussingPurse] = useMutation(
    DEPOSIT_INTO_COUNCIL_BUSSING_PURSE
  )

  const council = data?.councils[0]

  const initialValues = {
    currentBalanceDepositAmount: '0.0',
    bussingPurseDepositAmount: '0.0',
  }
  const validationSchema = Yup.object({
    currentBalanceDepositAmount: Yup.number()
      .typeError('Please enter a valid number')
      .required('This is a required field'),
    bussingPurseDepositAmount: Yup.number()
      .typeError('Please enter a valid number')
      .required('This is a required field'),
  })

  const onSubmit = async (
    values: typeof initialValues,
    onSubmitProps: FormikHelpers<typeof initialValues>
  ) => {
    const { setSubmitting } = onSubmitProps

    setSubmitting(true)
    try {
      const mutations = []

      if (parseFloat(values.currentBalanceDepositAmount) > 0) {
        mutations.push(
          depositIntoCouncilCurrentAccount({
            variables: {
              councilId: councilId,
              currentBalanceDepositAmount: parseFloat(
                values.currentBalanceDepositAmount
              ),
            },
          })
        )
      }

      if (parseFloat(values.bussingPurseDepositAmount) > 0) {
        mutations.push(
          depositIntoCouncilBussingPurse({
            variables: {
              councilId: councilId,
              bussingPurseDepositAmount: parseFloat(
                values.bussingPurseDepositAmount
              ),
            },
          })
        )
      }

      await Promise.all(mutations)
      navigate('/accounts/council/dashboard')
    } catch (err) {
      throwToSentry('Error Depositing into Council Account', err)
    } finally {
      setSubmitting(false)
    }
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
                <RoleView roles={['adminCampus']}>
                  <Input
                    name="currentBalanceDepositAmount"
                    label="Current Balance Deposit Amount"
                    placeholder="Enter an amount"
                  />
                </RoleView>
                <RoleView roles={['arrivalsAdminCampus']}>
                  <Input
                    name="bussingPurseDepositAmount"
                    label="Bussing Purse Deposit Amount"
                    placeholder="Enter an amount"
                  />
                </RoleView>
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
