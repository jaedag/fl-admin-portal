import React from 'react'
import { Badge } from 'react-bootstrap'
import '../QuickFacts.css'

const AttendanceQuickFactsCard = (props) => {
  const details = props?.details[0]

  const getPercentageChange = (avgAttendance, avgHigherLevelAttendance) => {
    var diff = avgAttendance - avgHigherLevelAttendance
    if (isNaN(diff)) return '--'
    return Math.round((diff / avgAttendance) * 100)
  }

  const percentageRiseOrFall = getPercentageChange(
    details?.churchAvgAttendanceThisMonth,
    details?.avgHigherLevelAttendanceThisMonth
  )

  const getBadgeBackground = () => {
    if (percentageRiseOrFall >= 0) return 'green'
    return 'red'
  }

  const getBadgeColor = () => {
    if (percentageRiseOrFall >= 0) return 'badge-percentage-green'
    return 'badge-percentage-red'
  }

  return (
    <div className="w-100 text-center quick-fact-card">
      <div className="church-text">{details?.churchType}</div>
      <div className="stat-text ">
        Average Weekday <br />
        {details?.cardType}
      </div>
      <div className="leader-text">{details?.leadersName}</div>
      <div className="branch-text">
        {details?.churchName + ' ' + details?.churchType}
      </div>
      <div className="facts-number">
        {details?.churchAvgAttendanceThisMonth === 'null'
          ? '--'
          : details?.churchAvgAttendanceThisMonth}
      </div>
      <div>
        <Badge
          bg={`${getBadgeBackground()}`}
          className={`${getBadgeColor()} mt-auto`}
        >
          {percentageRiseOrFall >= 0 ? '+' : ''}
          {percentageRiseOrFall}%
        </Badge>
      </div>
      <hr className="separator" />
      <div className="facts-number text-center">
        {details?.avgHigherLevelAttendanceThisMonth === 'null'
          ? '--'
          : details?.avgHigherLevelAttendanceThisMonth}
      </div>
      <div className="average-text">
        Average {details?.churchType} <br /> Attendance
      </div>
      <div className="higher-church-text">{details?.higherLevelName}</div>
    </div>
  )
}

export default AttendanceQuickFactsCard
