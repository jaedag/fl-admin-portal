import React, { useContext } from 'react'
import '../QuickFacts.css'
import { useQuery } from '@apollo/client'
import { ChurchContext } from 'contexts/ChurchContext'
import BaseComponent from 'components/base-component/BaseComponent'
import {
  GATHERING_SERVICE_AVG_WEEKDAY_ATTENDANCE_THIS_MONTH,
  GATHERING_SERVICE_AVG_WEEKDAY_INCOME_THIS_MONTH,
  GATHERING_SERVICE_AVG_BUSSING_THIS_MONTH,
} from '../QuickFactsQueries'
import QuickFactsHeader from '../components/QuickFactsHeader'
import QuickFactsSlider from '../components/QuickFactsSlider'
import PlaceholderCustom from 'components/Placeholder'

const GatheringServiceAvgWeekdayAttendance = () => {
  const { gatheringServiceId } = useContext(ChurchContext)

  const {
    data: attendanceData,
    loading: attendanceLoading,
    error: attendanceError,
  } = useQuery(GATHERING_SERVICE_AVG_WEEKDAY_ATTENDANCE_THIS_MONTH, {
    variables: { gatheringServiceId: gatheringServiceId },
  })

  const { data: incomeData } = useQuery(
    GATHERING_SERVICE_AVG_WEEKDAY_INCOME_THIS_MONTH,
    {
      variables: { gatheringServiceId: gatheringServiceId },
    }
  )

  const { data: bussingData } = useQuery(
    GATHERING_SERVICE_AVG_BUSSING_THIS_MONTH,
    {
      variables: { gatheringServiceId: gatheringServiceId },
    }
  )

  const gatheringServiceAttendance = attendanceData?.gatheringServices[0]
  const gatheringServiceIncome = incomeData?.gatheringServices[0]
  const gatheringServiceBussing = bussingData?.gatheringServices[0]

  const attendanceDetails = [
    {
      churchType: 'Gathering Service',
      cardType: 'Attendance',
      leadersName: `${gatheringServiceAttendance?.leader?.firstName} ${gatheringServiceAttendance?.leader?.lastName}`,
      churchName: `${gatheringServiceAttendance?.name}`,
      churchAvgAttendanceThisMonth: `${gatheringServiceAttendance?.avgWeekdayAttendanceThisMonth}`,
      avgHigherLevelAttendanceThisMonth: `${gatheringServiceAttendance?.denomination?.avgGatheringServiceWeekdayAttendanceThisMonth}`,
      higherLevelName: `${gatheringServiceAttendance?.name} ${gatheringServiceAttendance?.__typename}`,
    },
  ]

  const incomeDetails = [
    {
      churchType: 'Gathering Service',
      cardType: 'Income',
      leadersName: `${gatheringServiceIncome?.leader?.firstName} ${gatheringServiceIncome?.leader?.lastName}`,
      churchName: `${gatheringServiceIncome?.name}`,
      churchAvgIncomeThisMonth: `${gatheringServiceIncome?.avgWeekdayIncomeThisMonth}`,
      avgHigherLevelIncomeThisMonth: `${gatheringServiceIncome?.denomination?.avgGatheringServiceWeekdayIncomeThisMonth}`,
      higherLevelName: `${gatheringServiceIncome?.name} ${gatheringServiceIncome?.__typename}`,
    },
  ]

  const bussingDetails = [
    {
      churchType: 'Gathering Service',
      cardType: 'Bussing',
      leadersName: `${gatheringServiceBussing?.leader?.firstName} ${gatheringServiceBussing?.leader?.lastName}`,
      churchName: `${gatheringServiceBussing?.name}`,
      churchBussingThisMonth: `${gatheringServiceBussing?.avgBussingAttendanceThisMonth}`,
      avgHigherLevelBussingThisMonth: `${gatheringServiceBussing?.denomination?.avgGatheringServiceBussingAttendanceThisMonth}`,
      higherLevelName: `${gatheringServiceBussing?.denomination?.name} ${gatheringServiceBussing?.denomination?.__typename}`,
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
export default GatheringServiceAvgWeekdayAttendance
