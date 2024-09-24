import React, { useContext } from 'react'
import { ChurchContext } from 'contexts/ChurchContext'

import { useQuery } from '@apollo/client'
import { DISPLAY_TEAM_SERVICE } from './RecordServiceMutations'
import { ServiceContext } from 'contexts/ServiceContext'

import ServiceDetails from './ServiceDetails'
import ApolloWrapper from 'components/base-component/ApolloWrapper'

const TeamServiceDetails = () => {
  const { teamId } = useContext(ChurchContext)
  const { serviceRecordId } = useContext(ServiceContext)
  const { data, loading, error } = useQuery(DISPLAY_TEAM_SERVICE, {
    variables: { serviceId: serviceRecordId, teamId: teamId },
  })

  return (
    <ApolloWrapper loading={loading} error={error} data={data} placeholder>
      <ServiceDetails
        loading={loading}
        service={data?.serviceRecords[0]}
        church={data?.teams[0]}
      />
    </ApolloWrapper>
  )
}

export default TeamServiceDetails
