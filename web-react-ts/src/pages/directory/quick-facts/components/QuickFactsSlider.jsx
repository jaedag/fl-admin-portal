import React from 'react'
import IncomeQuickFactsCard from '../components/IncomeQuickFactsCard'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import BussingQuickFactsCard from '../components/BussingQuickFactsCard'
import AttendanceQuickFactsCard from '../components/AttendanceQuickFactsCard'

const QuickFactsSlider = (props) => {
  const { attendanceDetails, incomeDetails, bussingDetails } = props

  const settings = {
    dots: false,
    infinite: true,
    speed: 900,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  }

  return (
    <Slider {...settings} className="quick-facts-shadow">
      <div>
        <AttendanceQuickFactsCard attendanceDetails={attendanceDetails} />
      </div>
      <div>
        <IncomeQuickFactsCard incomeDetails={incomeDetails} />
      </div>
      {attendanceDetails[0].churchType !== 'Fellowship' && (
        <div>
          <BussingQuickFactsCard bussingDetails={bussingDetails} />
        </div>
      )}
    </Slider>
  )
}

export default QuickFactsSlider
