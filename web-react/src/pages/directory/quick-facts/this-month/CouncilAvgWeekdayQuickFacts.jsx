import React, { useContext } from 'react'
import AttendanceQuickFactsCard from '../components/AttendanceQuickFactsCard'
import '../QuickFacts.css'
import { useQuery } from '@apollo/client'
import { ChurchContext } from 'contexts/ChurchContext'
import BaseComponent from 'components/base-component/BaseComponent'
import {
  COUNCIL_AVG_WEEKDAY_ATTENDANCE_THIS_MONTH,
  COUNCIL_AVG_WEEKDAY_INCOME_THIS_MONTH,
  COUNCIL_AVG_BUSSING_THIS_MONTH,
} from '../QuickFactsQueries'
import QuickFactsHeader from '../components/QuickFactsHeader'
import IncomeQuickFactsCard from '../components/IncomeQuickFactsCard'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import BussingQuickFactsCard from '../components/BussingQuickFactsCard'

const CouncilAvgWeekdayAttendance = () => {
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

  var settings = {
    dots: true,
    infinite: true,
    speed: 900,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  }

  return (
    <BaseComponent
      loading={attendanceLoading}
      error={attendanceError}
      data={attendanceData}
    >
      <div className="quick-fact-page">
        <QuickFactsHeader />

        <div className=" page-padding mt-3 quick-fact-card-wrapper">
          <Slider {...settings} className="quick-facts-shadow">
            <div>
              <AttendanceQuickFactsCard attendanceDetails={attendanceDetails} />
            </div>
            <div>
              <IncomeQuickFactsCard incomeDetails={incomeDetails} />
            </div>
            <div>
              <BussingQuickFactsCard bussingDetails={bussingDetails} />
            </div>
          </Slider>
        </div>
      </div>
    </BaseComponent>
  )
}
export default CouncilAvgWeekdayAttendance
