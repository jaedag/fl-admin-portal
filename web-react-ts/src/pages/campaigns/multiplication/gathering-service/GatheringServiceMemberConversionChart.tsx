import HeadingSecondary from 'components/HeadingSecondary'
import React, { useContext } from 'react'
import { Container } from 'react-bootstrap'
import MemberConversionChart from '../MemberConversionChart'
import { ChurchContext } from 'contexts/ChurchContext'
import { useQuery } from '@apollo/client'
import { GATHERING_SERVICE_AGGREGATE_MEMBER_CONVERSION } from '../MultiplicationQueries'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import ApolloWrapper from 'components/base-component/ApolloWrapper'

const GatheringServiceMemberConversionChart = () => {
  const { gatheringServiceId } = useContext(ChurchContext)

  const { data, loading, error } = useQuery(
    GATHERING_SERVICE_AGGREGATE_MEMBER_CONVERSION,
    {
      variables: {
        gatheringServiceId: gatheringServiceId,
      },
    }
  )
  const church = data?.gatheringServices[0]

  const aggregateMemberConversion =
    data?.gatheringServices[0]?.aggregateMemberConversion

  return (
    <ApolloWrapper loading={loading} error={error} data={data}>
      <Container>
        <div className="text-center">
          <HeadingPrimary>{`${church?.name} ${church?.__typename}`}</HeadingPrimary>
          <HeadingSecondary>Member Conversion Chart</HeadingSecondary>
        </div>
        <div>
          <MemberConversionChart
            aggregateMemberConversion={aggregateMemberConversion}
          />
        </div>
      </Container>
    </ApolloWrapper>
  )
}

export default GatheringServiceMemberConversionChart
