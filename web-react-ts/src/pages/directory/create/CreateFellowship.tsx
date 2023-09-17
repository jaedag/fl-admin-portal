import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { CREATE_FELLOWSHIP_MUTATION } from './CreateMutations'
import { ChurchContext } from '../../../contexts/ChurchContext'
import { NEW_FELLOWSHIP_LEADER } from './MakeLeaderMutations'
import FellowshipForm, {
  FellowshipFormValues,
} from 'pages/directory/reusable-forms/FellowshipForm'
import { throwToSentry } from 'global-utils'
import { FormikHelpers } from 'formik'

const CreateFellowship = () => {
  const { clickCard, bacentaId } = useContext(ChurchContext)
  const navigate = useNavigate()

  const initialValues: FellowshipFormValues = {
    name: '',
    leaderId: '',
    leaderName: '',
    leaderEmail: '',
    bacenta: bacentaId ?? '',
    meetingDay: '',
    vacationStatus: '',
    venueLatitude: '',
    venueLongitude: '',
  }

  const [NewFellowshipLeader] = useMutation(NEW_FELLOWSHIP_LEADER)
  const [CreateFellowship] = useMutation(CREATE_FELLOWSHIP_MUTATION)

  //onSubmit receives the form state as argument
  const onSubmit = async (
    values: FellowshipFormValues,
    onSubmitProps: FormikHelpers<FellowshipFormValues>
  ) => {
    const { setSubmitting, resetForm } = onSubmitProps
    setSubmitting(true)

    try {
      if (!values.leaderEmail) {
        setSubmitting(false)
        throw new Error('Leader email is required')
      }

      const res = await CreateFellowship({
        variables: {
          name: values.name,
          bacentaId: values.bacenta,
          meetingDay: values.meetingDay,
          leaderId: values.leaderId,
          venueLongitude: parseFloat(values.venueLongitude.toString()),
          venueLatitude: parseFloat(values.venueLatitude.toString()),
        },
      })

      await NewFellowshipLeader({
        variables: {
          leaderId: values.leaderId,
          fellowshipId: res.data.CreateFellowship?.id ?? '',
        },
      })

      clickCard(res.data.CreateFellowship)
      setSubmitting(false)
      resetForm()
      navigate('/fellowship/displaydetails')
    } catch (error: any) {
      throwToSentry('There was an error creating fellowship', error)
      setSubmitting(false)
    }
  }

  return (
    <FellowshipForm
      title="Start a New Fellowship"
      initialValues={initialValues}
      onSubmit={onSubmit}
      newFellowship={true}
    />
  )
}

export default CreateFellowship
