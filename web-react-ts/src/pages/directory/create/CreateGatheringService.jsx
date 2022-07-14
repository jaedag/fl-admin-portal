import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { throwErrorMsg } from '../../../global-utils'
import { CREATE_GATHERING_SERVICE_MUTATION } from './CreateMutations'
import { ChurchContext } from '../../../contexts/ChurchContext'
import { NEW_GATHERING_SERVICE_LEADER } from './MakeLeaderMutations'
import GatheringServiceForm from 'pages/directory/reusable-forms/StreamForm'

const CreateGatheringService = () => {
  const { clickCard, oversightId } = useContext(ChurchContext)

  const navigate = useNavigate()

  const initialValues = {
    name: '',
    leaderId: '',
    oversight: oversightId,
  }

  const [NewGatheringServiceLeader] = useMutation(NEW_GATHERING_SERVICE_LEADER)
  const [CreateGatheringService] = useMutation(
    CREATE_GATHERING_SERVICE_MUTATION
  )

  //onSubmit receives the form state as argument
  const onSubmit = (values, onSubmitProps) => {
    onSubmitProps.setSubmitting(true)
    clickCard({ id: values.gatheringService, __typename: 'GatheringService' })

    CreateGatheringService({
      variables: {
        name: values.name,
        leaderId: values.leaderId,
        oversightId: values.oversight,
      },
    })
      .then((res) => {
        clickCard(res.data.CreateGatheringService)
        NewGatheringServiceLeader({
          variables: {
            leaderId: values.leaderId,
            gatheringServiceId: res.data.CreateGatheringService.id,
          },
        }).catch((error) => {
          throwErrorMsg('There was an error adding leader', error)
        })

        clickCard(res.data.CreateGatheringService)
        onSubmitProps.setSubmitting(false)
        onSubmitProps.resetForm()
        navigate(`/gatheringservice/displaydetails`)
      })
      .catch((error) => {
        throwErrorMsg('There was an error creating gathering service', error)
      })
  }

  return (
    <GatheringServiceForm
      initialValues={initialValues}
      onSubmit={onSubmit}
      title={`Create a New Gathering Service`}
      newStream
    />
  )
}

export default CreateGatheringService
