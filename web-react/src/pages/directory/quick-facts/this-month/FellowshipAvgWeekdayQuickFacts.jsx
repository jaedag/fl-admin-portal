import React, { useContext } from 'react'
import AttendanceQuickFactsCard from '../components/AttendanceQuickFactsCard'
import '../QuickFacts.css'
import { useQuery } from '@apollo/client'
import { ChurchContext } from 'contexts/ChurchContext'
import BaseComponent from 'components/base-component/BaseComponent'
import {
  FELLOWSHIP_AVG_WEEKDAY_ATTENDANCE_THIS_MONTH,
  FELLOWSHIP_AVG_WEEKDAY_INCOME_THIS_MONTH,
} from '../QuickFactsQueries'
import QuickFactsHeader from '../components/QuickFactsHeader'
import IncomeQuickFactsCard from '../components/IncomeQuickFactsCard'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const FellowshipAvgWeekdayAttendance = () => {
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

  var settings = {
    dots: true,
    infinite: true,
    speed: 900,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: true,
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
          <Slider {...settings}>
            <div>
              <AttendanceQuickFactsCard attendanceDetails={attendanceDetails} />
            </div>
            <div>
              <IncomeQuickFactsCard incomeDetails={incomeDetails} />
            </div>
          </Slider>
        </div>
      </div>
    </BaseComponent>
  )
}
export default FellowshipAvgWeekdayAttendance
