import { useContext } from 'react'
import { useNavigate } from 'react-router'
import { ChurchContext } from 'contexts/ChurchContext'
import { MemberContext } from 'contexts/MemberContext'
import {
  getMonthlyStatAverage,
  getServiceGraphData,
} from 'pages/services/graphs/graphs-utils'
import MenuButton from 'components/buttons/MenuButton'
import { Container } from 'react-bootstrap'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import BaseComponent from 'components/base-component/BaseComponent'
import { SERVANT_CHURCH_LIST } from './DashboardQueries'
import { useQuery } from '@apollo/client'

const ServantsChurchList = () => {
  const { memberId } = useContext(MemberContext)
  const { clickCard } = useContext(ChurchContext)
  const navigate = useNavigate()
  const { data, loading, error } = useQuery(SERVANT_CHURCH_LIST, {
    variables: { id: memberId },
  })
  const servant = data?.members[0]

  const getServantChurches = (member) => {
    if (!member) return

    let churches = []

    const pushIntoChurch = (memberChurches) => {
      memberChurches.map((church) => {
        const serviceData = getServiceGraphData(church)

        return churches.push({
          id: church.id,
          __typename: church.__typename,
          name: church.name,
          leader: member?.fullName,
          leaderPic: member?.pictureUrl,
          attendance: getMonthlyStatAverage(serviceData, 'attendance'),
          income: getMonthlyStatAverage(serviceData, 'income'),
          link: `/${church.__typename.toLowerCase()}/displaydetails`,
        })
      })
    }

    if (member?.leadsFellowship?.length) {
      pushIntoChurch(member?.leadsFellowship)
    }
    if (member.leadsBacenta) {
      pushIntoChurch(member?.leadsBacenta)
    }
    if (member.leadsConstituency?.length) {
      pushIntoChurch(member?.leadsConstituency)
    }
    if (member?.leadsSonta?.length) {
      pushIntoChurch(member?.leadsSonta)
    }
    if (member?.leadsBasonta?.length) {
      pushIntoChurch(member?.leadsBasonta)
    }
    if (member?.leadsMinistry?.length) {
      pushIntoChurch(member?.leadsMinistry)
    }

    if (member?.leadsCouncil?.length) {
      pushIntoChurch(member?.leadsCouncil)
    }
    if (member?.leadsStream?.length) {
      pushIntoChurch(member?.leadsStream)
    }
    if (member?.leadsGatheringService?.length) {
      pushIntoChurch(member?.leadsGatheringService)
    }
    //Administrative
    if (member?.isAdminForCouncil?.length) {
      pushIntoChurch(member?.isAdminForCouncil)
    }
    if (member?.isAdminForConstituency?.length) {
      pushIntoChurch(member?.isAdminForConstituency)
    }
    if (member?.isAdminForGatheringService?.length) {
      pushIntoChurch(member?.isAdminForGatheringService)
    }

    //run the get graph function after all checking is done to avoid multiple unnecessary runs
    return churches
  }

  const churches = getServantChurches(servant)

  return (
    <BaseComponent loading={loading} error={error} data={data} placeholder>
      <Container className="mt-4">
        <HeadingPrimary
          loading={!servant}
        >{`${servant?.fullName}'s Churches`}</HeadingPrimary>

        <div className="d-grid gap-2 text-left">
          {churches?.map((church, i) => (
            <MenuButton
              key={i}
              avatar={church.leaderPic}
              title={`${church.name} ${church.__typename}`}
              caption={church.leader}
              color="churches"
              onClick={() => {
                clickCard(church)
                navigate(church.link)
              }}
            />
          ))}
        </div>
      </Container>
    </BaseComponent>
  )
}

export default ServantsChurchList
