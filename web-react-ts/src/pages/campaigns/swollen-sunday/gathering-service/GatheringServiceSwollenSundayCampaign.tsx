import { useQuery } from '@apollo/client'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { ChurchContext } from 'contexts/ChurchContext'
import { useContext } from 'react'
import SwollenSundayLandingPage from '../SwollenSundayLandingPage'
import { GATHERING_SERVICE } from '../SwollenSundayQueries'

const GatheringServiceSwollenSundayCampaign = () => {
  const { gatheringServiceId } = useContext(ChurchContext)

  const { data, loading, error } = useQuery(GATHERING_SERVICE, {
    variables: {
      gatheringServiceId: gatheringServiceId,
    },
  })

  return (
    <ApolloWrapper data={data} loading={loading} error={error}>
      <SwollenSundayLandingPage
        churchName={data?.gatheringServices[0]?.name}
        churchLevel={data?.gatheringServices[0]?.__typename}
      />
    </ApolloWrapper>
  )
}

export default GatheringServiceSwollenSundayCampaign
