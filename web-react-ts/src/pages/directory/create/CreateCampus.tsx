import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { throwToSentry } from '../../../global-utils'
import { CREATE_CAMPUS_MUTATION } from './CreateMutations'
import { ChurchContext } from '../../../contexts/ChurchContext'
import { NEW_CAMPUS_LEADER } from './MakeLeaderMutations'
import CampusForm, {
  CampusFormValues,
} from 'pages/directory/reusable-forms/CampusForm'
import { FormikHelpers } from 'formik'

const CreateCampus = () => {
  const { clickCard, oversightId } = useContext(ChurchContext)

  const navigate = useNavigate()

  const initialValues: CampusFormValues = {
    name: '',
    leaderId: '',
    leaderName: '',
    leaderEmail: '',
    incomeTracking: '',
    currency: '',
    conversionRateToDollar: 0,
    oversight: oversightId,
  }

  const [NewCampusLeader] = useMutation(NEW_CAMPUS_LEADER)
  const [CreateCampus] = useMutation(CREATE_CAMPUS_MUTATION)

  //onSubmit receives the form state as argument
  const onSubmit = async (
    values: CampusFormValues,
    onSubmitProps: FormikHelpers<CampusFormValues>
  ) => {
    onSubmitProps.setSubmitting(true)
    try {
      if (!values.leaderEmail) {
        onSubmitProps.setSubmitting(false)
        throw new Error('Leader email is required')
      }

      const res = await CreateCampus({
        variables: {
          name: values.name,
          leaderId: values.leaderId,
          oversightId: values.oversight,
          noIncomeTracking: values.incomeTracking === 'Yes' ? false : true,
          currency: values.currency,
          conversionRateToDollar: parseFloat(
            values.conversionRateToDollar.toString()
          ),
        },
      })

      await NewCampusLeader({
        variables: {
          leaderId: values.leaderId,
          campusId: res.data.CreateCampus.id,
        },
      })

      clickCard({ id: values.oversight, __typename: 'Oversight' })
      clickCard(res.data.CreateCampus)
      onSubmitProps.setSubmitting(false)
      onSubmitProps.resetForm()
      navigate(`/campus/displaydetails`)
    } catch (error: any) {
      onSubmitProps.setSubmitting(false)
      throwToSentry('There was an error creating campus', error)
    }
  }

  return (
    <CampusForm
      initialValues={initialValues}
      onSubmit={onSubmit}
      title={`Create a New Campus`}
      newCampus
    />
  )
}

export default CreateCampus
