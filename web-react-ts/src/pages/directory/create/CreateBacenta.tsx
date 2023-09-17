import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { CREATE_BACENTA_MUTATION } from './CreateMutations'
import { ChurchContext } from '../../../contexts/ChurchContext'
import { NEW_BACENTA_LEADER } from './MakeLeaderMutations'
import BacentaForm, { BacentaFormValues } from '../reusable-forms/BacentaForm'
import { throwToSentry } from 'global-utils'
import { FormikHelpers } from 'formik'

const CreateBacenta = () => {
  const { clickCard, constituencyId } = useContext(ChurchContext)
  const navigate = useNavigate()

  const initialValues: BacentaFormValues = {
    name: '',
    leaderId: '',
    leaderName: '',
    leaderEmail: '',
    constituency: constituencyId ?? '',
    graduationStatus: '',
    vacationStatus: '',
  }

  const [NewBacentaLeader] = useMutation(NEW_BACENTA_LEADER)
  const [CreateBacenta] = useMutation(CREATE_BACENTA_MUTATION)

  //onSubmit receives the form state as argument
  const onSubmit = async (
    values: BacentaFormValues,
    onSubmitProps: FormikHelpers<BacentaFormValues>
  ) => {
    const { setSubmitting, resetForm } = onSubmitProps
    setSubmitting(true)

    try {
      if (!values.leaderEmail) {
        setSubmitting(false)
        throw new Error('Leader email is required')
      }

      const res = await CreateBacenta({
        variables: {
          name: values.name,
          constituencyId: values.constituency,
          leaderId: values.leaderId,
        },
      })

      await NewBacentaLeader({
        variables: {
          leaderId: values.leaderId,
          bacentaId: res.data.CreateBacenta.id,
        },
      })

      clickCard(res.data.CreateBacenta)
      setSubmitting(false)
      resetForm()
      navigate('/bacenta/displaydetails')
    } catch (error: any) {
      throwToSentry('There was an error creating bacenta', error)
      setSubmitting(false)
    }
  }

  return (
    <BacentaForm
      initialValues={initialValues}
      onSubmit={onSubmit}
      title="Start a New Bacenta"
      newBacenta={true}
    />
  )
}

export default CreateBacenta
