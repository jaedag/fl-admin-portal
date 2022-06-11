import React, { useContext } from 'react'
import AttendanceQuickFactsCard from '../components/AttendanceQuickFactsCard'
import '../QuickFacts.css'
import { useQuery } from '@apollo/client'
import { ChurchContext } from 'contexts/ChurchContext'
import BaseComponent from 'components/base-component/BaseComponent'
import { CONSTITUENCY_AVG_WEEKDAY_ATTENDANCE_THIS_MONTH } from '../QuickFactsQueries'
import QuickFactsHeader from '../components/QuickFactsHeader'

const ConstituencyAvgWeekdayAttendance = () => {
  const { constituencyId } = useContext(ChurchContext)

  const { data, loading, error } = useQuery(
    CONSTITUENCY_AVG_WEEKDAY_ATTENDANCE_THIS_MONTH,
    {
      variables: { constituencyId: constituencyId },
    }
  )

  const constituency = data?.constituencies[0]

  const details = [
    {
      churchType: 'Constituency',
      cardType: 'Attendance',
      leadersName: `${constituency?.leader?.firstName} ${constituency?.leader?.lastName}`,
      churchName: `${constituency?.name}`,
      churchAvgAttendanceThisMonth: `${constituency?.avgWeekdayAttendanceThisMonth}`,
      avgHigherLevelAttendanceThisMonth: `${constituency?.council?.avgConstituencyWeekdayAttendanceThisMonth}`,
      higherLevelName: `${constituency?.council?.name} ${constituency?.council?.__typename}`,
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
export default ConstituencyAvgWeekdayAttendance
