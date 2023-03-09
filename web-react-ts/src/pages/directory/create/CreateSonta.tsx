import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { throwToSentry } from '../../../global-utils'
import { CREATE_SONTA_MUTATION } from './CreateMutations'
import { ChurchContext } from '../../../contexts/ChurchContext'
import { NEW_SONTA_LEADER } from './MakeLeaderMutations'
import { FormikHelpers } from 'formik'
import SontaForm, { SontaFormValues } from '../reusable-forms/SontaForm'

const CreateSonta = () => {
  const { clickCard } = useContext(ChurchContext)

  const navigate = useNavigate()

  const initialValues: SontaFormValues = {
    ministry: '',
    leaderId: '',
    leaderName: '',
    hub: '',
  }

  const [NewSontaLeader] = useMutation(NEW_SONTA_LEADER)
  const [CreateSonta] = useMutation(CREATE_SONTA_MUTATION)

  //onSubmit receives the form state as argument
  const onSubmit = (
    values: SontaFormValues,
    onSubmitProps: FormikHelpers<SontaFormValues>
  ) => {
    onSubmitProps.setSubmitting(true)

    CreateSonta({
      variables: {
        ministryId: values.ministry,
        leaderId: values.leaderId,
        hubId: values.hub,
      },
    })
      .then((res) => {
        clickCard(res.data.CreateSonta)
        NewSontaLeader({
          variables: {
            leaderId: values.leaderId,
            sontaId: res.data.CreateSonta.id,
          },
        }).catch((error) => {
          throwToSentry('There was an error adding leader', error)
        })

        clickCard({ id: values.ministry, __typename: 'Ministry' })
        clickCard({ id: values.hub, __typename: 'Hub' })
        clickCard(res.data.CreateSonta)
        onSubmitProps.setSubmitting(false)
        onSubmitProps.resetForm()
        navigate(`/sonta/displaydetails`)
      })
      .catch((error) => {
        throwToSentry('There was an error creating sonta', error)
      })
  }

  return (
    <SontaForm
      initialValues={initialValues}
      onSubmit={onSubmit}
      title={`Create a New Sonta`}
      newSonta
    />
  )
}

export default CreateSonta
