import React, { useContext } from 'react'
import AttendanceQuickFactsCard from '../components/AttendanceQuickFactsCard'
import '../QuickFacts.css'
import { useQuery } from '@apollo/client'
import { ChurchContext } from 'contexts/ChurchContext'
import BaseComponent from 'components/base-component/BaseComponent'
import { FELLOWSHIP_AVG_WEEKDAY_ATTENDANCE_THIS_MONTH } from '../QuickFactsQueries'
import QuickFactsHeader from '../components/QuickFactsHeader'

const FellowshipAvgWeekdayAttendance = () => {
  const { fellowshipId } = useContext(ChurchContext)

  const { data, loading, error } = useQuery(
    FELLOWSHIP_AVG_WEEKDAY_ATTENDANCE_THIS_MONTH,
    {
      variables: { fellowshipId: fellowshipId },
    }
  )

  const fellowship = data?.fellowships[0]

  const details = [
    {
      churchType: 'Fellowship',
      cardType: 'Attendance',
      leadersName: `${fellowship?.leader?.firstName} ${fellowship?.leader?.lastName}`,
      churchName: `${fellowship?.name}`,
      churchAvgAttendanceThisMonth: `${fellowship?.avgWeekdayAttendanceThisMonth}`,
      avgHigherLevelAttendanceThisMonth: `${fellowship?.council?.avgFellowshipWeekdayAttendanceThisMonth}`,
      higherLevelName: `${fellowship?.council?.name} ${fellowship?.council?.__typename}`,
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
export default FellowshipAvgWeekdayAttendance
