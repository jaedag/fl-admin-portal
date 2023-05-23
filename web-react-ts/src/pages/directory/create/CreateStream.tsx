import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { throwToSentry } from '../../../global-utils'
import { CREATE_STREAM_MUTATION } from './CreateMutations'
import { ChurchContext } from '../../../contexts/ChurchContext'
import { NEW_STREAM_LEADER } from './MakeLeaderMutations'
import StreamForm, {
  StreamFormValues,
} from 'pages/directory/reusable-forms/StreamForm'
import { FormikHelpers } from 'formik'

const CreateStream = () => {
  const { clickCard, gatheringServiceId } = useContext(ChurchContext)

  const navigate = useNavigate()

  const initialValues: StreamFormValues = {
    name: '',
    leaderId: '',
    meetingDay: '',
    leaderName: '',
    bankAccount: 'manual',
    leaderEmail: '',
    gatheringService: gatheringServiceId,
  }

  const [NewStreamLeader] = useMutation(NEW_STREAM_LEADER)
  const [CreateStream] = useMutation(CREATE_STREAM_MUTATION)

  //onSubmit receives the form state as argument
  const onSubmit = async (
    values: StreamFormValues,
    onSubmitProps: FormikHelpers<StreamFormValues>
  ) => {
    try {
      onSubmitProps.setSubmitting(true)

      if (!values.leaderEmail) {
        onSubmitProps.setSubmitting(false)
        throw new Error('Leader email is required')
      }

      const res = await CreateStream({
        variables: {
          name: values.name,
          leaderId: values.leaderId,
          bankAccount: values.bankAccount,
          gatheringServiceId: values.gatheringService,
          meetingDay: values.meetingDay,
        },
      })

      await NewStreamLeader({
        variables: {
          leaderId: values.leaderId,
          streamId: res.data.CreateStream.id,
        },
      })

      clickCard({ id: values.gatheringService, __typename: 'GatheringService' })
      clickCard(res.data.CreateStream)
      onSubmitProps.setSubmitting(false)
      onSubmitProps.resetForm()
      navigate(`/stream/displaydetails`)
    } catch (error) {
      throwToSentry('There was an error creating stream', error)
      onSubmitProps.setSubmitting(false)
    }
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
