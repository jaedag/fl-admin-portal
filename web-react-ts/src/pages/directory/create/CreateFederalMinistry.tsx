import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { throwToSentry } from '../../../global-utils'
import { CREATE_FEDERAL_MINISTRY_MUTATION } from './CreateMutations'
import { ChurchContext } from '../../../contexts/ChurchContext'
import { NEW_FEDERAL_MINISTRY_LEADER } from './MakeLeaderMutations'
import { FormikHelpers } from 'formik'
import FederalMinistryForm, {
  FederalMinistryFormValues,
} from '../reusable-forms/FederalMinistryForm'

const CreateFederalMinistry = () => {
  const { clickCard } = useContext(ChurchContext)

  const navigate = useNavigate()

  const initialValues: FederalMinistryFormValues = {
    leaderId: '',
    leaderName: '',
    name: '',
    gatheringService: '',
  }

  const [NewFederalministryLeader] = useMutation(NEW_FEDERAL_MINISTRY_LEADER)
  const [CreateFederalministry] = useMutation(CREATE_FEDERAL_MINISTRY_MUTATION)

  //onSubmit receives the form state as argument
  const onSubmit = (
    values: FederalMinistryFormValues,
    onSubmitProps: FormikHelpers<FederalMinistryFormValues>
  ) => {
    onSubmitProps.setSubmitting(true)

    CreateFederalministry({
      variables: {
        gatheringServiceId: values.gatheringService,
        leaderId: values.leaderId,
        name: values.name,
      },
    })
      .then((res) => {
        clickCard(res.data.CreateFederalministry)
        NewFederalministryLeader({
          variables: {
            leaderId: values.leaderId,
            federalMinistryId: res.data.CreateFederalministry.id,
          },
        }).catch((error) => {
          throwToSentry('There was an error adding leader', error)
        })
        clickCard({
          id: values.gatheringService,
          __typename: 'GatheringService',
        })
        clickCard(res.data.CreateFederalministry)
        onSubmitProps.setSubmitting(false)
        onSubmitProps.resetForm()
        navigate(`/federalministry/displaydetails`)
      })
      .catch((error) => {
        throwToSentry('There was an error creating Federal Ministry', error)
      })
  }

  return (
    <FederalMinistryForm
      initialValues={initialValues}
      onSubmit={onSubmit}
      title={`Create a New Federal Ministry`}
      newFederalMinistry
    />
  )
}
export default CreateFederalMinistry
