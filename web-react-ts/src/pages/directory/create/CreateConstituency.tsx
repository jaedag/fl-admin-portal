import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { throwToSentry } from '../../../global-utils'
import { GET_COUNCIL_CONSTITUENCIES } from '../../../queries/ListQueries'
import { CREATE_CONSTITUENCY_MUTATION } from './CreateMutations'
import { ChurchContext } from '../../../contexts/ChurchContext'
import { NEW_CONSTITUENCY_LEADER } from './MakeLeaderMutations'
import ConstituencyForm, {
  ConstituencyFormValues,
} from '../reusable-forms/ConstituencyForm'
import { FormikHelpers } from 'formik'

const CreateConstituency = () => {
  const { clickCard, councilId } = useContext(ChurchContext)

  const navigate = useNavigate()

  const initialValues: ConstituencyFormValues = {
    name: '',
    leaderId: '',
    leaderName: '',
    leaderEmail: '',
    council: councilId,
  }

  const [NewConstituencyLeader] = useMutation(NEW_CONSTITUENCY_LEADER)
  const [CreateConstituency] = useMutation(CREATE_CONSTITUENCY_MUTATION, {
    refetchQueries: [
      { query: GET_COUNCIL_CONSTITUENCIES, variables: { id: councilId } },
    ],
    onCompleted: (newConstituencyData) => {
      clickCard(newConstituencyData.CreateConstituency)
      navigate(`/constituency/displaydetails`)
    },
  })

  //onSubmit receives the form state as argument

  const onSubmit = async (
    values: ConstituencyFormValues,
    onSubmitProps: FormikHelpers<ConstituencyFormValues>
  ) => {
    onSubmitProps.setSubmitting(true)
    try {
      if (!values.leaderEmail) {
        onSubmitProps.setSubmitting(false)
        throw new Error('Leader email is required')
      }

      const res = await CreateConstituency({
        variables: {
          name: values.name,
          leaderId: values.leaderId,
          councilId: values.council,
        },
      })

      await NewConstituencyLeader({
        variables: {
          leaderId: values.leaderId,
          constituencyId:
            res.data.CreateConstituency.council.constituencies[0].id,
        },
      })

      clickCard({ id: values.council, __typename: 'Council' })
      clickCard(res.data.CreateConstituency)
      onSubmitProps.setSubmitting(false)
      onSubmitProps.resetForm()
      navigate(`/constituency/displaydetails`)
    } catch (error: any) {
      throwToSentry('There was an error creating the constituency', error)
      onSubmitProps.setSubmitting(false)
    }
  }
  return (
    <ConstituencyForm
      initialValues={initialValues}
      onSubmit={onSubmit}
      title={`Create a New Constituency`}
      newConstituency={true}
    />
  )
}

export default CreateConstituency
