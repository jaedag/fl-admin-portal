import React, { useContext } from 'react'
import '../QuickFacts.css'
import { useQuery } from '@apollo/client'
import { ChurchContext } from 'contexts/ChurchContext'
import BaseComponent from 'components/base-component/BaseComponent'
import {
  CONSTITUENCY_AVG_WEEKDAY_ATTENDANCE_THIS_MONTH,
  CONSTITUENCY_AVG_WEEKDAY_INCOME_THIS_MONTH,
  CONSTITUENCY_AVG_BUSSING_THIS_MONTH,
} from '../QuickFactsQueries'
import QuickFactsHeader from '../components/QuickFactsHeader'
import QuickFactsSlider from '../components/QuickFactsSlider'
import PlaceholderCustom from 'components/Placeholder'

const ConstituencyAvgWeekdayAttendance = () => {
  const { constituencyId } = useContext(ChurchContext)

  const {
    data: attendanceData,
    loading: attendanceLoading,
    error: attendanceError,
  } = useQuery(CONSTITUENCY_AVG_WEEKDAY_ATTENDANCE_THIS_MONTH, {
    variables: { constituencyId: constituencyId },
  })

  const { data: incomeData } = useQuery(
    CONSTITUENCY_AVG_WEEKDAY_INCOME_THIS_MONTH,
    {
      variables: { constituencyId: constituencyId },
    }
  )

  const { data: bussingData } = useQuery(CONSTITUENCY_AVG_BUSSING_THIS_MONTH, {
    variables: { constituencyId: constituencyId },
  })

  const constituencyAttendance = attendanceData?.constituencies[0]
  const constituencyIncome = incomeData?.constituencies[0]
  const constituencyBussing = bussingData?.constituencies[0]

  const attendanceDetails = [
    {
      churchType: 'Constituency',
      cardType: 'Attendance',
      leadersName: `${constituencyAttendance?.leader?.firstName} ${constituencyAttendance?.leader?.lastName}`,
      churchName: `${constituencyAttendance?.name}`,
      churchAvgAttendanceThisMonth: `${constituencyAttendance?.avgWeekdayAttendanceThisMonth}`,
      avgHigherLevelAttendanceThisMonth: `${constituencyAttendance?.council?.avgConstituencyWeekdayAttendanceThisMonth}`,
      higherLevelName: `${constituencyAttendance?.council?.name} ${constituencyAttendance?.council?.__typename}`,
    },
  ]

  const incomeDetails = [
    {
      churchType: 'Constituency',
      cardType: 'Income',
      leadersName: `${constituencyIncome?.leader?.firstName} ${constituencyIncome?.leader?.lastName}`,
      churchName: `${constituencyIncome?.name}`,
      churchAvgIncomeThisMonth: `${constituencyIncome?.avgWeekdayIncomeThisMonth}`,
      avgHigherLevelIncomeThisMonth: `${constituencyIncome?.council?.avgConstituencyWeekdayIncomeThisMonth}`,
      higherLevelName: `${constituencyIncome?.council?.name} ${constituencyIncome?.council?.__typename}`,
    },
  ]

  const bussingDetails = [
    {
      churchType: 'Constituency',
      cardType: 'Bussing',
      leadersName: `${constituencyBussing?.leader?.firstName} ${constituencyBussing?.leader?.lastName}`,
      churchName: `${constituencyBussing?.name}`,
      churchBussingThisMonth: `${constituencyBussing?.avgBussingAttendanceThisMonth}`,
      avgHigherLevelBussingThisMonth: `${constituencyBussing?.council?.avgConstituencyBussingAttendanceThisMonth}`,
      higherLevelName: `${constituencyBussing?.council?.name} ${constituencyBussing?.council?.__typename}`,
    },
  ]

  return (
    <BaseComponent
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
    </BaseComponent>
  )
}
export default ConstituencyAvgWeekdayAttendance
