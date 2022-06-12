import React, { useContext } from 'react'
import AttendanceQuickFactsCard from '../components/AttendanceQuickFactsCard'
import '../QuickFacts.css'
import { useQuery } from '@apollo/client'
import { ChurchContext } from 'contexts/ChurchContext'
import BaseComponent from 'components/base-component/BaseComponent'
import { STREAM_AVG_WEEKDAY_ATTENDANCE_THIS_MONTH } from '../QuickFactsQueries'
import QuickFactsHeader from '../components/QuickFactsHeader'

const StreamAvgWeekdayAttendance = () => {
  const { streamId } = useContext(ChurchContext)

  const { data, loading, error } = useQuery(
    STREAM_AVG_WEEKDAY_ATTENDANCE_THIS_MONTH,
    {
      variables: { streamId: streamId },
    }
  )

  const stream = data?.streams[0]

  const details = [
    {
      churchType: 'Stream',
      cardType: 'Attendance',
      leadersName: `${stream?.leader?.firstName} ${stream?.leader?.lastName}`,
      churchName: `${stream?.name}`,
      churchAvgAttendanceThisMonth: `${stream?.avgWeekdayAttendanceThisMonth}`,
      avgHigherLevelAttendanceThisMonth: `${stream?.gatheringService?.avgStreamWeekdayAttendanceThisMonth}`,
      higherLevelName: `${stream?.gatheringService?.name} ${stream?.gatheringService?.__typename}`,
    },
  ]

  return (
    <BaseComponent loading={loading} error={error} data={data}>
      <div className="quick-fact-page">
        <QuickFactsHeader previous={'income'} next={'income'} />

        <div className=" page-padding mt-3 quick-fact-card-wrapper">
          <AttendanceQuickFactsCard details={details} />
        </div>
      </div>
    </BaseComponent>
  )
}
export default StreamAvgWeekdayAttendance
