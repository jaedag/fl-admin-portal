import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import DisplayChurchDetails from 'components/DisplayChurchDetails/DisplayChurchDetails'

import { DISPLAY_BACENTA } from './ReadQueries'
import { ChurchContext } from 'contexts/ChurchContext'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { permitAdminArrivals } from 'permission-utils'
import { DetailsArray } from './DetailsFellowship'

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

  const details: DetailsArray = [
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
      title: 'Status',
      number: bacenta?.vacationStatus,
      link: '#',
    },
    {
      title: 'Grad. Status',
      number: bacenta?.graduationStatus,
      link: `#`,
    },

    {
      title: 'Target',
      number: bacenta?.target,
      link: '#',
    },
    {
      title: 'Momo Number',
      number: bacenta?.momoNumber || '-',
      link: `#`,
      width: 12,
    },
    {
      title: 'Urvan Top Up (One Way)',
      number: bacenta?.urvanTopUp + ' GHS',
      link: `#`,
    },
    {
      title: 'Sprinter Top Up (One Way)',
      number: bacenta?.sprinterTopUp + ' GHS',
      link: `#`,
    },
  ]
  // if therer is not bacenta urvanCost remove array element at the index of 6
  if (!bacenta?.urvanCost) {
    details.splice(6, 1)
  }
  // if therer is not bacenta sprinterCost remove array element at the index of 7
  if (!bacenta?.sprinterCost) {
    details.splice(7, 1)
  }

  if (!bacenta?.sprinterCost && !bacenta?.urvanCost) {
    details.splice(5, 1)
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
        churchType="Bacenta"
        subChurch="Fellowship"
        editlink="/bacenta/editbacenta"
        editPermitted={permitAdminArrivals('Constituency')}
        history={bacenta?.history.length !== 0 ? bacenta?.history : []}
        breadcrumb={breadcrumb && breadcrumb}
        buttons={bacenta ? bacenta?.fellowships : []}
        vacationCount={bacenta?.vacationFellowshipCount}
      />
    </ApolloWrapper>
  )
}

export default DetailsBacenta
