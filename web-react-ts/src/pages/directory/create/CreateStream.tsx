import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { throwErrorMsg } from '../../../global-utils'
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
    leaderName: '',
    gatheringService: gatheringServiceId,
  }

  const [NewStreamLeader] = useMutation(NEW_STREAM_LEADER)
  const [CreateStream] = useMutation(CREATE_STREAM_MUTATION)

  //onSubmit receives the form state as argument
  const onSubmit = (
    values: StreamFormValues,
    onSubmitProps: FormikHelpers<StreamFormValues>
  ) => {
    onSubmitProps.setSubmitting(true)
    clickCard({ id: values.gatheringService, __typename: 'GatheringService' })

    CreateStream({
      variables: {
        name: values.name,
        leaderId: values.leaderId,
        gatheringServiceId: values.gatheringService,
      },
    })
      .then((res) => {
        clickCard(res.data.CreateStream)
        NewStreamLeader({
          variables: {
            leaderId: values.leaderId,
            streamId: res.data.CreateStream.id,
          },
        }).catch((error) => {
          throwErrorMsg('There was an error adding leader', error)
        })

        clickCard(res.data.CreateStream)
        onSubmitProps.setSubmitting(false)
        onSubmitProps.resetForm()
        navigate(`/stream/displaydetails`)
      })
      .catch((error) => {
        throwErrorMsg('There was an error creating stream', error)
      })
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
