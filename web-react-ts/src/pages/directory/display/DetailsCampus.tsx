import { useQuery } from '@apollo/client'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import DisplayChurchDetails from 'components/DisplayChurchDetails/DisplayChurchDetails'
import { ChurchContext } from 'contexts/ChurchContext'
import React, { useContext } from 'react'
import { DetailsArray } from './DetailsFellowship'
import { DISPLAY_CAMPUS } from './ReadQueries'
import { permitAdmin } from 'permission-utils'

const DetailsCampus = () => {
  const { campusId } = useContext(ChurchContext)

  const { data, loading, error } = useQuery(DISPLAY_CAMPUS, {
    variables: { id: campusId },
  })

  const gathering = data?.campuses[0]
  let breadcrumb = [gathering?.oversight, gathering]

  const details: DetailsArray = [
    {
      title: 'Members',
      number: gathering?.memberCount || 0,
      link: `/${gathering?.__typename?.toLowerCase()}/members`,
      width: 12,
    },

    {
      title: 'Streams',
      number: gathering?.streamCount || 0,
      link: `/${`Stream`.toLowerCase()}/displayall`,
    },
    { title: 'Target', number: gathering?.target, link: '#' },
    { title: 'Pastors', number: gathering?.pastorCount || '0', link: '#' },
    {
      title: 'Councils',
      number: gathering?.councilCount,
      link: `#`,
    },
    {
      title: 'Constituencies',
      number: gathering?.constituencyCount,
      link: `/campus/constituencies`,
    },
    {
      title: 'Bacentas',
      number: gathering?.activeBacentaCount,
      vacationCount: gathering?.vacationBacentaCount,
      link: `#`,
    },
    {
      title: 'IC Bacentas',
      number: gathering?.activeIcBacentaCount,
      vacationCount: gathering?.vacationIcBacentaCount,
      link: '#',
    },
    {
      title: 'Fellowships',
      number: gathering?.activeFellowshipCount,
      vacationCount: gathering?.vacationFellowshipCount,
      link: '#',
    },
    {
      title: 'Federal Ministries',
      number: gathering?.federalMinistryCount,
      link: '/campus/federalministries',
    },
    {
      title: 'Income Tracking',
      number: gathering?.noIncomeTracking ? 'No' : 'Yes',
      link: `#`,
    },
    {
      title: 'Currency',
      number: gathering?.currency,
      link: `#`,
    },
    {
      title: 'Converstion Rate ($)',
      number: gathering?.conversionRateToDollar,
      link: `#`,
    },
  ]

  // if noIncomeTracking is true, remove the last two elements in the array

  if (gathering?.noIncomeTracking) {
    details.pop()
    details.pop()
  }

  return (
    <ApolloWrapper loading={loading} error={error} data={data} placeholder>
      <DisplayChurchDetails
        name={gathering?.name}
        leaderTitle={'Lead Pastor'}
        church={gathering}
        churchId={campusId}
        leader={gathering?.leader}
        churchType={gathering?.__typename}
        admin={gathering?.admin}
        subChurch="Stream"
        details={details}
        editlink="/campus/editcampus"
        editPermitted={permitAdmin('Oversight')}
        history={gathering?.history.length !== 0 && gathering?.history}
        buttons={gathering?.streams ?? []}
        breadcrumb={breadcrumb && breadcrumb}
        loading={loading}
      />
    </ApolloWrapper>
  )
}

export default DetailsCampus
