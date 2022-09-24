import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { alertMsg, throwToSentry } from '../../../global-utils'
import { GET_STREAM_COUNCILS } from '../../../queries/ListQueries'
import {
  UPDATE_COUNCIL_MUTATION,
  ADD_COUNCIL_STREAM,
  REMOVE_COUNCIL_STREAM,
  REMOVE_CONSTITUENCY_COUNCIL,
  ADD_COUNCIL_CONSTITUENCIES,
} from './UpdateMutations'
import { ChurchContext } from '../../../contexts/ChurchContext'
import { DISPLAY_COUNCIL } from '../display/ReadQueries'
import { LOG_COUNCIL_HISTORY, LOG_CONSTITUENCY_HISTORY } from './LogMutations'
import { MAKE_COUNCIL_LEADER } from './ChangeLeaderMutations'
import CouncilForm, {
  CouncilFormValues,
} from 'pages/directory/reusable-forms/CouncilForm'
import { addNewChurches, removeOldChurches } from './directory-utils'
import { MAKE_CONSTITUENCY_INACTIVE } from './CloseChurchMutations'
import { FormikHelpers } from 'formik'
import LoadingScreen from 'components/base-component/LoadingScreen'

const UpdateCouncil = () => {
  const { councilId, clickCard } = useContext(ChurchContext)
  const { data, loading } = useQuery(DISPLAY_COUNCIL, {
    variables: { id: councilId },
  })

  const navigate = useNavigate()
  const council = data?.councils[0]

  const initialValues: CouncilFormValues = {
    name: council?.name,
    leaderName:
      council?.leader?.firstName + ' ' + council?.leader.lastName ?? '',
    leaderId: council?.leader?.id || '',
    stream: council?.stream?.id ?? '',
    constituencies: council?.constituencies?.length
      ? council.constituencies
      : [''],
  }

  const [LogCouncilHistory] = useMutation(LOG_COUNCIL_HISTORY, {
    refetchQueries: [{ query: DISPLAY_COUNCIL, variables: { id: councilId } }],
  })
  const [LogConstituencyHistory] = useMutation(LOG_CONSTITUENCY_HISTORY, {
    refetchQueries: [{ query: DISPLAY_COUNCIL, variables: { id: councilId } }],
  })

  const [MakeCouncilLeader] = useMutation(MAKE_COUNCIL_LEADER)
  const [UpdateCouncil] = useMutation(UPDATE_COUNCIL_MUTATION, {
    refetchQueries: [
      {
        query: GET_STREAM_COUNCILS,
        variables: { id: initialValues.stream },
      },
    ],
  })

  //Changes downwards. ie. Constituency Changes underneath council
  const [CloseDownConstituency] = useMutation(MAKE_CONSTITUENCY_INACTIVE)
  const [AddCouncilConstituencies] = useMutation(ADD_COUNCIL_CONSTITUENCIES)
  const [RemoveConstituencyCouncil] = useMutation(REMOVE_CONSTITUENCY_COUNCIL, {
    onCompleted: (data) => {
      const prevCouncil = data.updateConstituencies.constituencies[0]
      const constituency = data.updateConstituencies.constituencies[0]
      let newCouncilId = ''
      let oldCouncilId = ''
      let historyRecord

      if (prevCouncil?.id === councilId) {
        //Constituency has previous council which is current council and is going
        oldCouncilId = councilId
        newCouncilId = ''
        historyRecord = `${constituency.name} Constituency has been closed down under ${initialValues.name} Council`
      } else if (prevCouncil.id !== councilId) {
        //Constituency has previous council which is not current council and is joining
        oldCouncilId = prevCouncil.id
        newCouncilId = councilId
        historyRecord = `${constituency.name} Constituency has been moved to ${initialValues.name} Council from ${prevCouncil.name} Council`
      }

      //After removing the constituency from a council, then you log that change.
      LogConstituencyHistory({
        variables: {
          constituencyId: constituency.id,
          newLeaderId: '',
          oldLeaderId: '',
          newcouncilId: newCouncilId,
          oldcouncilId: oldCouncilId,
          historyRecord: historyRecord,
        },
      })
    },
  })

  //Changes upwards. it. Changes to the Stream the Council Campus is under
  const [RemoveCouncilStream] = useMutation(REMOVE_COUNCIL_STREAM)
  const [AddCouncilStream] = useMutation(ADD_COUNCIL_STREAM, {
    onCompleted: (data) => {
      //If there is an old Stream
      const oldStream = data.updateStreams.streams[0]
      const newStream = data.updateCouncils.councils[0].stream
      let recordIfOldStream = `${initialValues.name} Council has been moved from ${oldStream.name} Stream to ${newStream.name} Stream`

      //After Adding the council to a stream, then you log that change.
      LogCouncilHistory({
        variables: {
          councilId: councilId,
          newLeaderId: '',
          oldLeaderId: '',
          newStreamId: data.updateCouncils.councils[0].stream.id,
          oldStreamId: council?.stream.id,
          historyRecord: recordIfOldStream,
        },
      })
    },
  })

  //onSubmit receives the form state as argument
  const onSubmit = async (
    values: CouncilFormValues,
    onSubmitProps: FormikHelpers<CouncilFormValues>
  ) => {
    onSubmitProps.setSubmitting(true)
    clickCard({ id: values.stream, __typename: 'Stream' })

    try {
      await UpdateCouncil({
        variables: {
          councilId: councilId,
          name: values.name,
          streamId: values.stream,
        },
      })

      //Log if Council Name Changes
      if (values.name !== initialValues.name) {
        await LogCouncilHistory({
          variables: {
            councilId: councilId,
            newLeaderId: '',
            oldLeaderId: '',
            oldStreamId: '',
            newStreamId: '',
            historyRecord: `Council name has been changed from ${initialValues.name} to ${values.name}`,
          },
        })
      }

      //Log if the Leader Changes
      if (values.leaderId !== initialValues.leaderId) {
        try {
          await MakeCouncilLeader({
            variables: {
              oldLeaderId: initialValues.leaderId || 'old-leader',
              newLeaderId: values.leaderId,
              councilId: councilId,
            },
          })
          alertMsg('Leader Changed Successfully')
          navigate(`/council/displaydetails`)
        } catch (err: any) {
          throwToSentry('There was a problem changing the Overseer', err)
        }
      }

      //Log if Stream Changes
      if (values.stream !== initialValues.stream) {
        try {
          await RemoveCouncilStream({
            variables: {
              higherChurch: initialValues.stream,
              lowerChurch: [councilId],
            },
          })
          await AddCouncilStream({
            variables: {
              streamId: values.stream,
              oldStreamId: initialValues.stream,
              councilId: councilId,
            },
          })
        } catch (error: any) {
          throwToSentry(error)
        }
      }

      //For the Adding and Removing of Constituencies
      const oldConstituencyList =
        initialValues.constituencies?.map((constituency) => constituency) || []

      const newConstituencyList =
        values.constituencies?.map((constituency) => constituency) || []

      const lists = {
        oldChurches: oldConstituencyList,
        newChurches: newConstituencyList,
      }

      const mutations = {
        closeDownChurch: CloseDownConstituency,
        removeChurch: RemoveConstituencyCouncil,
        addChurch: AddCouncilConstituencies,
        logChurchHistory: LogConstituencyHistory,
      }

      const args = {
        initialValues,
        councilId,
      }

      Promise.all([
        await removeOldChurches(lists, mutations),
        await addNewChurches(lists, mutations, args),
      ])

      onSubmitProps.setSubmitting(false)
      onSubmitProps.resetForm()
      navigate(`/council/displaydetails`)
    } catch (error: any) {
      throwToSentry('There was a problem updating this council', error)
    }
  }

  if (loading) {
    return <LoadingScreen />
  }

  return (
    <CouncilForm
      initialValues={initialValues}
      onSubmit={onSubmit}
      title={`Update Council Form`}
      newCouncil={false}
    />
  )
}

export default UpdateCouncil
