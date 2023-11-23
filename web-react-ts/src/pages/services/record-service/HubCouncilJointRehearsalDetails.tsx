import { useQuery } from '@apollo/client'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { ChurchContext } from 'contexts/ChurchContext'
import { useContext } from 'react'
import { DISPLAY_JOINT_REHEARSALS } from './RecordServiceMutations'
import ServiceDetails from './ServiceDetails'

const HubCouncilJointRehearsalDetails = () => {
  const { churchId } = useContext(ChurchContext)
  const { data, loading, error } = useQuery(DISPLAY_JOINT_REHEARSALS, {
    variables: {
      where: {
        id: churchId,
      },
    },
  })
  return (
    <ApolloWrapper loading={loading} data={data} error={error}>
      <ServiceDetails
        loading={loading}
        service={data?.rehearsalRecords[0]}
        church={data?.rehearsalRecords[0]}
      />
    </ApolloWrapper>
  )
}

export default HubCouncilJointRehearsalDetails
