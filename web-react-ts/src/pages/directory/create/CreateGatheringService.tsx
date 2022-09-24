import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { throwToSentry } from '../../../global-utils'
import { CREATE_GATHERING_SERVICE_MUTATION } from './CreateMutations'
import { ChurchContext } from '../../../contexts/ChurchContext'
import { NEW_GATHERING_SERVICE_LEADER } from './MakeLeaderMutations'
import GatheringServiceForm, {
  GatheringServiceFormValues,
} from 'pages/directory/reusable-forms/GatheringServiceForm'
import { FormikHelpers } from 'formik'

const CreateGatheringService = () => {
  const { clickCard, oversightId } = useContext(ChurchContext)

  const navigate = useNavigate()

  const initialValues: GatheringServiceFormValues = {
    name: '',
    leaderId: '',
    leaderName: '',
    oversight: oversightId,
  }

  const [NewGatheringServiceLeader] = useMutation(NEW_GATHERING_SERVICE_LEADER)
  const [CreateGatheringService] = useMutation(
    CREATE_GATHERING_SERVICE_MUTATION
  )

  //onSubmit receives the form state as argument
  const onSubmit = async (
    values: GatheringServiceFormValues,
    onSubmitProps: FormikHelpers<GatheringServiceFormValues>
  ) => {
    onSubmitProps.setSubmitting(true)
    clickCard({ id: values.oversight, __typename: 'Oversight' })
    try {
      const res = await CreateGatheringService({
        variables: {
          name: values.name,
          leaderId: values.leaderId,
          oversightId: values.oversight,
        },
      })
      clickCard(res.data.createGatheringService)

      try {
        await NewGatheringServiceLeader({
          variables: {
            leaderId: values.leaderId,
            gatheringServiceId: res.data.CreateGatheringService.id,
          },
        })
      } catch (error: any) {
        throwToSentry('There was an error adding leader', error)
      }
    } catch (error: any) {
      throwToSentry('There was an error creating gathering service', error)
    }

    onSubmitProps.setSubmitting(false)
    onSubmitProps.resetForm()
    navigate(`/gatheringservice/displaydetails`)
  }

  return (
    <GatheringServiceForm
      initialValues={initialValues}
      onSubmit={onSubmit}
      title={`Create a New Gathering Service`}
      newGatheringService
    />
  )
}

export default CreateGatheringService
