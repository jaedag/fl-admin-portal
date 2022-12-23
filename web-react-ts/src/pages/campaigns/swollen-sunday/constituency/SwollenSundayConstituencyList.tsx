import { useQuery } from '@apollo/client'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import { ChurchContext } from 'contexts/ChurchContext'
import React, { useContext } from 'react'
import SwollenSundayChurchList from '../SwollenSundayChurchList'
import { CONSTITUENCY_LIST } from '../SwollenSundayQueries'

const SwollenSundayConstituencyList = () => {
  const { councilId } = useContext(ChurchContext)

  const { data, loading, error } = useQuery(CONSTITUENCY_LIST, {
    variables: {
      councilId: councilId,
    },
  })

  const constituencies = data?.councils[0]?.constituencies

  return (
    <ApolloWrapper loading={loading} error={error} data={data}>
      <div className="text-center">
        <HeadingPrimary>Swollen Sunday Campaign</HeadingPrimary>
        <HeadingSecondary>
          {`${data?.councils[0]?.name} ${data?.councils[0]?.__typename}`}{' '}
          Constituencies
        </HeadingSecondary>
        <SwollenSundayChurchList data={constituencies} />
      </div>
    </ApolloWrapper>
  )
}

export default SwollenSundayConstituencyList
