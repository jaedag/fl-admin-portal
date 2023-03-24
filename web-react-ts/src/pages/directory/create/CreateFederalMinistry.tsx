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
    leaderEmail: '',
    name: '',
    gatheringService: '',
  }

  const [NewFederalministryLeader] = useMutation(NEW_FEDERAL_MINISTRY_LEADER)
  const [CreateFederalministry] = useMutation(CREATE_FEDERAL_MINISTRY_MUTATION)

  //onSubmit receives the form state as argument
  const onSubmit = async (
    values: FederalMinistryFormValues,
    onSubmitProps: FormikHelpers<FederalMinistryFormValues>
  ) => {
    try {
      onSubmitProps.setSubmitting(true)

      if (!values.leaderEmail) {
        throw new Error('Leader email is required')
      }

      const res = await CreateFederalministry({
        variables: {
          gatheringServiceId: values.gatheringService,
          leaderId: values.leaderId,
          name: values.name,
        },
      })

      await NewFederalministryLeader({
        variables: {
          leaderId: values.leaderId,
          federalMinistryId: res.data.CreateFederalministry.id,
        },
      })

      clickCard({
        id: values.gatheringService,
        __typename: 'GatheringService',
      })
      clickCard(res.data.CreateFederalministry)
      onSubmitProps.setSubmitting(false)
      onSubmitProps.resetForm()
      navigate(`/federalministry/displaydetails`)
    } catch (error: unknown) {
      throwToSentry('There was an error creating Federal Ministry', error)
    }
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
