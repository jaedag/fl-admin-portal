import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { alertMsg, throwToSentry } from '../../../global-utils'
import { GET_DENOMINATION_OVERSIGHTS } from '../../../queries/ListQueries'
import {
  UPDATE_OVERSIGHT_MUTATION,
  ADD_OVERSIGHT_CAMPUS,
  REMOVE_OVERSIGHT_DENOMINATION,
  REMOVE_CAMPUS_OVERSIGHT,
  ADD_OVERSIGHT_DENOMINATION,
} from './UpdateMutations'
import { DISPLAY_OVERSIGHT } from '../display/ReadQueries'
import { LOG_OVERSIGHT_HISTORY, LOG_CAMPUS_HISTORY } from './LogMutations'
import { MAKE_OVERSIGHT_LEADER } from './ChangeLeaderMutations'
import OversightForm, {
  OversightFormValues,
} from 'pages/directory/reusable-forms/OversightForm'
import { MAKE_OVERSIGHT_INACTIVE } from './CloseChurchMutations'
import { addNewChurches, removeOldChurches } from './directory-utils'
import { FormikHelpers } from 'formik'
import LoadingScreen from 'components/base-component/LoadingScreen'
import { ChurchContext } from 'contexts/ChurchContext'

const UpdateOversight = () => {
  const { oversightId, clickCard } = useContext(ChurchContext)
  const { data, loading } = useQuery(DISPLAY_OVERSIGHT, {
    variables: { id: oversightId },
  })

  const navigate = useNavigate()
  const oversight = data?.oversights[0]
  const initialValues: OversightFormValues = {
    name: oversight?.name,
    leaderName: oversight?.leader?.fullName ?? '',
    leaderId: oversight?.leader?.id || '',
    leaderEmail: oversight?.leader?.email || '',
    denomination: oversight?.denomination?.id,
    campuses: oversight?.campuses?.length ? oversight.campuses : [''],
  }
  const [LogOversightHistory] = useMutation(LOG_OVERSIGHT_HISTORY, {
    refetchQueries: [
      {
        query: DISPLAY_OVERSIGHT,
        variables: { id: oversightId },
      },
    ],
  })
  const [LogCampusHistory] = useMutation(LOG_CAMPUS_HISTORY, {
    refetchQueries: [
      {
        query: DISPLAY_OVERSIGHT,
        variables: { id: oversightId },
      },
    ],
  })

  const [MakeOversightLeader] = useMutation(MAKE_OVERSIGHT_LEADER)
  const [UpdateOversight] = useMutation(UPDATE_OVERSIGHT_MUTATION, {
    refetchQueries: [
      {
        query: GET_DENOMINATION_OVERSIGHTS,
        variables: { id: oversight.denomination.id },
      },
    ],
  })

  //Changes downwards. ie. Bacenta Changes underneath constituency
  const [AddOversightsCampus] = useMutation(ADD_OVERSIGHT_CAMPUS)
  const [RemoveCampusOversight] = useMutation(REMOVE_CAMPUS_OVERSIGHT, {
    onCompleted: (data) => {
      const prevOversight = data.updateOversight.oversights[0]
      const campus = data.updateCampus.campuses[0]
      let newOversightId = ''
      let oldOversightId = ''
      let historyRecord

      if (prevOversight.id !== oversightId) {
        //Bacenta has previous constituency which is not current constituency and is joining
        oldOversightId = prevOversight.id
        newOversightId = oversightId
        historyRecord = `${campus.name} Campus has been moved to ${initialValues.name} Oversight from ${prevOversight.name} Oversight`
      }

      //After removing the bacenta from a constituency, then you log that change.
      LogCampusHistory({
        variables: {
          campus: campus.id,
          newLeaderId: '',
          oldLeaderId: '',
          newOversightId: newOversightId,
          oldOversightId: oldOversightId,
          historyRecord: historyRecord,
        },
      })
    },
  })
  const [CloseDownCampus] = useMutation(MAKE_OVERSIGHT_INACTIVE)

  //Changes upwards. it. Changes to the Denomination the Oversight Oversight is under
  const [RemoveOversightDenomination] = useMutation(
    REMOVE_OVERSIGHT_DENOMINATION
  )
  const [AddOversightDenomination] = useMutation(ADD_OVERSIGHT_DENOMINATION, {
    onCompleted: (data) => {
      const oldDenomination = data.updateDenomination.denomination[0]
      const newDenomination = data.UpdateOversight.oversights[0].denomination

      let recordIfOldDenomination = `${initialValues.name} Oversight has been moved from ${oldDenomination.name} Denomination to ${newDenomination.name} Denomination`

      //After Adding the campus to a oversight, then you log that change.
      LogOversightHistory({
        variables: {
          oversightId: oversightId,
          newLeaderId: '',
          oldLeaderId: '',
          newDenominationId: data.UpdateOversight.oversight[0].denomination.id,
          oldDenomination: oversight?.denomination.id,
          historyRecord: recordIfOldDenomination,
        },
      })
    },
  })

  //onSubmit receives the form state as argument
  const onSubmit = async (
    values: OversightFormValues,
    onSubmitProps: FormikHelpers<OversightFormValues>
  ) => {
    onSubmitProps.setSubmitting(true)

    try {
      await UpdateOversight({
        variables: {
          oversightId: oversightId,
          name: values.name,
          denominationId: values.denomination,
        },
      })

      //Log if Oversights Name Changes
      if (values.name !== initialValues.name) {
        await LogOversightHistory({
          variables: {
            oversightId: oversightId,
            newLeaderId: '',
            oldLeaderId: '',
            oldDenominationId: '',
            newDenominationId: '',
            historyRecord: `Oversight name has been changed from ${initialValues.name} to ${values.name}`,
          },
        })
      }

      //Log if the Leader Changes
      if (values.leaderId !== initialValues.leaderId) {
        try {
          await MakeOversightLeader({
            variables: {
              oldLeaderId: initialValues.leaderId || 'old-leader',
              newLeaderId: values.leaderId,
              oversightId: oversightId,
            },
          })
          alertMsg('Leader Changed Successfully')
          navigate(`/oversight/displaydetails`)
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

      //Log if Oversight Changes
      if (values.denomination !== oversight.denomination.id) {
        try {
          await RemoveOversightDenomination({
            variables: {
              higherChurch: initialValues.denomination,
              lowerChurch: [oversightId],
            },
          })
          await AddOversightDenomination({
            variables: {
              denominationId: values.denomination,
              oldDenominationd: initialValues.denomination,
              oversightId: oversightId,
            },
          })
        } catch (error: any) {
          throwToSentry(error)
        }
      }

      //For the Adding and Removing of Campuses

      const oldCampusList =
        initialValues.campuses?.map((campus) => campus) || []

      const newCampusList = values.campuses?.map((campus) => campus) || []

      const lists = {
        oldChurches: oldCampusList,
        newChurches: newCampusList,
      }

      const mutations = {
        closeDownChurch: CloseDownCampus,
        removeChurch: RemoveCampusOversight,
        addChurch: AddOversightsCampus,
        logChurchHistory: LogCampusHistory,
      }

      const args = {
        initialValues,
        oversightId,
      }

      Promise.all([
        await removeOldChurches(lists, mutations),
        await addNewChurches(lists, mutations, args),
      ])

      clickCard({ id: values.denomination, __typename: 'Denomination' })
      onSubmitProps.setSubmitting(false)
      onSubmitProps.resetForm()
      navigate(`/oversight/displaydetails`)
    } catch (err: any) {
      throwToSentry('There was a problem updating this oversight', err)
      onSubmitProps.setSubmitting(false)
    }
  }

  if (loading) {
    return <LoadingScreen />
  }

  return (
    <OversightForm
      initialValues={initialValues}
      onSubmit={onSubmit}
      title={`Update Oversight Form`}
      newOversight={false}
    />
  )
}

export default UpdateOversight
