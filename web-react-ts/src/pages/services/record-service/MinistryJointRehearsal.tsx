import { useMutation, useQuery } from '@apollo/client'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { ChurchContext } from 'contexts/ChurchContext'
import { DISPLAY_MINISTRY } from 'pages/directory/display/ReadQueries'
import { useContext } from 'react'
import {
  DISPLAY_JOINT_REHEARSALS,
  RECORD_JOINT_REHEARSAL,
} from './RecordServiceMutations'
import ServiceForm from './ServiceForm'

const MinistryJointRehearsal = () => {
  const { ministryId, churchId } = useContext(ChurchContext)
  const { data, loading, error } = useQuery(DISPLAY_MINISTRY, {
    variables: { id: ministryId },
  })
  const [RecordRehearsalService] = useMutation(RECORD_JOINT_REHEARSAL, {
    refetchQueries: [
      {
        query: DISPLAY_JOINT_REHEARSALS,
        variables: { where: { id: churchId } },
      },
    ],
  })
  return (
    <ApolloWrapper loading={loading} error={error} data={data}>
      <ServiceForm
        RecordServiceMutation={RecordRehearsalService}
        church={data?.ministries[0]}
        churchId={ministryId}
        churchType="Ministry"
      />
    </ApolloWrapper>
  )
}

export default MinistryJointRehearsal
