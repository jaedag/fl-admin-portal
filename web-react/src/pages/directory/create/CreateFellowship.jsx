import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { CREATE_FELLOWSHIP_MUTATION } from './CreateMutations'
import { CREATE_FELLOWSHIP_EQUIPMENT_CAMPAIGN } from '../../campaigns/CampaignQueries'
import { ChurchContext } from '../../../contexts/ChurchContext'
import { NEW_FELLOWSHIP_LEADER } from './MakeLeaderMutations'
import FellowshipForm from 'pages/directory/reusable-forms/FellowshipForm'
import { throwErrorMsg } from 'global-utils'

const CreateFellowship = () => {
  const { clickCard, constituencyId, bacentaId } = useContext(ChurchContext)
  const navigate = useNavigate()

  const initialValues = {
    name: '',
    leaderId: '',
    constituencySelect: constituencyId ?? '',
    bacenta: bacentaId ?? '',
    meetingDay: '',
    vacationStatus: '',
    venueLatitude: '',
    venueLongitude: '',
  }

  const [NewFellowshipLeader] = useMutation(NEW_FELLOWSHIP_LEADER)
  const [CreateEquipmentCampaign] = useMutation(
    CREATE_FELLOWSHIP_EQUIPMENT_CAMPAIGN
  )
  const [CreateFellowship] = useMutation(CREATE_FELLOWSHIP_MUTATION)

  //onSubmit receives the form state as argument
  const onSubmit = async (values, onSubmitProps) => {
    onSubmitProps.setSubmitting(true)
    clickCard({ id: values.bacenta, __typename: 'Bacenta' })

    try {
      const res = await CreateFellowship({
        variables: {
          name: values.name,
          bacentaId: values.bacenta,
          meetingDay: values.meetingDay,
          leaderId: values.leaderId,
          venueLongitude: parseFloat(values.venueLongitude),
          venueLatitude: parseFloat(values.venueLatitude),
        },
      })
      clickCard(res.data.CreateFellowship)

      try {
        await NewFellowshipLeader({
          variables: {
            leaderId: values.leaderId,
            fellowshipId: res.data.CreateFellowship.id,
          },
        })
      } catch (error) {
        throwErrorMsg('There was an error setting the leader', error)
      }

      try {
        await CreateEquipmentCampaign({
          variables: {
            fellowshipId: res.data.CreateFellowship.id,
          },
        })
      } catch (error) {
        throwErrorMsg('There was an error creating a campaign', error)
      }
    } catch (error) {
      throwErrorMsg('There was an error creating council', error)
    }

    onSubmitProps.setSubmitting(false)
    onSubmitProps.resetForm()
    navigate('/fellowship/displaydetails')
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
