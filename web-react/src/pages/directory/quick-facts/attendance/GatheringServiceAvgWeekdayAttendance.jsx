import React, { useContext } from 'react'
import AttendanceQuickFactsCard from '../components/AttendanceQuickFactsCard'
import '../QuickFacts.css'
import { useQuery } from '@apollo/client'
import { ChurchContext } from 'contexts/ChurchContext'
import BaseComponent from 'components/base-component/BaseComponent'
import { GATHERING_SERVICE_AVG_WEEKDAY_ATTENDANCE_THIS_MONTH } from '../QuickFactsQueries'
import QuickFactsHeader from '../components/QuickFactsHeader'

const GatheringServiceAvgWeekdayAttendance = () => {
  const { gatheringServiceId } = useContext(ChurchContext)

  const { data, loading, error } = useQuery(
    GATHERING_SERVICE_AVG_WEEKDAY_ATTENDANCE_THIS_MONTH,
    {
      variables: { gatheringServiceId: gatheringServiceId },
    }
  )

  const gatheringService = data?.gatheringServices[0]

  const details = [
    {
      churchType: 'Gathering Service',
      cardType: 'Attendance',
      leadersName: `${gatheringService?.leader?.firstName} ${gatheringService?.leader?.lastName}`,
      churchName: `${gatheringService?.name}`,
      churchAvgAttendanceThisMonth: `${gatheringService?.avgWeekdayAttendanceThisMonth}`,
      avgHigherLevelAttendanceThisMonth: `${gatheringService?.denomination?.avgGatheringServiceWeekdayAttendanceThisMonth}`,
      higherLevelName: `${gatheringService?.name} ${gatheringService?.__typename}`,
    },
  ]

  return (
    <BaseComponent loading={loading} error={error} data={data}>
      <div className="quick-fact-page">
        <QuickFactsHeader previous={'income'} next={'income'} />

        <div className="page-padding mt-3 quick-fact-card-wrapper">
          <AttendanceQuickFactsCard details={details} />
        </div>
      </div>
    </BaseComponent>
  )
}
export default GatheringServiceAvgWeekdayAttendance
