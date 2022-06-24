import React from 'react'
import { Badge } from 'react-bootstrap'
import '../QuickFacts.css'

const IncomeQuickFactsCard = (props) => {
  const details = props?.details[0]

  const getPercentageChange = (avgIncome, avgHigherLevelIncome) => {
    var diff = avgIncome - avgHigherLevelIncome
    if (isNaN(diff)) return '--'
    return Math.round((diff / avgIncome) * 100)
  }

  const percentageRiseOrFall = getPercentageChange(
    details?.churchAvgIncomeThisMonth,
    details?.avgHigherLevelIncomeThisMonth
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
        {' '}
        Average Weekday <br />
        {details?.cardType}{' '}
      </div>
      <div className="leader-text">{details?.leadersName}</div>
      <div className="branch-text">
        {details?.churchName + ' ' + details?.churchType}
      </div>
      <div className="income-number">
        <span className="currency">GHS </span>
        {details?.churchAvgIncomeThisMonth === 'null'
          ? '--'
          : details?.churchAvgIncomeThisMonth}
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
      <div className="income-number">
        <span className="currency">GHS </span>
        {details?.avgHigherLevelIncomeThisMonth === 'null'
          ? '--'
          : details?.avgHigherLevelIncomeThisMonth}
      </div>
      <div className="average-text">
        Average {details?.churchType} <br /> Income
      </div>
      <div className="higher-church-text">{details?.higherLevelName}</div>
    </div>
  )
}

export default IncomeQuickFactsCard
