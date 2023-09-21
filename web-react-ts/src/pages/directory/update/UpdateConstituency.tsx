import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { alertMsg, throwToSentry } from '../../../global-utils'
import { UPDATE_CONSTITUENCY_MUTATION } from './UpdateMutations'
import { ChurchContext } from '../../../contexts/ChurchContext'
import { DISPLAY_CONSTITUENCY } from '../display/ReadQueries'
import { LOG_CONSTITUENCY_HISTORY } from './LogMutations'
import { MAKE_CONSTITUENCY_LEADER } from './ChangeLeaderMutations'
import ConstituencyForm, {
  ConstituencyFormValues,
} from 'pages/directory/reusable-forms/ConstituencyForm'
import { FormikHelpers } from 'formik'
import ApolloWrapper from 'components/base-component/ApolloWrapper'

const UpdateConstituency = () => {
  const { constituencyId } = useContext(ChurchContext)
  const { data, loading, error } = useQuery(DISPLAY_CONSTITUENCY, {
    variables: { id: constituencyId },
  })

  const navigate = useNavigate()
  const constituency = data?.constituencies[0]
  const initialValues: ConstituencyFormValues = {
    name: constituency?.name,
    leaderName:
      constituency?.leader?.firstName + ' ' + constituency?.leader?.lastName ??
      '',
    adminId: constituency?.admin?.id || '',
    leaderId: constituency?.leader?.id || '',
    leaderEmail: constituency?.leader?.email || '',
    bacentas: constituency?.bacentas?.length ? constituency.bacentas : [''],
  }
  const [LogConstituencyHistory] = useMutation(LOG_CONSTITUENCY_HISTORY, {
    refetchQueries: [
      { query: DISPLAY_CONSTITUENCY, variables: { id: constituencyId } },
    ],
  })

  const [MakeConstituencyLeader] = useMutation(MAKE_CONSTITUENCY_LEADER)
  const [UpdateConstituency] = useMutation(UPDATE_CONSTITUENCY_MUTATION)
  //onSubmit receives the form state as argument
  const onSubmit = async (
    values: ConstituencyFormValues,
    onSubmitProps: FormikHelpers<ConstituencyFormValues>
  ) => {
    const { setSubmitting, resetForm } = onSubmitProps
    setSubmitting(true)

    try {
      await UpdateConstituency({
        variables: {
          constituencyId: constituencyId,
          name: values.name,
        },
      })
      //Log if Constituency Name Changes
      if (values.name !== initialValues.name) {
        await LogConstituencyHistory({
          variables: {
            constituencyId: constituencyId,
            newLeaderId: '',
            oldLeaderId: '',
            oldCouncilId: '',
            newCouncilId: '',
            historyRecord: `Constituency name has been changed from ${initialValues.name} to ${values.name}`,
          },
        })
      }

      //Log if the Leader Changes
      if (values.leaderId !== initialValues.leaderId) {
        try {
          await MakeConstituencyLeader({
            variables: {
              oldLeaderId: initialValues.leaderId || 'old-leader',
              newLeaderId: values.leaderId,
              constituencyId: constituencyId,
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
      navigate(`/constituency/displaydetails`)
    } catch (error: any) {
      throwToSentry('There was a problem updating this constituency', error)
      setSubmitting(false)
    }
  }

  return (
    <ApolloWrapper data={data} loading={loading} error={error}>
      <ConstituencyForm
        initialValues={initialValues}
        onSubmit={onSubmit}
        title={`Update Constituency Form`}
        newConstituency={false}
      />
    </ApolloWrapper>
  )
}

export default UpdateConstituency
