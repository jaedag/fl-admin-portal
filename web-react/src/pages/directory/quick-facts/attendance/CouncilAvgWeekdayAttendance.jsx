import React, { useContext } from 'react'
import AttendanceQuickFactsCard from '../components/AttendanceQuickFactsCard'
import '../QuickFacts.css'
import { useQuery } from '@apollo/client'
import { ChurchContext } from 'contexts/ChurchContext'
import BaseComponent from 'components/base-component/BaseComponent'
import { COUNCIL_AVG_WEEKDAY_ATTENDANCE_THIS_MONTH } from '../QuickFactsQueries'
import QuickFactsHeader from '../components/QuickFactsHeader'

const CouncilAvgWeekdayAttendance = () => {
  const { councilId } = useContext(ChurchContext)

  const { data, loading, error } = useQuery(
    COUNCIL_AVG_WEEKDAY_ATTENDANCE_THIS_MONTH,
    {
      variables: { councilId: councilId },
    }
  )

  const council = data?.councils[0]

  const details = [
    {
      churchType: 'Council',
      cardType: 'Attendance',
      leadersName: `${council?.leader?.firstName} ${council?.leader?.lastName}`,
      churchName: `${council?.name}`,
      churchAvgAttendanceThisMonth: `${council?.avgWeekdayAttendanceThisMonth}`,
      avgHigherLevelAttendanceThisMonth: `${council?.stream?.avgCouncilWeekdayAttendanceThisMonth}`,
      higherLevelName: `${council?.stream?.name} ${council?.stream?.__typename}`,
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
export default CouncilAvgWeekdayAttendance
