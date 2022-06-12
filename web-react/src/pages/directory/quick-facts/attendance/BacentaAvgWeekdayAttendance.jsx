import React, { useContext } from 'react'
import AttendanceQuickFactsCard from '../components/AttendanceQuickFactsCard'
import '../QuickFacts.css'
import { useQuery } from '@apollo/client'
import { ChurchContext } from 'contexts/ChurchContext'
import BaseComponent from 'components/base-component/BaseComponent'
import { BACENTA_AVG_WEEKDAY_ATTENDANCE_THIS_MONTH } from '../QuickFactsQueries'
import QuickFactsHeader from '../components/QuickFactsHeader'

const BacentaAvgWeekdayAttendance = () => {
  const { bacentaId } = useContext(ChurchContext)

  const { data, loading, error } = useQuery(
    BACENTA_AVG_WEEKDAY_ATTENDANCE_THIS_MONTH,
    {
      variables: { bacentaId: bacentaId },
    }
  )

  const bacenta = data?.bacentas[0]

  const details = [
    {
      churchType: 'Bacenta',
      cardType: 'Attendance',
      leadersName: `${bacenta?.leader?.firstName} ${bacenta?.leader?.lastName}`,
      churchName: `${bacenta?.name}`,
      churchAvgAttendanceThisMonth: `${bacenta?.avgWeekdayAttendanceThisMonth}`,
      avgHigherLevelAttendanceThisMonth: `${bacenta?.council?.avgBacentaWeekdayAttendanceThisMonth}`,
      higherLevelName: `${bacenta?.council?.name} ${bacenta?.council?.__typename}`,
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
export default BacentaAvgWeekdayAttendance
