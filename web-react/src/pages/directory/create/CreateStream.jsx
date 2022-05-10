import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { throwErrorMsg } from '../../../global-utils'
import { CREATE_STREAM_MUTATION } from './CreateMutations'
import { CREATE_STREAM_EQUIPMENT_CAMPAIGN } from '../../campaigns/CampaignQueries'
import { ChurchContext } from '../../../contexts/ChurchContext'
import { NEW_STREAM_LEADER } from './MakeLeaderMutations'
import StreamForm from 'pages/directory/reusable-forms/StreamForm'

const CreateStream = () => {
  const { clickCard, gatheringServiceId } = useContext(ChurchContext)

  const navigate = useNavigate()

  const initialValues = {
    name: '',
    leaderId: '',
    gatheringService: gatheringServiceId,
    councils: [''],
  }

  const [NewStreamLeader] = useMutation(NEW_STREAM_LEADER)
  const [CreateStream] = useMutation(CREATE_STREAM_MUTATION)
  const [CreateEquipmentCampaign] = useMutation(
    CREATE_STREAM_EQUIPMENT_CAMPAIGN
  )

  //onSubmit receives the form state as argument
  const onSubmit = async (values, onSubmitProps) => {
    onSubmitProps.setSubmitting(true)
    clickCard({ id: values.gatheringService, __typename: 'GatheringService' })

    try {
      const res = await CreateStream({
        variables: {
          name: values.name,
          leaderId: values.leaderId,
          gatheringServiceId: values.gatheringService,
          councils: values.councils,
        },
      })
      clickCard(res.data.CreateStream)

      try {
        await NewStreamLeader({
          variables: {
            leaderId: values.leaderId,
            streamId: res.data.CreateStream.id,
          },
        })
      } catch (error) {
        throwErrorMsg('There was an error setting the leader', error)
      }

      try {
        await CreateEquipmentCampaign({
          variables: {
            streamId: res.data.CreateStream.id,
          },
        })
      } catch (error) {
        throwErrorMsg('There was an error creating a campaign', error)
      }
    } catch (error) {
      throwErrorMsg('There was an error creating council', error)
    }

    onSubmitProps.setSubmitting(false)
    onSubmitProps.resetForm()
    navigate(`/stream/displaydetails`)
  }

  return (
    <StreamForm
      initialValues={initialValues}
      onSubmit={onSubmit}
      title={`Create a New Stream`}
      newStream
    />
  )
}

export default CreateStream
