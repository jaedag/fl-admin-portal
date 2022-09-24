import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { GET_CONSTITUENCY_BACENTAS } from '../../../queries/ListQueries'
import { UPDATE_SONTA_MUTATION } from './UpdateMutations'
import { ChurchContext } from '../../../contexts/ChurchContext'
import { DISPLAY_SONTA } from '../display/ReadQueries'
import { LOG_SONTA_HISTORY } from './LogMutations'
import { MAKE_SONTA_LEADER } from './ChangeLeaderMutations'
import SontaForm, {
  SontaFormValues,
} from 'pages/directory/reusable-forms/SontaForm'
import { throwToSentry } from 'global-utils'
import { FormikHelpers } from 'formik'

const UpdateSonta = () => {
  const { sontaId, constituencyId, setConstituencyId } =
    useContext(ChurchContext)

  const { data: sontaData, loading: sontaLoading } = useQuery(DISPLAY_SONTA, {
    variables: { id: sontaId },
  })

  const navigate = useNavigate()
  const sonta = sontaData?.sontas[0]

  const initialValues: SontaFormValues = {
    name: sonta?.name,
    leaderName: sonta?.leader.fullName ?? '',
    leaderId: sonta?.leader?.id || '',
    ministrySelect: sonta?.ministry.id || '',
    constituency: sonta?.constituency?.id,
  }

  const [LogSontaHistory] = useMutation(LOG_SONTA_HISTORY, {
    refetchQueries: [{ query: DISPLAY_SONTA, variables: { id: sontaId } }],
  })

  const [MakeSontaLeader] = useMutation(MAKE_SONTA_LEADER)
  const [UpdateSonta] = useMutation(UPDATE_SONTA_MUTATION, {
    refetchQueries: [
      { query: GET_CONSTITUENCY_BACENTAS, variables: { id: constituencyId } },
      {
        query: GET_CONSTITUENCY_BACENTAS,
        variables: { id: initialValues.constituency },
      },
    ],
  })

  //onSubmit receives the form state as argument
  const onSubmit = (
    values: SontaFormValues,
    onSubmitProps: FormikHelpers<SontaFormValues>
  ) => {
    onSubmitProps.setSubmitting(true)
    setConstituencyId(values.constituency)

    //Log if Sonta Name Changes
    if (values.name !== initialValues.name) {
      LogSontaHistory({
        variables: {
          sontaId: sontaId,
          newLeaderId: '',
          oldLeaderId: '',
          historyRecord: `Sonta name has been changed from ${initialValues.name} to ${values.name}`,
        },
      })
    }

    //Log if the Leader Changes
    if (values.leaderId !== initialValues.leaderId) {
      MakeSontaLeader({
        variables: {
          oldLeaderId: initialValues.leaderId,
          newLeaderId: values.leaderId,
          sontaId: sontaId,
        },
      }).catch((err) => throwToSentry('There was an error adding leader', err))
    }

    UpdateSonta({
      variables: {
        sontaId: sontaId,
        sontaName: values.name,
        leaderId: values.leaderId,
      },
    })
      .then(() => navigate(`/sonta/displaydetails`))
      .catch((error: any) =>
        throwToSentry('There was an error updating this sonta', error)
      )

    onSubmitProps.setSubmitting(false)
    onSubmitProps.resetForm()
  }

  return (
    <SontaForm
      initialValues={initialValues}
      onSubmit={onSubmit}
      title="Sonta Update Form"
      loading={sontaLoading}
      newSonta={false}
    />
  )
}

export default UpdateSonta
