import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { alertMsg, throwToSentry } from '../../../global-utils'
import { GET_CONSTITUENCY_BACENTAS } from '../../../queries/ListQueries'
import { UPDATE_BACENTA_MUTATION } from './UpdateMutations'
import { ChurchContext } from '../../../contexts/ChurchContext'
import { DISPLAY_BACENTA } from '../display/ReadQueries'
import { LOG_BACENTA_HISTORY } from './LogMutations'
import { MAKE_BACENTA_LEADER } from './ChangeLeaderMutations'
import BacentaForm, { BacentaFormValues } from '../reusable-forms/BacentaForm'
import { SET_ACTIVE_BACENTA, SET_VACATION_BACENTA } from './StatusChanges'
import { FormikHelpers } from 'formik'
import ApolloWrapper from 'components/base-component/ApolloWrapper'

const UpdateBacenta = () => {
  const { bacentaId } = useContext(ChurchContext)
  const { data, loading, error } = useQuery(DISPLAY_BACENTA, {
    variables: { id: bacentaId },
  })
  const navigate = useNavigate()
  const bacenta = data?.bacentas[0]

  const initialValues: BacentaFormValues = {
    name: bacenta?.name,
    leaderName:
      bacenta?.leader?.firstName + ' ' + bacenta?.leader?.lastName ?? '',
    leaderId: bacenta?.leader?.id || '',
    leaderEmail: bacenta?.leader?.email ?? '',
    constituency: bacenta?.constituency?.id,
    fellowships: bacenta?.fellowships.length ? bacenta?.fellowships : [''],
    vacationStatus: bacenta?.vacationStatus,
    graduationStatus: bacenta?.graduationStatus,
  }

  const [LogBacentaHistory] = useMutation(LOG_BACENTA_HISTORY, {
    refetchQueries: [{ query: DISPLAY_BACENTA, variables: { id: bacentaId } }],
  })

  const [MakeBacentaLeader] = useMutation(MAKE_BACENTA_LEADER)
  const [SetBacentaOnVacation] = useMutation(SET_VACATION_BACENTA)
  const [SetBacentaActive] = useMutation(SET_ACTIVE_BACENTA)
  const [UpdateBacenta] = useMutation(UPDATE_BACENTA_MUTATION, {
    refetchQueries: [
      {
        query: GET_CONSTITUENCY_BACENTAS,
        variables: { id: initialValues.constituency },
      },
    ],
  })

  //onSubmit receives the form state as argument
  const onSubmit = async (
    values: BacentaFormValues,
    onSubmitProps: FormikHelpers<BacentaFormValues>
  ) => {
    const { setSubmitting, resetForm } = onSubmitProps
    setSubmitting(true)
    try {
      await UpdateBacenta({
        variables: {
          bacentaId: bacentaId,
          name: values.name,
          leaderId: values.leaderId,
          constituencyId: values.constituency,
        },
      })

      //Log if Bacenta Name Changes
      if (values.name !== initialValues.name) {
        await LogBacentaHistory({
          variables: {
            bacentaId: bacentaId,
            newLeaderId: '',
            oldLeaderId: '',
            oldConstituencyId: '',
            newConstituencyId: '',
            historyRecord: `Bacenta name has been changed from ${initialValues.name} to ${values.name}`,
          },
        })
      }

      //Change if the vacation status changes
      if (values.vacationStatus !== initialValues.vacationStatus) {
        if (values.vacationStatus === 'Vacation') {
          await SetBacentaOnVacation({
            variables: {
              bacentaId: bacentaId,
            },
          })
        }
        if (values.vacationStatus === 'Active') {
          await SetBacentaActive({
            variables: {
              bacentaId: bacentaId,
            },
          })
        }
      }

      //Log if the Leader Changes
      if (values.leaderId !== initialValues.leaderId) {
        try {
          await MakeBacentaLeader({
            variables: {
              oldLeaderId: initialValues.leaderId || 'old-leader',
              newLeaderId: values.leaderId,
              bacentaId: bacentaId,
            },
          })
          alertMsg('Leader Changed Successfully')
          navigate(`/bacenta/displaydetails`)
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

      resetForm()
      navigate(`/bacenta/displaydetails`)
    } catch (error: any) {
      throwToSentry(error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <ApolloWrapper data={data} loading={loading} error={error}>
      <BacentaForm
        initialValues={initialValues}
        onSubmit={onSubmit}
        title="Update Bacenta Form"
        newBacenta={false}
      />
    </ApolloWrapper>
  )
}

export default UpdateBacenta
