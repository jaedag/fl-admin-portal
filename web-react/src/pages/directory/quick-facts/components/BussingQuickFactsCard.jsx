import React from 'react'
import { Badge } from 'react-bootstrap'
import '../QuickFacts.css'

const BussingQuickFactsCard = (props) => {
  const details = props?.bussingDetails[0]

  const getPercentageChange = (avgBussing, avgHigherLevelBussing) => {
    var diff = avgBussing - avgHigherLevelBussing
    if (isNaN(diff)) return '--'
    return Math.round((diff / avgBussing) * 100)
  }

  const percentageRiseOrFall = getPercentageChange(
    details?.churchBussingThisMonth,
    details?.avgHigherLevelBussingThisMonth
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
      <div className="stat-text "> Average {details?.cardType} </div>
      <div className="leader-text">{details?.leadersName}</div>
      <div className="branch-text">
        {details?.churchName + ' ' + details?.churchType}
      </div>
      <div className="bussing-number">
        {details?.churchBussingThisMonth === 'null'
          ? '--'
          : details?.churchBussingThisMonth}
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
      <div className="bussing-number">
        {details?.avgHigherLevelBussingThisMonth === 'null'
          ? '--'
          : details?.avgHigherLevelBussingThisMonth}
      </div>
      <div className="average-text">
        Average {details?.churchType} <br /> Bussing
      </div>
      <div className="higher-church-text">{details?.higherLevelName}</div>
    </div>
  )
}

export default BussingQuickFactsCard
