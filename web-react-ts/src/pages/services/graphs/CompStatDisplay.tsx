import PlaceholderCustom from 'components/Placeholder'
import React from 'react'
import './Graphs.css'

const StatDisplay = ({
  title,
  statistic,
  loading,
}: {
  title: string
  statistic: number
  loading: boolean
}) => {
  if (isNaN(statistic)) {
    statistic = 0
  }
  return (
    <>
      <p className="dashboard-title text-truncate">{title}</p>
      <PlaceholderCustom
        className="info-text"
        loading={loading}
        as="p"
        animation="wave"
      >
        <p className="info-text">{statistic}</p>
      </PlaceholderCustom>
    </>
  )
}

export default StatDisplay
