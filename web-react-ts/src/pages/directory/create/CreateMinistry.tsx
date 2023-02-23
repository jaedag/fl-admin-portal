import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { throwToSentry } from '../../../global-utils'
import { CREATE_MINISTRY_MUTATION } from './CreateMutations'
import { ChurchContext } from '../../../contexts/ChurchContext'
import { NEW_MINISTRY_LEADER } from './MakeLeaderMutations'
import { FormikHelpers } from 'formik'
import MinistryForm, {
  MinistryFormValues,
} from '../reusable-forms/MinistryForm'

const CreateMinistry = () => {
  const { clickCard } = useContext(ChurchContext)

  const navigate = useNavigate()

  const initialValues: MinistryFormValues = {
    leaderId: '',
    leaderName: '',
    federalMinistry: '',
    stream: '',
  }

  const [NewMinistryLeader] = useMutation(NEW_MINISTRY_LEADER)
  const [CreateMinistry] = useMutation(CREATE_MINISTRY_MUTATION)

  //onSubmit receives the form state as argument
  const onSubmit = (
    values: MinistryFormValues,
    onSubmitProps: FormikHelpers<MinistryFormValues>
  ) => {
    onSubmitProps.setSubmitting(true)
    clickCard({ id: values.federalMinistry, __typename: 'Federalministry' })
    clickCard({ id: values.stream, __typename: 'Stream' })

    CreateMinistry({
      variables: {
        federalMinistryId: values.federalMinistry,
        leaderId: values.leaderId,
        streamId: values.stream,
      },
    })
      .then((res) => {
        clickCard(res.data.CreateMinistry)
        NewMinistryLeader({
          variables: {
            leaderId: values.leaderId,
            ministryId: res.data.CreateMinistry.id,
          },
        }).catch((error) => {
          throwToSentry('There was an error adding leader', error)
        })

        clickCard(res.data.CreateMinistry)
        onSubmitProps.setSubmitting(false)
        onSubmitProps.resetForm()
        navigate(`/ministry/displaydetails`)
      })
      .catch((error) => {
        throwToSentry('There was an error creating ministry', error)
      })
  }

  return (
    <MinistryForm
      initialValues={initialValues}
      onSubmit={onSubmit}
      title={`Create a New Ministry`}
      newMinistry
    />
  )
}

export default CreateMinistry
