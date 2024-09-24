import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import MembersGrid from '../../../components/members-grids/MembersGrid'
import { GET_TEAM_MEMBERS } from './GridQueries'
import { ChurchContext } from '../../../contexts/ChurchContext'

export const TeamMembers = () => {
  const { teamId } = useContext(ChurchContext)

  const { data, loading, error } = useQuery(GET_TEAM_MEMBERS, {
    variables: { id: teamId },
  })

  return (
    <MembersGrid
      title={data ? `${data?.teams[0]?.name} Team` : null}
      data={data?.teams[0]?.members}
      loading={loading}
      error={error}
    />
  )
}

export default TeamMembers
