import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import DisplayChurchDetails from '../../../components/DisplayChurchDetails/DisplayChurchDetails'

import { DISPLAY_BACENTA } from './ReadQueries'
import { ChurchContext } from '../../../contexts/ChurchContext'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { permitArrivals } from 'permission-utils'

const DetailsBacenta = () => {
  const { bacentaId } = useContext(ChurchContext)
  const { data, loading, error } = useQuery(DISPLAY_BACENTA, {
    variables: { id: bacentaId },
  })

  const bacenta = data?.bacentas[0]

  let breadcrumb = [
    bacenta?.constituency.council,
    bacenta?.constituency,
    bacenta,
  ]

  const details = [
    {
      title: 'Members',
      number: bacenta?.memberCount || 0,
      link: `/${bacenta?.__typename?.toLowerCase()}/members`,
      width: 12,
    },
    {
      title: 'Fellowships',
      number: bacenta?.activeFellowshipCount || 0,
      link: `/${`Fellowship`.toLowerCase()}/displayall`,
      vacationCount: bacenta?.vacationFellowshipCount,
    },
    {
      title: 'Grad. Status',
      number: bacenta?.graduationStatus,
      link: `#`,
    },
    {
      title: 'Status',
      number: bacenta?.vacationStatus,
      link: '#',
      width: 3,
    },
    {
      title: 'Target',
      number: bacenta?.target,
      link: '#',
      width: 3,
    },
    {
      title: 'Momo Number',
      number: bacenta?.momoNumber || '-',
      link: `#`,
      width: 6,
    },
    {
      title: 'Normal Bussing Top Up',
      number: bacenta?.normalBussingTopUp,
      link: `#`,
    },
    {
      title: 'Swell Bussing Top Up',
      number: bacenta?.swellBussingTopUp,
      link: `#`,
    },
  ]

  if (!bacenta?.normalBussingTopUp && !bacenta?.swellBussingTopUp) {
    const moneyItems = [1, 2, 3]
    moneyItems.forEach(() => details.pop())
  }

  return (
    <ApolloWrapper loading={loading} error={error} data={data} placeholder>
      <DisplayChurchDetails
        details={details}
        loading={loading}
        church={bacenta}
        momoNumber={bacenta?.momoNumber}
        name={bacenta?.name}
        leaderTitle="Bacenta Leader"
        leader={bacenta?.leader}
        churchId={bacentaId}
        churchHeading="Fellowships"
        churchType="Bacenta"
        subChurch="Fellowship"
        membership={bacenta?.memberCount}
        editlink="/bacenta/editbacenta"
        editPermitted={permitArrivals('Constituency')}
        history={bacenta?.history.length !== 0 && bacenta?.history}
        breadcrumb={breadcrumb && breadcrumb}
        buttons={bacenta ? bacenta?.fellowships : []}
        vacationCount={bacenta?.vacationFellowshipCount}
      />
    </ApolloWrapper>
  )
}

export default DetailsBacenta
