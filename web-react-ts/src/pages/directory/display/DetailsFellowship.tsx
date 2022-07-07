import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import DisplayChurchDetails from '../../../components/DisplayChurchDetails/DisplayChurchDetails'
import { DISPLAY_FELLOWSHIP, DISPLAY_FELLOWSHIP_HISTORY } from './ReadQueries'
import { ChurchContext } from '../../../contexts/ChurchContext'
import { throwErrorMsg } from 'global-utils'
import { last3Weeks, getWeekNumber } from 'jd-date-utils'
import { permitAdmin } from 'permission-utils'
import { ServiceRecord } from 'global-types'

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
  throwErrorMsg(fellowshipError)
  const fellowship = fellowshipData?.fellowships[0]
  const history = historyData?.fellowships[0]

  let breadcrumb = [
    fellowship?.bacenta?.constituency?.council,
    fellowship?.bacenta?.constituency,
    fellowship?.bacenta,
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

  const details = [
    {
      title: 'Members',
      number: fellowship?.memberCount || 0,
      link: `/${fellowship?.__typename?.toLowerCase()}/members`,
      width: 12,
    },
    {
      title: 'Meeting Day',
      number: fellowship?.meetingDay?.day,
    },
    {
      title: 'Status',
      number: fellowship?.vacationStatus,
      link: '#',
      width: '',
    },
    {
      title: 'Code',
      number: fellowship?.bankingCode,
      link: `#`,
      width: '',
    },
  ]

  return (
    <DisplayChurchDetails
      details={details}
      loading={fellowshipLoading}
      name={fellowship?.name}
      churchId={fellowshipId}
      leaderTitle="Fellowship Leader"
      leader={fellowship?.leader}
      location={fellowship?.location}
      membership={fellowship?.memberCount}
      churchHeading="Meeting Day"
      churchCount={fellowship?.meetingDay?.day}
      churchType="Fellowship"
      buttons={['']}
      editlink="/fellowship/editfellowship"
      editPermitted={[...permitAdmin('Constituency'), 'leaderFellowship']}
      weekNumber={getWeekNumber()}
      last3Weeks={fellowship && check}
      vacation={fellowship?.vacationStatus && true}
      history={history?.history.length && history?.history}
      breadcrumb={breadcrumb && breadcrumb}
    />
  )
}

export default DetailsFellowship
