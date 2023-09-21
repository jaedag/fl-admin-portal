import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { GET_BACENTA_FELLOWSHIPS } from '../../../queries/ListQueries'
import { UPDATE_FELLOWSHIP } from './UpdateMutations'
import { ChurchContext } from '../../../contexts/ChurchContext'
import { DISPLAY_FELLOWSHIP } from '../display/ReadQueries'
import { LOG_FELLOWSHIP_HISTORY } from './LogMutations'
import { MAKE_FELLOWSHIP_LEADER } from './ChangeLeaderMutations'
import FellowshipForm, {
  FellowshipFormValues,
} from 'pages/directory/reusable-forms/FellowshipForm'
import { alertMsg, repackDecimals, throwToSentry } from 'global-utils'
import {
  SET_VACATION_FELLOWSHIP,
  SET_ACTIVE_FELLOWSHIP,
  SET_ONLINE_FELLOWSHIP,
} from './StatusChanges'
import { FormikHelpers } from 'formik'
import ApolloWrapper from 'components/base-component/ApolloWrapper'

const UpdateFellowship = () => {
  const { fellowshipId } = useContext(ChurchContext)
  const { data, loading, error } = useQuery(DISPLAY_FELLOWSHIP, {
    variables: { id: fellowshipId },
  })

  const navigate = useNavigate()

  const fellowship = data?.fellowships[0]

  const initialValues: FellowshipFormValues = {
    name: fellowship?.name,
    leaderId: fellowship?.leader?.id,
    leaderName: `${fellowship?.leader?.firstName} ${fellowship?.leader?.lastName} `,
    leaderEmail: fellowship?.leader?.email,
    bacenta: fellowship?.bacenta?.id,
    meetingDay: fellowship?.meetingDay?.day,
    vacationStatus: fellowship?.vacationStatus,
    venueLatitude: repackDecimals(fellowship?.location?.latitude) ?? '',
    venueLongitude: repackDecimals(fellowship?.location?.longitude) ?? '',
  }

  const [LogFellowshipHistory] = useMutation(LOG_FELLOWSHIP_HISTORY)
  const [MakeFellowshipLeader] = useMutation(MAKE_FELLOWSHIP_LEADER)
  const [UpdateFellowship] = useMutation(UPDATE_FELLOWSHIP, {
    refetchQueries: [
      {
        query: GET_BACENTA_FELLOWSHIPS,
        variables: { id: initialValues.bacenta },
      },
    ],
  })
  const [SetFellowshipOnVacation] = useMutation(SET_VACATION_FELLOWSHIP)
  const [SetFellowshipActive] = useMutation(SET_ACTIVE_FELLOWSHIP)
  const [SetOnlineFellowship] = useMutation(SET_ONLINE_FELLOWSHIP)

  //onSubmit receives the form state as argument
  const onSubmit = async (
    values: FellowshipFormValues,
    onSubmitProps: FormikHelpers<FellowshipFormValues>
  ) => {
    const { setSubmitting, resetForm } = onSubmitProps
    setSubmitting(true)

    values.venueLongitude = parseFloat(values.venueLongitude.toString())
    values.venueLatitude = parseFloat(values.venueLatitude.toString())

    try {
      await UpdateFellowship({
        variables: {
          id: fellowshipId,
          name: values.name,
          leaderId: values.leaderId,
          meetingDay: values.meetingDay,
          venueLongitude: values.venueLongitude,
          venueLatitude: values.venueLatitude,
        },
      })

      //Log if the Fellowship Name Changes
      if (values.name !== initialValues.name) {
        await LogFellowshipHistory({
          variables: {
            fellowshipId: fellowshipId,
            newLeaderId: '',
            oldLeaderId: '',
            oldBacentaId: '',
            newBacentaId: '',

            historyRecord: `The Fellowship name has been changed from ${initialValues.name} to ${values.name}`,
          },
        })
      }

      // Log if the Meeting Day Changes
      if (values.meetingDay !== initialValues.meetingDay) {
        await LogFellowshipHistory({
          variables: {
            fellowshipId: fellowshipId,
            newLeaderId: '',
            oldLeaderId: '',
            oldBacentaId: '',
            newBacentaId: '',

            historyRecord: `${values.name} Fellowship has changed their meeting day from ${initialValues.meetingDay} to ${values.meetingDay}`,
          },
        })
      }

      // Log if the Vacation Status Changes
      if (values.vacationStatus !== initialValues.vacationStatus) {
        if (values.vacationStatus === 'Vacation') {
          await SetFellowshipOnVacation({
            variables: {
              fellowshipId: fellowshipId,
            },
          })
        }
        if (values.vacationStatus === 'Active') {
          await SetFellowshipActive({
            variables: {
              fellowshipId: fellowshipId,
            },
          })
        }
        if (values.vacationStatus === 'Online') {
          await SetOnlineFellowship({
            variables: {
              fellowshipId: fellowshipId,
            },
          })
        }
      }

      //Log if the Venue Changes
      if (
        repackDecimals(values.venueLongitude) !==
          repackDecimals(initialValues.venueLongitude) ||
        repackDecimals(values.venueLatitude) !==
          repackDecimals(initialValues.venueLatitude)
      ) {
        await LogFellowshipHistory({
          variables: {
            fellowshipId: fellowshipId,
            newLeaderId: '',
            oldLeaderId: '',
            oldBacentaId: '',
            newBacentaId: '',

            historyRecord: `${values.name} Fellowship has changed their venue`,
          },
        })
      }

      //Log if the Leader Changes
      if (values.leaderId !== initialValues.leaderId) {
        await MakeFellowshipLeader({
          variables: {
            oldLeaderId: initialValues.leaderId || 'old-leader',
            newLeaderId: values.leaderId,
            fellowshipId: fellowshipId,
          },
        })
        alertMsg('Leader Changed Successfully')
      }

      resetForm()
      navigate(`/fellowship/displaydetails`)
    } catch (error: any) {
      const errorArray = error.toString().replace('Error: ', '').split('\n')
      if (errorArray[0] === errorArray[1]) {
        throwToSentry('There was a problem changing the leader', errorArray[0])
      } else {
        throwToSentry('There was an error updating this fellowship', error)
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <ApolloWrapper data={data} loading={loading} error={error}>
      <FellowshipForm
        title="Update Fellowship"
        initialValues={initialValues}
        onSubmit={onSubmit}
        newFellowship={false}
      />
    </ApolloWrapper>
  )
}

export default UpdateFellowship
