import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { alertMsg, throwToSentry } from '../../../global-utils'
import { GET_OVERSIGHT_CAMPUSES } from '../../../queries/ListQueries'
import {
  UPDATE_CAMPUS_MUTATION,
  ADD_CAMPUS_STREAM,
  REMOVE_CAMPUS_OVERSIGHT,
  REMOVE_STREAM_CAMPUS,
  ADD_CAMPUS_OVERSIGHT,
} from './UpdateMutations'
import { ChurchContext } from '../../../contexts/ChurchContext'
import { DISPLAY_CAMPUS } from '../display/ReadQueries'
import { LOG_CAMPUS_HISTORY, LOG_STREAM_HISTORY } from './LogMutations'
import { MAKE_CAMPUS_LEADER } from './ChangeLeaderMutations'
import CampusForm, {
  CampusFormValues,
} from 'pages/directory/reusable-forms/CampusForm'
import { MAKE_STREAM_INACTIVE } from './CloseChurchMutations'
import { addNewChurches, removeOldChurches } from './directory-utils'
import { FormikHelpers } from 'formik'
import LoadingScreen from 'components/base-component/LoadingScreen'

const UpdateCampus = () => {
  const { campusId, clickCard } = useContext(ChurchContext)
  const { data, loading } = useQuery(DISPLAY_CAMPUS, {
    variables: { id: campusId },
  })

  const navigate = useNavigate()
  const campus = data?.campuses[0]
  const initialValues: CampusFormValues = {
    name: campus?.name,
    leaderName: campus?.leader?.fullName ?? '',
    leaderId: campus?.leader?.id || '',
    leaderEmail: campus?.leader?.email || '',
    oversight: campus?.oversight?.id,
    incomeTracking: campus?.noIncomeTracking ? 'No' : 'Yes',
    currency: campus?.currency,
    conversionRateToDollar: campus?.conversionRateToDollar,
    streams: campus?.streams?.length ? campus.streams : [''],
  }
  const [LogCampusHistory] = useMutation(LOG_CAMPUS_HISTORY, {
    refetchQueries: [
      {
        query: DISPLAY_CAMPUS,
        variables: { id: campusId },
      },
    ],
  })
  const [LogStreamHistory] = useMutation(LOG_STREAM_HISTORY, {
    refetchQueries: [
      {
        query: DISPLAY_CAMPUS,
        variables: { id: campusId },
      },
    ],
  })

  const [MakeCampusLeader] = useMutation(MAKE_CAMPUS_LEADER)
  const [UpdateCampus] = useMutation(UPDATE_CAMPUS_MUTATION, {
    refetchQueries: [
      {
        query: GET_OVERSIGHT_CAMPUSES,
        variables: { id: campus.oversight.id },
      },
    ],
  })

  //Changes downwards. ie. Bacenta Changes underneath constituency
  const [AddCampusesStream] = useMutation(ADD_CAMPUS_STREAM)
  const [RemoveStreamCampus] = useMutation(REMOVE_STREAM_CAMPUS, {
    onCompleted: (data) => {
      const prevCampus = data.updateCampus.campuses[0]
      const stream = data.updateStream.streams[0]
      let newCampusId = ''
      let oldCampusId = ''
      let historyRecord

      if (prevCampus.id !== campusId) {
        //Bacenta has previous constituency which is not current constituency and is joining
        oldCampusId = prevCampus.id
        newCampusId = campusId
        historyRecord = `${stream.name} Stream has been moved to ${initialValues.name} Campus from ${prevCampus.name} Campus`
      }

      //After removing the bacenta from a constituency, then you log that change.
      LogStreamHistory({
        variables: {
          stream: stream.id,
          newLeaderId: '',
          oldLeaderId: '',
          newCampusId: newCampusId,
          oldCampusId: oldCampusId,
          historyRecord: historyRecord,
        },
      })
    },
  })
  const [CloseDownStream] = useMutation(MAKE_STREAM_INACTIVE)

  //Changes upwards. it. Changes to the Oversight the Campus Campus is under
  const [RemoveCampusOversight] = useMutation(REMOVE_CAMPUS_OVERSIGHT)
  const [AddCampusOversight] = useMutation(ADD_CAMPUS_OVERSIGHT, {
    onCompleted: (data) => {
      const oldOversight = data.updateOversight.oversight[0]
      const newOversight = data.UpdateCampus.campuses[0].oversight

      let recordIfOldOversight = `${initialValues.name} Campus has been moved from ${oldOversight.name} Oversight to ${newOversight.name} Oversight`

      //After Adding the stream to a campus, then you log that change.
      LogCampusHistory({
        variables: {
          campusId: campusId,
          newLeaderId: '',
          oldLeaderId: '',
          newOversightId: data.UpdateCampus.campus[0].oversight.id,
          oldOversight: campus?.oversight.id,
          historyRecord: recordIfOldOversight,
        },
      })
    },
  })

  //onSubmit receives the form state as argument
  const onSubmit = async (
    values: CampusFormValues,
    onSubmitProps: FormikHelpers<CampusFormValues>
  ) => {
    onSubmitProps.setSubmitting(true)

    try {
      await UpdateCampus({
        variables: {
          campusId: campusId,
          name: values.name,
          oversightId: values.oversight,
          noIncomeTracking: values.incomeTracking === 'No' ? true : false,
          currency: values.currency,
          conversionRateToDollar: parseFloat(
            values.conversionRateToDollar.toString()
          ),
        },
      })

      //Log if Campuss Name Changes
      if (values.name !== initialValues.name) {
        await LogCampusHistory({
          variables: {
            campusId: campusId,
            newLeaderId: '',
            oldLeaderId: '',
            oldOversightId: '',
            newOversightId: '',
            historyRecord: `Campus name has been changed from ${initialValues.name} to ${values.name}`,
          },
        })
      }

      //Log if the Leader Changes
      if (values.leaderId !== initialValues.leaderId) {
        try {
          await MakeCampusLeader({
            variables: {
              oldLeaderId: initialValues.leaderId || 'old-leader',
              newLeaderId: values.leaderId,
              campusId: campusId,
            },
          })
          alertMsg('Leader Changed Successfully')
          navigate(`/campus/displaydetails`)
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
      if (values.oversight !== campus.oversight.id) {
        try {
          await RemoveCampusOversight({
            variables: {
              higherChurch: initialValues.oversight,
              lowerChurch: [campusId],
            },
          })
          await AddCampusOversight({
            variables: {
              oversightId: values.oversight,
              oldOversightd: initialValues.oversight,
              campusId: campusId,
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
        removeChurch: RemoveStreamCampus,
        addChurch: AddCampusesStream,
        logChurchHistory: LogStreamHistory,
      }

      const args = {
        initialValues,
        campusId,
      }

      Promise.all([
        await removeOldChurches(lists, mutations),
        await addNewChurches(lists, mutations, args),
      ])

      clickCard({ id: values.oversight, __typename: 'Oversight' })
      onSubmitProps.setSubmitting(false)
      onSubmitProps.resetForm()
      navigate(`/campus/displaydetails`)
    } catch (err: any) {
      throwToSentry('There was a problem updating this campus', err)
      onSubmitProps.setSubmitting(false)
    }
  }

  if (loading) {
    return <LoadingScreen />
  }

  return (
    <CampusForm
      initialValues={initialValues}
      onSubmit={onSubmit}
      title={`Update Campus Form`}
      newCampus={false}
    />
  )
}

export default UpdateCampus
