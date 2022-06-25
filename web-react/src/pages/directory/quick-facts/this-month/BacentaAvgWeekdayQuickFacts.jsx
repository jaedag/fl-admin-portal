import React, { useContext } from 'react'
import AttendanceQuickFactsCard from '../components/AttendanceQuickFactsCard'
import '../QuickFacts.css'
import { useQuery } from '@apollo/client'
import { ChurchContext } from 'contexts/ChurchContext'
import BaseComponent from 'components/base-component/BaseComponent'
import {
  BACENTA_AVG_WEEKDAY_ATTENDANCE_THIS_MONTH,
  BACENTA_AVG_WEEKDAY_INCOME_THIS_MONTH,
} from '../QuickFactsQueries'
import QuickFactsHeader from '../components/QuickFactsHeader'
import IncomeQuickFactsCard from '../components/IncomeQuickFactsCard'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const BacentaAvgWeekdayAttendance = () => {
  const { bacentaId } = useContext(ChurchContext)

  const {
    data: attendanceData,
    loading: attendanceLoading,
    error: attendanceError,
  } = useQuery(BACENTA_AVG_WEEKDAY_ATTENDANCE_THIS_MONTH, {
    variables: { bacentaId: bacentaId },
  })

  const { data: incomeData } = useQuery(BACENTA_AVG_WEEKDAY_INCOME_THIS_MONTH, {
    variables: { bacentaId: bacentaId },
  })

  const bacentaAttendance = attendanceData?.bacentas[0]
  const bacentaIncome = incomeData?.bacentas[0]

  const attendanceDetails = [
    {
      churchType: 'Bacenta',
      cardType: 'Attendance',
      leadersName: `${bacentaAttendance?.leader?.firstName} ${bacentaAttendance?.leader?.lastName}`,
      churchName: `${bacentaAttendance?.name}`,
      churchAvgAttendanceThisMonth: `${bacentaAttendance?.avgWeekdayAttendanceThisMonth}`,
      avgHigherLevelAttendanceThisMonth: `${bacentaAttendance?.council?.avgBacentaWeekdayAttendanceThisMonth}`,
      higherLevelName: `${bacentaAttendance?.council?.name} ${bacentaAttendance?.council?.__typename}`,
    },
  ]

  const incomeDetails = [
    {
      churchType: 'Bacenta',
      cardType: 'Income',
      leadersName: `${bacentaIncome?.leader?.firstName} ${bacentaIncome?.leader?.lastName}`,
      churchName: `${bacentaIncome?.name}`,
      churchAvgIncomeThisMonth: `${bacentaIncome?.avgWeekdayIncomeThisMonth}`,
      avgHigherLevelIncomeThisMonth: `${bacentaIncome?.council?.avgBacentaWeekdayIncomeThisMonth}`,
      higherLevelName: `${bacentaIncome?.council?.name} ${bacentaIncome?.council?.__typename}`,
    },
  ]

  var settings = {
    dots: true,
    infinite: true,
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
export default BacentaAvgWeekdayAttendance
