import { useQuery } from '@apollo/client'
import BaseComponent from 'components/base-component/BaseComponent'
import DisplayChurchDetails from 'components/DisplayChurchDetails/DisplayChurchDetails'
import { ChurchContext } from 'contexts/ChurchContext'
import { permitAdmin } from 'permission-utils'
import React, { useContext, useEffect } from 'react'
import { DISPLAY_COUNCIL } from './ReadQueries'
import useClickCard from 'hooks/useClickCard'

const DetailsCouncil = () => {
  const { councilId } = useContext(ChurchContext)
  const { setChurch } = useClickCard()

  const { data, loading, error } = useQuery(DISPLAY_COUNCIL, {
    variables: { id: councilId },
  })

  const council = data?.councils[0]
  let breadcrumb = [council?.stream, council]
  useEffect(() => {
    setChurch({ church: council?.stream_name, subChurch: 'bacenta' })
  }, [council?.stream_name, setChurch])

  const details = [
    {
      title: 'Members',
      number: council?.memberCount || 0,
      link: `/${council?.__typename?.toLowerCase()}/members`,
      width: 12,
    },
    {
      title: 'Constituencies',
      number: council?.constituencyCount || 0,
      link: `/${`Constituency`.toLowerCase()}/displayall`,
    },
    { title: 'Target', number: council?.target, link: '#' },
    { title: 'Pastors', number: council?.pastorCount, link: '#' },
    {
      title: 'Bacentas',
      number: council?.activeBacentaCount,
      vacationCount: council?.vacationBacentaCount,
      link: `#`,
    },
    {
      title: 'Fellowships',
      number: council?.activeFellowshipCount,
      vacationCount: council?.vacationFellowshipCount,
      link: '#',
    },
  ]

  return (
    <BaseComponent loading={loading} error={error} data={data} placeholder>
      <DisplayChurchDetails
        loading={loading}
        name={council?.name}
        leaderTitle="Council Overseer"
        churchId={councilId}
        leader={council?.leader}
        admin={council?.admin}
        churchHeading="Constituencies"
        churchType={council?.__typename}
        subChurch="Constituency"
        membership={council?.memberCount}
        details={details}
        editlink="/council/editcouncil"
        editPermitted={permitAdmin('Stream')}
        history={council?.history.length !== 0 && council?.history}
        buttons={council ? council.constituencies : []}
        breadcrumb={breadcrumb && breadcrumb}
      />
    </BaseComponent>
  )
}

export default DetailsCouncil
