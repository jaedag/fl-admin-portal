import { useContext } from 'react'
import { useQuery } from '@apollo/client'
import DisplayChurchDetails from 'components/DisplayChurchDetails/DisplayChurchDetails'
import { DISPLAY_FELLOWSHIP, DISPLAY_FELLOWSHIP_HISTORY } from './ReadQueries'
import { ChurchContext } from 'contexts/ChurchContext'
import { check, throwToSentry } from 'global-utils'
import { permitAdmin } from 'permission-utils'
import Breadcrumb from 'components/DisplayChurchDetails/Breadcrumb'
import { Container } from 'react-bootstrap'
import ApolloWrapper from 'components/base-component/ApolloWrapper'

export type DetailsArray = {
  title: string
  number: number | string
  link: string
  width?: number
  creativearts?: boolean
  vacationCount?: number
  activeIcBacentaCount?: number
  vacationIcBacentaCount?: number
}[]

const DetailsFellowship = () => {
  const { fellowshipId } = useContext(ChurchContext)

  const {
    data: fellowshipData,
    loading: fellowshipLoading,
    error: fellowshipError,
  } = useQuery(DISPLAY_FELLOWSHIP, {
    variables: { id: fellowshipId },
  })
  const { data: historyData } = useQuery(DISPLAY_FELLOWSHIP_HISTORY, {
    variables: { id: fellowshipId },
  })
  throwToSentry('', fellowshipError)
  const fellowship = fellowshipData?.fellowships[0]
  const history = historyData?.fellowships[0]

  let breadcrumb = [
    fellowship?.bacenta?.constituency?.council,
    fellowship?.bacenta?.constituency,
    fellowship?.bacenta,
    fellowship,
  ]

  const sontaCrumb = [
    fellowship?.hub?.hubCouncil.ministry?.creativeArts,
    fellowship?.hub?.hubCouncil.ministry,
    fellowship?.hub?.hubCouncil,
    fellowship?.hub,
    fellowship,
  ]

  if (!fellowship?.bacenta) {
    breadcrumb = [fellowship]
  }

  const details: DetailsArray = [
    {
      title: 'Members',
      number: fellowship?.memberCount || 0,
      link: `/${fellowship?.__typename?.toLowerCase()}/members`,
      width: 12,
    },
    {
      title: 'Meeting Day',
      number: fellowship?.meetingDay?.day,
      link: '#',
    },
    {
      title: 'Status',
      number: fellowship?.vacationStatus,
      link: '#',
    },
    {
      title: 'Code',
      number: fellowship?.bankingCode,
      link: `#`,
    },
  ]

  return (
    <ApolloWrapper
      data={fellowshipData}
      loading={fellowshipLoading}
      error={fellowshipError}
    >
      <>
        <Container className="yellow">
          {fellowship?.hubStatus && <Breadcrumb breadcrumb={sontaCrumb} />}
        </Container>
        <DisplayChurchDetails
          details={details}
          loading={fellowshipLoading}
          name={fellowship?.name}
          churchId={fellowshipId}
          leaderTitle="Fellowship Leader"
          leader={fellowship?.leader}
          location={fellowship?.location}
          churchType="Fellowship"
          buttons={[]}
          editlink="/fellowship/editfellowship"
          editPermitted={[...permitAdmin('Constituency'), 'leaderFellowship']}
          last3Weeks={history && check(history)}
          vacation={fellowship?.vacationStatus}
          history={history?.history.length && history?.history}
          breadcrumb={breadcrumb && breadcrumb}
        />
      </>
    </ApolloWrapper>
  )
}

export default DetailsFellowship
