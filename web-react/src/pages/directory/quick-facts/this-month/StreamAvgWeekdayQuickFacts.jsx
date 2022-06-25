import React, { useContext } from 'react'
import AttendanceQuickFactsCard from '../components/AttendanceQuickFactsCard'
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
import IncomeQuickFactsCard from '../components/IncomeQuickFactsCard'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import BussingQuickFactsCard from '../components/BussingQuickFactsCard'

const StreamAvgWeekdayAttendance = () => {
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
            <div>
              <BussingQuickFactsCard bussingDetails={bussingDetails} />
            </div>
          </Slider>
        </div>
      </div>
    </BaseComponent>
  )
}
export default StreamAvgWeekdayAttendance
