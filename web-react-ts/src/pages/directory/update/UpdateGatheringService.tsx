import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { alertMsg, throwToSentry } from '../../../global-utils'
import { GET_OVERSIGHT_GATHERINGSERVICES } from '../../../queries/ListQueries'
import {
  UPDATE_GATHERINGSERVICE_MUTATION,
  ADD_GATHERINGSERVICE_STREAM,
  REMOVE_GATHERINGSERVICE_OVERSIGHT,
  REMOVE_STREAM_GATHERINGSERVICE,
  ADD_GATHERINGSERVICE_OVERSIGHT,
} from './UpdateMutations'
import { ChurchContext } from '../../../contexts/ChurchContext'
import { DISPLAY_GATHERINGSERVICE } from '../display/ReadQueries'
import {
  LOG_GATHERINGSERVICE_HISTORY,
  LOG_STREAM_HISTORY,
} from './LogMutations'
import { MAKE_GATHERINGSERVICE_LEADER } from './ChangeLeaderMutations'
import GatheringServiceForm, {
  GatheringServiceFormValues,
} from 'pages/directory/reusable-forms/GatheringServiceForm'
import { MAKE_STREAM_INACTIVE } from './CloseChurchMutations'
import { addNewChurches, removeOldChurches } from './directory-utils'
import { FormikHelpers } from 'formik'
import LoadingScreen from 'components/base-component/LoadingScreen'

const UpdateGatheringService = () => {
  const { gatheringServiceId, clickCard } = useContext(ChurchContext)
  const { data, loading } = useQuery(DISPLAY_GATHERINGSERVICE, {
    variables: { id: gatheringServiceId },
  })

  const navigate = useNavigate()
  const gatheringService = data?.gatheringServices[0]
  const initialValues: GatheringServiceFormValues = {
    name: gatheringService?.name,
    leaderName: gatheringService?.leader?.fullName ?? '',
    leaderId: gatheringService?.leader?.id || '',
    oversight: gatheringService?.oversight?.id,
    streams: gatheringService?.streams?.length
      ? gatheringService.streams
      : [''],
  }
  const [LogGatheringServiceHistory] = useMutation(
    LOG_GATHERINGSERVICE_HISTORY,
    {
      refetchQueries: [
        {
          query: DISPLAY_GATHERINGSERVICE,
          variables: { id: gatheringServiceId },
        },
      ],
    }
  )
  const [LogStreamHistory] = useMutation(LOG_STREAM_HISTORY, {
    refetchQueries: [
      {
        query: DISPLAY_GATHERINGSERVICE,
        variables: { id: gatheringServiceId },
      },
    ],
  })

  const [MakeGatheringServiceLeader] = useMutation(MAKE_GATHERINGSERVICE_LEADER)
  const [UpdateGatheringService] = useMutation(
    UPDATE_GATHERINGSERVICE_MUTATION,
    {
      refetchQueries: [
        {
          query: GET_OVERSIGHT_GATHERINGSERVICES,
          variables: { id: gatheringService.oversight.id },
        },
      ],
    }
  )

  //Changes downwards. ie. Bacenta Changes underneath constituency
  const [AddGatheringServicesStream] = useMutation(ADD_GATHERINGSERVICE_STREAM)
  const [RemoveStreamGatheringService] = useMutation(
    REMOVE_STREAM_GATHERINGSERVICE,
    {
      onCompleted: (data) => {
        const prevGatheringService =
          data.updateGatheringService.gatheringServices[0]
        const stream = data.updateStream.streams[0]
        let newGatheringServiceId = ''
        let oldGatheringServiceId = ''
        let historyRecord

        if (prevGatheringService.id !== gatheringServiceId) {
          //Bacenta has previous constituency which is not current constituency and is joining
          oldGatheringServiceId = prevGatheringService.id
          newGatheringServiceId = gatheringServiceId
          historyRecord = `${stream.name} Stream has been moved to ${initialValues.name} Gathering Service from ${prevGatheringService.name} Gathering Service`
        }

        //After removing the bacenta from a constituency, then you log that change.
        LogStreamHistory({
          variables: {
            stream: stream.id,
            newLeaderId: '',
            oldLeaderId: '',
            newGatheringServiceId: newGatheringServiceId,
            oldGatheringServiceId: oldGatheringServiceId,
            historyRecord: historyRecord,
          },
        })
      },
    }
  )
  const [CloseDownStream] = useMutation(MAKE_STREAM_INACTIVE)

  //Changes upwards. it. Changes to the Oversight the Gathering Service Campus is under
  const [RemoveGatheringServiceOversight] = useMutation(
    REMOVE_GATHERINGSERVICE_OVERSIGHT
  )
  const [AddGatheringServiceOversight] = useMutation(
    ADD_GATHERINGSERVICE_OVERSIGHT,
    {
      onCompleted: (data) => {
        const oldOversight = data.updateOversight.Oversight[0]
        const newOversight =
          data.UpdateGatheringService.gatheringService[0].oversight

        let recordIfOldOversight = `${initialValues.name} Gathering Service has been moved from ${oldOversight.name} Oversight to ${newOversight.name} Oversight`

        //After Adding the stream to a gatheringService, then you log that change.
        LogGatheringServiceHistory({
          variables: {
            gatheringServiceId: gatheringServiceId,
            newLeaderId: '',
            oldLeaderId: '',
            newOversightId:
              data.UpdateGatheringService.gatheringService[0].oversight.id,
            oldOversight: gatheringService?.oversight.id,
            historyRecord: recordIfOldOversight,
          },
        })
      },
    }
  )

  //onSubmit receives the form state as argument
  const onSubmit = async (
    values: GatheringServiceFormValues,
    onSubmitProps: FormikHelpers<GatheringServiceFormValues>
  ) => {
    onSubmitProps.setSubmitting(true)
    clickCard({ id: values.oversight, __typename: 'Oversight' })
    try {
      await UpdateGatheringService({
        variables: {
          gatheringServiceId: gatheringServiceId,
          name: values.name,
          oversightId: values.oversight,
        },
      })

      //Log if Gathering Services Name Changes
      if (values.name !== initialValues.name) {
        await LogGatheringServiceHistory({
          variables: {
            gatheringServiceId: gatheringServiceId,
            newLeaderId: '',
            oldLeaderId: '',
            oldOversightId: '',
            newOversightId: '',
            historyRecord: `Gathering Service name has been changed from ${initialValues.name} to ${values.name}`,
          },
        })
      }

      //Log if the Leader Changes
      if (values.leaderId !== initialValues.leaderId) {
        try {
          await MakeGatheringServiceLeader({
            variables: {
              oldLeaderId: initialValues.leaderId || 'old-leader',
              newLeaderId: values.leaderId,
              gatheringServiceId: gatheringServiceId,
            },
          })
          alertMsg('Leader Changed Successfully')
          navigate(`/gatheringservice/displaydetails`)
        } catch (err: any) {
          throwToSentry('There was a problem changing the Overseer', err)
        }
      }

      //Log if GatheringService Changes
      if (values.oversight !== gatheringService.oversight.id) {
        try {
          await RemoveGatheringServiceOversight({
            variables: {
              higherChurch: initialValues.oversight,
              lowerChurch: [gatheringServiceId],
            },
          })
          await AddGatheringServiceOversight({
            variables: {
              OversightId: values.oversight,
              oldOversightd: initialValues.oversight,
              gatheringServiceId: gatheringServiceId,
            },
          })
        } catch (error: any) {
          throwToSentry(error)
        }
      }

      //For the Adding and Removing of Streams

      const oldStreamList = initialValues.streams?.map((stream) => stream) || []

      const newStreamList = values.streams?.map((stream) => stream) || []

      const lists = {
        oldChurches: oldStreamList,
        newChurches: newStreamList,
      }

      const mutations = {
        closeDownChurch: CloseDownStream,
        removeChurch: RemoveStreamGatheringService,
        addChurch: AddGatheringServicesStream,
        logChurchHistory: LogStreamHistory,
      }

      const args = {
        initialValues,
        gatheringServiceId,
      }

      Promise.all([
        await removeOldChurches(lists, mutations),
        await addNewChurches(lists, mutations, args),
      ])

      onSubmitProps.setSubmitting(false)
      onSubmitProps.resetForm()
      navigate(`/gatheringservice/displaydetails`)
    } catch (err: any) {
      throwToSentry('There was a problem updating this gathering service', err)
    }
  }

  if (loading) {
    return <LoadingScreen />
  }

  return (
    <GatheringServiceForm
      initialValues={initialValues}
      onSubmit={onSubmit}
      title={`Update Gathering Service Form`}
      newGatheringService={false}
    />
  )
}

export default UpdateGatheringService
