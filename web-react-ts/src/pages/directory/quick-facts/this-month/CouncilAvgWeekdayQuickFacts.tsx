import React, { useContext } from 'react'
import '../QuickFacts.css'
import { useQuery } from '@apollo/client'
import { ChurchContext } from 'contexts/ChurchContext'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import {
  COUNCIL_AVG_WEEKDAY_ATTENDANCE_THIS_MONTH,
  COUNCIL_AVG_WEEKDAY_INCOME_THIS_MONTH,
  COUNCIL_AVG_BUSSING_THIS_MONTH,
} from '../QuickFactsQueries'
import QuickFactsHeader from '../components/QuickFactsHeader'
import QuickFactsSlider from '../components/QuickFactsSlider'
import PlaceholderCustom from 'components/Placeholder'

const CouncilAvgWeekdayQuickFacts = () => {
  const { councilId } = useContext(ChurchContext)

  const {
    data: attendanceData,
    loading: attendanceLoading,
    error: attendanceError,
  } = useQuery(COUNCIL_AVG_WEEKDAY_ATTENDANCE_THIS_MONTH, {
    variables: { councilId: councilId },
  })

  const { data: incomeData } = useQuery(COUNCIL_AVG_WEEKDAY_INCOME_THIS_MONTH, {
    variables: { councilId: councilId },
  })

  const { data: bussingData } = useQuery(COUNCIL_AVG_BUSSING_THIS_MONTH, {
    variables: { councilId: councilId },
  })

  const councilAttendance = attendanceData?.councils[0]
  const councilIncome = incomeData?.councils[0]
  const councilBussing = bussingData?.councils[0]

  const attendanceDetails = [
    {
      churchType: 'Council',
      cardType: 'Attendance',
      leadersName: `${councilAttendance?.leader?.firstName} ${councilAttendance?.leader?.lastName}`,
      churchName: `${councilAttendance?.name}`,
      churchAvgAttendanceThisMonth: `${councilAttendance?.avgWeekdayAttendanceThisMonth}`,
      avgHigherLevelAttendanceThisMonth: `${councilAttendance?.stream?.avgCouncilWeekdayAttendanceThisMonth}`,
      higherLevelName: `${councilAttendance?.stream?.name} ${councilAttendance?.stream?.__typename}`,
    },
  ]

  const incomeDetails = [
    {
      churchType: 'Council',
      cardType: 'Income',
      leadersName: `${councilIncome?.leader?.firstName} ${councilIncome?.leader?.lastName}`,
      churchName: `${councilIncome?.name}`,
      churchAvgIncomeThisMonth: `${councilIncome?.avgWeekdayIncomeThisMonth}`,
      avgHigherLevelIncomeThisMonth: `${councilIncome?.stream?.avgCouncilWeekdayIncomeThisMonth}`,
      higherLevelName: `${councilIncome?.stream?.name} ${councilIncome?.stream?.__typename}`,
    },
  ]

  const bussingDetails = [
    {
      churchType: 'Council',
      cardType: 'Bussing',
      leadersName: `${councilBussing?.leader?.firstName} ${councilBussing?.leader?.lastName}`,
      churchName: `${councilBussing?.name}`,
      churchBussingThisMonth: `${councilBussing?.avgBussingAttendanceThisMonth}`,
      avgHigherLevelBussingThisMonth: `${councilBussing?.stream?.avgCouncilBussingAttendanceThisMonth}`,
      higherLevelName: `${councilBussing?.stream?.name} ${councilBussing?.stream?.__typename}`,
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
              bussingDetails={bussingDetails}
            />
          </div>
        </PlaceholderCustom>
      </div>
    </ApolloWrapper>
  )
}
export default CouncilAvgWeekdayQuickFacts
