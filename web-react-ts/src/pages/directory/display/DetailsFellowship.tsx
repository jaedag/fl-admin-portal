import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import DisplayChurchDetails from 'components/DisplayChurchDetails/DisplayChurchDetails'
import { DISPLAY_FELLOWSHIP, DISPLAY_FELLOWSHIP_HISTORY } from './ReadQueries'
import { ChurchContext } from 'contexts/ChurchContext'
import { throwToSentry } from 'global-utils'
import { last3Weeks } from 'jd-date-utils'
import { permitAdmin } from 'permission-utils'
import { ServiceRecord } from 'global-types'
import Breadcrumb from 'components/DisplayChurchDetails/Breadcrumb'
import { Container } from 'react-bootstrap'
import ApolloWrapper from 'components/base-component/ApolloWrapper'

export type DetailsArray = {
  title: string
  number: number
  link: string
  width?: number
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
    variables: { sid: fellowshipId },
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
    fellowship?.hub?.ministry?.creativeArts,
    fellowship?.hub?.ministry,
    fellowship?.hub,
    fellowship,
  ]

  if (!fellowship?.bacenta) {
    breadcrumb = [fellowship]
  }

  const lastFilled = history?.services.map(
    ({
      bankingProof,
      noServiceReason,
      week,
    }: {
      bankingProof: boolean
      noServiceReason: string
      week: number
    }) => ({
      bankingProof,
      noServiceReason,
      week,
    })
  )

  const check = last3Weeks()?.map((number) => {
    if (lastFilled?.some((service: ServiceRecord) => service.week === number)) {
      const service = lastFilled?.find(
        ({ week }: { week: number }) => week === number
      )

      if (!service?.noServiceReason) {
        return {
          number: number,
          filled: true,
          banked: service.bankingProof ? true : false,
        }
      } else if (service?.noServiceReason) {
        return {
          number: number,
          filled: true,
          banked: 'No Service',
        }
      }

      return null
    } else {
      return {
        number: number,
        filled: false,
        banked: 'No Service',
      }
    }
  })

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
        <Container className="text-warning">
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
          last3Weeks={fellowship && check}
          vacation={fellowship?.vacationStatus}
          history={history?.history.length && history?.history}
          breadcrumb={breadcrumb && breadcrumb}
        />
      </>
    </ApolloWrapper>
  )
}

export default DetailsFellowship
