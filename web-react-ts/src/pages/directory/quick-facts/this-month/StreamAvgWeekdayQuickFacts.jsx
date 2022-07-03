import React, { useContext } from 'react'
import '../QuickFacts.css'
import { useQuery } from '@apollo/client'
import { ChurchContext } from 'contexts/ChurchContext'
import BaseComponent from 'components/base-component/BaseComponent'
import {
  STREAM_AVG_WEEKDAY_ATTENDANCE_THIS_MONTH,
  STREAM_AVG_WEEKDAY_INCOME_THIS_MONTH,
  STREAM_AVG_BUSSING_THIS_MONTH,
} from '../QuickFactsQueries'
import QuickFactsHeader from '../components/QuickFactsHeader'
import QuickFactsSlider from '../components/QuickFactsSlider'
import PlaceholderCustom from 'components/Placeholder'

const StreamAvgWeekdayQuickFacts = () => {
  const { streamId } = useContext(ChurchContext)

  const {
    data: attendanceData,
    loading: attendanceLoading,
    error: attendanceError,
  } = useQuery(STREAM_AVG_WEEKDAY_ATTENDANCE_THIS_MONTH, {
    variables: { streamId: streamId },
  })

  const { data: incomeData } = useQuery(STREAM_AVG_WEEKDAY_INCOME_THIS_MONTH, {
    variables: { streamId: streamId },
  })

  const { data: bussingData } = useQuery(STREAM_AVG_BUSSING_THIS_MONTH, {
    variables: { streamId: streamId },
  })

  const streamAttendance = attendanceData?.streams[0]
  const streamIncome = incomeData?.streams[0]
  const streamBussing = bussingData?.streams[0]

  const attendanceDetails = [
    {
      churchType: 'Stream',
      cardType: 'Attendance',
      leadersName: `${streamAttendance?.leader?.firstName} ${streamAttendance?.leader?.lastName}`,
      churchName: `${streamAttendance?.name}`,
      churchAvgAttendanceThisMonth: `${streamAttendance?.avgWeekdayAttendanceThisMonth}`,
      avgHigherLevelAttendanceThisMonth: `${streamAttendance?.gatheringService?.avgStreamWeekdayAttendanceThisMonth}`,
      higherLevelName: `${streamAttendance?.gatheringService?.name} ${streamAttendance?.gatheringService?.__typename}`,
    },
  ]

  const incomeDetails = [
    {
      churchType: 'Stream',
      cardType: 'Income',
      leadersName: `${streamIncome?.leader?.firstName} ${streamIncome?.leader?.lastName}`,
      churchName: `${streamIncome?.name}`,
      churchAvgIncomeThisMonth: `${streamIncome?.avgWeekdayIncomeThisMonth}`,
      avgHigherLevelIncomeThisMonth: `${streamIncome?.gatheringService?.avgStreamWeekdayIncomeThisMonth}`,
      higherLevelName: `${streamIncome?.gatheringService?.name} ${streamIncome?.gatheringService?.__typename}`,
    },
  ]

  const bussingDetails = [
    {
      churchType: 'Stream',
      cardType: 'Bussing',
      leadersName: `${streamBussing?.leader?.firstName} ${streamBussing?.leader?.lastName}`,
      churchName: `${streamBussing?.name}`,
      churchBussingThisMonth: `${streamBussing?.avgBussingAttendanceThisMonth}`,
      avgHigherLevelBussingThisMonth: `${streamBussing?.gatheringService?.avgStreamBussingAttendanceThisMonth}`,
      higherLevelName: `${streamBussing?.gatheringService?.name} ${streamBussing?.gatheringService?.__typename}`,
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
export default StreamAvgWeekdayQuickFacts
