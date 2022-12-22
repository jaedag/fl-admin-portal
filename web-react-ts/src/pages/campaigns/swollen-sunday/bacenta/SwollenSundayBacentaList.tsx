import { useQuery } from '@apollo/client'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import HeadingSecondary from 'components/HeadingSecondary'
import { ChurchContext } from 'contexts/ChurchContext'
import React, { useContext } from 'react'
import SwollenSundayChurchList from '../SwollenSundayChurchList'
import { BACENTA_LIST } from '../SwollenSundayQueries'

const SwollenSundayBacentaList = () => {
  const { constituencyId } = useContext(ChurchContext)

  const { data, loading, error } = useQuery(BACENTA_LIST, {
    variables: {
      constituencyId: constituencyId,
    },
  })

  const bacentas = data?.constituencies[0]?.bacentas

  return (
    <ApolloWrapper loading={loading} error={error} data={data}>
      <div className="text-center">
        <HeadingSecondary>
          {`${data?.constituencies[0]?.name} ${data?.constituencies[0]?.__typename}`}{' '}
          Bacentas
        </HeadingSecondary>
        <SwollenSundayChurchList data={bacentas} />
      </div>
    </ApolloWrapper>
  )
}

export default SwollenSundayBacentaList
