import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { alertMsg, throwToSentry } from '../../../global-utils'
import { GET_CAMPUS_STREAMS } from '../../../queries/ListQueries'
import {
  UPDATE_STREAM_MUTATION,
  ADD_CAMPUS_STREAM,
  REMOVE_STREAM_CAMPUS,
} from './UpdateMutations'
import { ChurchContext } from '../../../contexts/ChurchContext'
import { DISPLAY_STREAM } from '../display/ReadQueries'
import { LOG_STREAM_HISTORY } from './LogMutations'
import { MAKE_STREAM_LEADER } from './ChangeLeaderMutations'
import StreamForm, {
  StreamFormValues,
} from 'pages/directory/reusable-forms/StreamForm'
import LoadingScreen from 'components/base-component/LoadingScreen'
import { FormikHelpers } from 'formik'

const UpdateStream = () => {
  const { streamId, clickCard } = useContext(ChurchContext)
  const { data, loading } = useQuery(DISPLAY_STREAM, {
    variables: { id: streamId },
  })

  const navigate = useNavigate()
  const stream = data?.streams[0]

  const initialValues: StreamFormValues = {
    name: stream?.name,
    leaderName: stream?.leader?.firstName + ' ' + stream?.leader.lastName ?? '',
    leaderId: stream?.leader?.id || '',
    leaderEmail: stream?.leader?.email || '',
    bankAccount: stream?.bankAccount || '',
    meetingDay: stream?.meetingDay.day ?? '',
    campus: stream?.campus?.id ?? '',
    councils: stream?.councils?.length ? stream.councils : [''],
  }

  const [LogStreamHistory] = useMutation(LOG_STREAM_HISTORY, {
    refetchQueries: [{ query: DISPLAY_STREAM, variables: { id: streamId } }],
  })
  const [MakeStreamLeader] = useMutation(MAKE_STREAM_LEADER)
  const [UpdateStream] = useMutation(UPDATE_STREAM_MUTATION, {
    refetchQueries: [
      {
        query: GET_CAMPUS_STREAMS,
        variables: { id: initialValues.campus },
      },
    ],
  })

  //Changes upwards. it. Changes to the Campus the Stream Campus is under
  const [RemoveStreamCampus] = useMutation(REMOVE_STREAM_CAMPUS)
  const [AddStreamCampus] = useMutation(ADD_CAMPUS_STREAM, {
    onCompleted: (data) => {
      const oldCampus = data.updateCampus.campuses[0]
      const newCampus = data.updateStreams.streams[0].campus

      let recordIfOldCampus = `${initialValues.name} Stream has been moved from ${oldCampus.name} Campus to ${newCampus.name} Campus`

      //After Adding the stream to a campus, then you log that change.
      LogStreamHistory({
        variables: {
          streamId: streamId,
          newLeaderId: '',
          oldLeaderId: '',
          newCampusId: data.updateStreams.streams[0].campus.id,
          oldCampusId: stream?.campus.id,
          historyRecord: recordIfOldCampus,
        },
      })
    },
  })

  //onSubmit receives the form state as argument
  const onSubmit = async (
    values: StreamFormValues,
    onSubmitProps: FormikHelpers<StreamFormValues>
  ) => {
    onSubmitProps.setSubmitting(true)

    try {
      await UpdateStream({
        variables: {
          streamId: streamId,
          name: values.name,
          bankAccount: values.bankAccount,
          campusId: values.campus,
          meetingDay: values.meetingDay,
        },
      })

      //Log if Stream Name Changes
      if (values.name !== initialValues.name) {
        await LogStreamHistory({
          variables: {
            streamId: streamId,
            newLeaderId: '',
            oldLeaderId: '',
            oldCampusId: '',
            newCampusId: '',
            historyRecord: `Stream name has been changed from ${initialValues.name} to ${values.name}`,
          },
        })
      }

      //Log if the Leader Changes
      if (values.leaderId !== initialValues.leaderId) {
        try {
          await MakeStreamLeader({
            variables: {
              oldLeaderId: initialValues.leaderId || 'old-leader',
              newLeaderId: values.leaderId,
              streamId: streamId,
            },
          })
          alertMsg('Leader Changed Successfully')
          navigate(`/stream/displaydetails`)
        } catch (err: any) {
          const errorArray = err.toString().replace('Error: ', '').split('\n')
          if (errorArray[0] === errorArray[1]) {
            throwToSentry(
              'There was a problem changing the leader',
              errorArray[0]
            )
          } else {
            throwToSentry('There was a problem changing the leader', err)
          }
        }
      }

      //Log if Campus Changes
      if (values.campus !== initialValues.campus) {
        try {
          await RemoveStreamCampus({
            variables: {
              higherChurch: initialValues.campus,
              lowerChurch: [streamId],
            },
          })
          await AddStreamCampus({
            variables: {
              campusId: values.campus,
              oldCampusId: initialValues.campus,
              streamId: streamId,
            },
          })
        } catch (error: any) {
          throwToSentry(error)
        }
      }

      clickCard({ id: values.campus, __typename: 'Campus' })
      onSubmitProps.setSubmitting(false)
      onSubmitProps.resetForm()
      navigate(`/stream/displaydetails`)
    } catch (err: any) {
      throwToSentry('There was a problem updating this stream', err)
      onSubmitProps.setSubmitting(false)
    }
  }

  if (loading) {
    return <LoadingScreen />
  }

  return (
    <StreamForm
      initialValues={initialValues}
      onSubmit={onSubmit}
      title={`Update Stream Form`}
      newStream={false}
    />
  )
}

export default UpdateStream
