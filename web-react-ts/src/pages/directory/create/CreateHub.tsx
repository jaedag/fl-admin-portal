import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { throwToSentry } from '../../../global-utils'
import { CREATE_HUB_MUTATION } from './CreateMutations'
import { ChurchContext } from '../../../contexts/ChurchContext'
import { NEW_HUB_LEADER } from './MakeLeaderMutations'
import { FormikHelpers } from 'formik'
import HubForm, { HubFormValues } from '../reusable-forms/HubForm'

const CreateHub = () => {
  const { clickCard } = useContext(ChurchContext)

  const navigate = useNavigate()

  const initialValues: HubFormValues = {
    ministry: '',
    leaderId: '',
    leaderName: '',
    leaderEmail: '',
    name: '',
  }

  const [NewHubLeader] = useMutation(NEW_HUB_LEADER)
  const [CreateHub] = useMutation(CREATE_HUB_MUTATION)

  const onSubmit = async (
    values: HubFormValues,
    onSubmitProps: FormikHelpers<HubFormValues>
  ) => {
    onSubmitProps.setSubmitting(true)

    try {
      if (!values.leaderEmail) {
        onSubmitProps.setSubmitting(false)
        throw new Error('Leader email is required')
      }

      const res = await CreateHub({
        variables: {
          ministryId: values.ministry,
          leaderId: values.leaderId,
          name: values.name,
        },
      })

      await NewHubLeader({
        variables: {
          leaderId: values.leaderId,
          hubId: res.data.CreateHub.id,
        },
      })

      clickCard({ id: values.ministry, __typename: 'Ministry' })
      clickCard(res.data.CreateHub)
      onSubmitProps.setSubmitting(false)
      onSubmitProps.resetForm()
      navigate(`/hub/displaydetails`)
    } catch (error: unknown) {
      throwToSentry('There was an error creating hub', error)
    }
  }

  return (
    <HubForm
      initialValues={initialValues}
      onSubmit={onSubmit}
      title={`Create a New Hub`}
      newHub
    />
  )
}
export default CreateHub
