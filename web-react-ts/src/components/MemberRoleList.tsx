import { useContext } from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import { ChurchContext } from '../contexts/ChurchContext'
import { capitalise } from '../global-utils'
import PlaceholderCustom from './Placeholder'
import './MemberRoleList.css'
import { ChurchLevelLower, MemberWithChurches } from 'global-types'

interface MemberForRoles extends MemberWithChurches {
  [key: string]: any
}

export const getListOfMemberRoles = (member: MemberForRoles) => {
  const roles = []

  if (member.leadsBacenta[0]) {
    roles.push('Bacenta Leader')
  }
  if (member.leadsConstituency[0]) {
    roles.push('Constituency Leader')
  }
  if (member.leadsCouncil[0]) {
    roles.push('Council Leader')
  }
  if (member.leadsStream[0]) {
    roles.push('Stream Leader')
  }
  if (member.leadsCampus[0]) {
    roles.push('Campus Leader')
  }
  if (member.leadsCreativeArts[0]) {
    roles.push('Creative Arts Leader')
  }
  if (member.leadsMinistry[0]) {
    roles.push('Ministry Leader')
  }
  if (member.leadsHub[0]) {
    roles.push('Hub Leader')
  }
  if (member.leadsHubCouncil[0]) {
    roles.push('Hub Council Leader')
  }
  if (member.isAdminForConstituency[0]) {
    roles.push('Constituency Admin')
  }
  if (member.isAdminForCouncil[0]) {
    roles.push('Council Admin')
  }
  if (member.isAdminForStream[0]) {
    roles.push('Stream Admin')
  }
  if (member.isAdminForCampus[0]) {
    roles.push('Campus Admin')
  }
  if (member.isAdminForOversight[0]) {
    roles.push('Oversight Admin')
  }
  if (member.isAdminForCreativeArts[0]) {
    roles.push('Creative Arts Admin')
  }
  if (member.isAdminForMinistry[0]) {
    roles.push('Ministry Admin')
  }

  return roles
}

const MemberRoleList = ({
  memberLeader,
  memberAdmin,
}: {
  memberLeader: MemberForRoles
  memberAdmin: MemberForRoles
}) => {
  const { clickCard } = useContext(ChurchContext)
  const navigate = useNavigate()

  if (!memberLeader || !memberAdmin) {
    return null
  }

  //To Display Ranks on the Member Card
  let rank = {
    oversightLeader: [],
    campusLeader: [],
    streamLeader: [],
    councilLeader: [],
    constituencyLeader: [],
    bacentaLeader: [],
    fellowshipLeader: [],
    oversightAdmin: [],
    campusAdmin: [],
    streamAdmin: [],
    councilAdmin: [],
    constituencyAdmin: [],
    creativeartsLeader: [],
    ministryLeader: [],
    hubcouncilLeader: [],
    hubLeader: [],
    creativeartsAdmin: [],
    ministryAdmin: [],
  }
  let isServant = false

  const updateRank = (member: MemberForRoles, churchType: ChurchLevelLower) => {
    isServant = true

    member[`isAdminFor${capitalise(churchType)}`]?.map((church: any) => {
      let ch: ChurchLevelLower = church.__typename.toLowerCase()

      // @ts-ignore
      rank[`${ch}Admin`].push({
        name: church.name,
        stream_name: church.stream_name,
        bacenta: church.bacenta,
        hub: church.hub,
        constituency: church.constituency,
        id: church.id,
        admin: true,
        link: '',
        __typename: church.__typename,
      })
      return null
    })

    member[`leads${capitalise(churchType)}`]?.map((church: any) => {
      let ch: ChurchLevelLower = church.__typename.toLowerCase()
      // @ts-ignore
      rank[`${ch}Leader`].push({
        name: church.name,
        stream_name: church.stream_name,
        bacenta: church.bacenta,
        hub: church.hub,
        constituency: church.constituency,
        id: church.id,
        link: '',
        __typename: church.__typename,
      })
      return null
    })
    return null
  }

  if (memberLeader.leadsFellowship[0]) {
    updateRank(memberLeader, 'fellowship')
  }
  if (memberLeader.leadsBacenta[0]) {
    updateRank(memberLeader, 'bacenta')
  }
  if (memberLeader.leadsConstituency[0]) {
    updateRank(memberLeader, 'constituency')
  }
  if (memberLeader?.leadsCouncil[0]) {
    updateRank(memberLeader, 'council')
  }
  if (memberLeader?.leadsStream[0]) {
    updateRank(memberLeader, 'stream')
  }
  if (memberLeader?.leadsCampus[0]) {
    updateRank(memberLeader, 'campus')
  }

  if (memberAdmin.isAdminForConstituency[0]) {
    updateRank(memberAdmin, 'constituency')
  }
  if (memberAdmin.isAdminForCouncil[0]) {
    updateRank(memberAdmin, 'council')
  }
  if (memberAdmin.isAdminForStream[0]) {
    updateRank(memberAdmin, 'stream')
  }
  if (memberAdmin.isAdminForCampus[0]) {
    updateRank(memberAdmin, 'campus')
  }
  if (memberAdmin.isAdminForOversight[0]) {
    updateRank(memberAdmin, 'oversight')
  }

  if (memberLeader?.leadsCreativeArts[0]) {
    updateRank(memberLeader, 'creativeArts')
  }
  if (memberLeader?.leadsMinistry[0]) {
    updateRank(memberLeader, 'ministry')
  }
  if (memberLeader?.leadsHub[0]) {
    updateRank(memberLeader, 'hub')
  }

  if (memberLeader?.leadsHubCouncil[0]) {
    updateRank(memberLeader, 'hubCouncil')
  }

  if (memberAdmin?.isAdminForCreativeArts[0]) {
    updateRank(memberAdmin, 'creativeArts')
  }
  if (memberAdmin?.isAdminForMinistry[0]) {
    updateRank(memberAdmin, 'ministry')
  }

  if (!isServant) {
    return null
  }

  return (
    <PlaceholderCustom>
      <small className="mb-5">
        <Button
          onClick={() => navigate('/dashboard/servants')}
          variant="brand"
          className="mb-3 px-5"
        >
          View Graphs
        </Button>

        {
          //Rank Discussions */}
          Object.entries(rank).map((rank) => {
            return rank[1].map(
              (
                place: {
                  name: string
                  __typename: string
                  admin: boolean
                  link: string
                },
                i
              ) => {
                let servant = 'Leader'

                if (place.admin) {
                  servant = 'Admin'
                }

                return (
                  <span
                    key={i}
                    onClick={() => {
                      clickCard(place)
                      navigate(place.link)
                    }}
                  >
                    <p className="mb-0">
                      <span className=" text-secondary">{`${place.__typename} ${servant} : `}</span>
                      <span>{place.name}</span>
                    </p>
                  </span>
                )
              }
            )
          })
        }
      </small>
    </PlaceholderCustom>
  )
}

export default MemberRoleList
