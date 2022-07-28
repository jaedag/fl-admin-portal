import React, { useContext } from 'react'
import '../QuickFacts.css'
import { useQuery } from '@apollo/client'
import { ChurchContext } from 'contexts/ChurchContext'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import {
  FELLOWSHIP_AVG_WEEKDAY_ATTENDANCE_THIS_MONTH,
  FELLOWSHIP_AVG_WEEKDAY_INCOME_THIS_MONTH,
} from '../QuickFactsQueries'
import QuickFactsHeader from '../components/QuickFactsHeader'
import PlaceholderCustom from 'components/Placeholder'
import QuickFactsSlider from '../components/QuickFactsSlider'

const FellowshipAvgWeekdayQuickFacts = () => {
  const { fellowshipId } = useContext(ChurchContext)

  const {
    data: attendanceData,
    loading: attendanceLoading,
    error: attendanceError,
  } = useQuery(FELLOWSHIP_AVG_WEEKDAY_ATTENDANCE_THIS_MONTH, {
    variables: { fellowshipId: fellowshipId },
  })

  const { data: incomeData } = useQuery(
    FELLOWSHIP_AVG_WEEKDAY_INCOME_THIS_MONTH,
    {
      variables: { fellowshipId: fellowshipId },
    }
  )

  const fellowshipAttendance = attendanceData?.fellowships[0]
  const fellowshipIncome = incomeData?.fellowships[0]

  const attendanceDetails = [
    {
      churchType: 'Fellowship',
      cardType: 'Attendance',
      leadersName: `${fellowshipAttendance?.leader?.firstName} ${fellowshipAttendance?.leader?.lastName}`,
      churchName: `${fellowshipAttendance?.name}`,
      churchAvgAttendanceThisMonth: `${fellowshipAttendance?.avgWeekdayAttendanceThisMonth}`,
      avgHigherLevelAttendanceThisMonth: `${fellowshipAttendance?.council?.avgFellowshipWeekdayAttendanceThisMonth}`,
      higherLevelName: `${fellowshipAttendance?.council?.name} ${fellowshipAttendance?.council?.__typename}`,
    },
  ]

  const incomeDetails = [
    {
      churchType: 'Fellowship',
      cardType: 'Income',
      leadersName: `${fellowshipIncome?.leader?.firstName} ${fellowshipIncome?.leader?.lastName}`,
      churchName: `${fellowshipIncome?.name}`,
      churchAvgIncomeThisMonth: `${fellowshipIncome?.avgWeekdayIncomeThisMonth}`,
      avgHigherLevelIncomeThisMonth: `${fellowshipIncome?.council?.avgFellowshipWeekdayIncomeThisMonth}`,
      higherLevelName: `${fellowshipIncome?.council?.name} ${fellowshipIncome?.council?.__typename}`,
    },
  ]

  return (
    <ApolloWrapper
      loading={attendanceLoading}
      error={attendanceError}
      data={attendanceData}
    >
      <div className="quick-fact-page">
        <QuickFactsHeader />
        <PlaceholderCustom loading={attendanceLoading}>
          <div className=" page-padding mt-3 quick-fact-card-wrapper">
            <QuickFactsSlider
              attendanceDetails={attendanceDetails}
              incomeDetails={incomeDetails}
            />
          </div>
        </PlaceholderCustom>
      </div>
    </ApolloWrapper>
  )
}
export default FellowshipAvgWeekdayQuickFacts
