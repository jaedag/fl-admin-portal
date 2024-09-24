import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { throwToSentry } from '../../../global-utils'
import { GET_COUNCIL_TEAMS } from '../../../queries/ListQueries'
import { CREATE_TEAM_MUTATION } from './CreateMutations'
import { ChurchContext } from '../../../contexts/ChurchContext'
import { NEW_TEAM_LEADER } from './MakeLeaderMutations'
import TeamForm, { TeamFormValues } from '../reusable-forms/TeamForm'
import { FormikHelpers } from 'formik'

const CreateTeam = () => {
  const { clickCard, councilId } = useContext(ChurchContext)

  const navigate = useNavigate()

  const initialValues: TeamFormValues = {
    name: '',
    leaderId: '',
    leaderName: '',
    leaderEmail: '',
    council: councilId,
  }

  const [NewTeamLeader] = useMutation(NEW_TEAM_LEADER)
  const [CreateTeam] = useMutation(CREATE_TEAM_MUTATION, {
    refetchQueries: [
      { query: GET_COUNCIL_TEAMS, variables: { id: councilId } },
    ],
    onCompleted: (newTeamData) => {
      clickCard(newTeamData.CreateTeam)
      navigate(`/team/displaydetails`)
    },
  })

  //onSubmit receives the form state as argument

  const onSubmit = async (
    values: TeamFormValues,
    onSubmitProps: FormikHelpers<TeamFormValues>
  ) => {
    onSubmitProps.setSubmitting(true)
    try {
      if (!values.leaderEmail) {
        onSubmitProps.setSubmitting(false)
        throw new Error('Leader email is required')
      }

      const res = await CreateTeam({
        variables: {
          name: values.name,
          leaderId: values.leaderId,
          councilId: values.council,
        },
      })

      await NewTeamLeader({
        variables: {
          leaderId: values.leaderId,
          teamId: res.data.CreateTeam.council.teams[0].id,
        },
      })

      clickCard({ id: values.council, __typename: 'Council' })
      clickCard(res.data.CreateTeam)
      onSubmitProps.setSubmitting(false)
      onSubmitProps.resetForm()
      navigate(`/team/displaydetails`)
    } catch (error: any) {
      throwToSentry('There was an error creating the team', error)
      onSubmitProps.setSubmitting(false)
    }
  }
  return (
    <TeamForm
      initialValues={initialValues}
      onSubmit={onSubmit}
      title={`Create a New Team`}
      newTeam={true}
    />
  )
}

export default CreateTeam
