import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { alertMsg, throwToSentry } from '../../../global-utils'
import { UPDATE_TEAM_MUTATION } from './UpdateMutations'
import { ChurchContext } from '../../../contexts/ChurchContext'
import { DISPLAY_TEAM } from '../display/ReadQueries'
import { LOG_TEAM_HISTORY } from './LogMutations'
import { MAKE_TEAM_LEADER } from './ChangeLeaderMutations'
import TeamForm, {
  TeamFormValues,
} from 'pages/directory/reusable-forms/TeamForm'
import { FormikHelpers } from 'formik'
import ApolloWrapper from 'components/base-component/ApolloWrapper'

const UpdateTeam = () => {
  const { teamId } = useContext(ChurchContext)
  const { data, loading, error } = useQuery(DISPLAY_TEAM, {
    variables: { id: teamId },
  })

  const navigate = useNavigate()
  const team = data?.teams[0]
  const initialValues: TeamFormValues = {
    name: team?.name,
    leaderName: team?.leader?.firstName + ' ' + team?.leader?.lastName ?? '',
    adminId: team?.admin?.id || '',
    leaderId: team?.leader?.id || '',
    leaderEmail: team?.leader?.email || '',
    council: team?.council,
    bacentas: team?.bacentas?.length ? team.bacentas : [''],
    hubs: team?.hubs?.length ? team.hubs : [''],
  }
  const [LogTeamHistory] = useMutation(LOG_TEAM_HISTORY, {
    refetchQueries: [{ query: DISPLAY_TEAM, variables: { id: teamId } }],
  })

  const [MakeTeamLeader] = useMutation(MAKE_TEAM_LEADER)
  const [UpdateTeam] = useMutation(UPDATE_TEAM_MUTATION)
  //onSubmit receives the form state as argument
  const onSubmit = async (
    values: TeamFormValues,
    onSubmitProps: FormikHelpers<TeamFormValues>
  ) => {
    const { setSubmitting, resetForm } = onSubmitProps
    setSubmitting(true)

    try {
      await UpdateTeam({
        variables: {
          teamId: teamId,
          name: values.name,
        },
      })
      //Log if Team Name Changes
      if (values.name !== initialValues.name) {
        await LogTeamHistory({
          variables: {
            teamId: teamId,
            newLeaderId: '',
            oldLeaderId: '',
            oldCouncilId: '',
            newCouncilId: '',
            historyRecord: `Team name has been changed from ${initialValues.name} to ${values.name}`,
          },
        })
      }

      //Log if the Leader Changes
      if (values.leaderId !== initialValues.leaderId) {
        try {
          await MakeTeamLeader({
            variables: {
              oldLeaderId: initialValues.leaderId || 'old-leader',
              newLeaderId: values.leaderId,
              teamId: teamId,
            },
          })

          alertMsg('Leader Changed Successfully')
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

      setSubmitting(false)
      resetForm()
      navigate(`/team/displaydetails`)
    } catch (error: any) {
      throwToSentry('There was a problem updating this team', error)
      setSubmitting(false)
    }
  }

  return (
    <ApolloWrapper data={data} loading={loading} error={error}>
      <TeamForm
        initialValues={initialValues}
        onSubmit={onSubmit}
        title={`Update Team Form`}
        newTeam={false}
      />
    </ApolloWrapper>
  )
}

export default UpdateTeam
