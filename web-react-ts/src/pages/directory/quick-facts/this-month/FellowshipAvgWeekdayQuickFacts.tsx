import React, { useContext } from 'react'
import '../QuickFacts.css'
import { useQuery } from '@apollo/client'
import { ChurchContext } from 'contexts/ChurchContext'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { FELLOWSHIP_AVG_WEEKDAY_STATS } from '../QuickFactsQueries'
import QuickFactsHeader from '../components/QuickFactsHeader'
import PlaceholderCustom from 'components/Placeholder'
import QuickFactsSlider from '../components/QuickFactsSlider'

const FellowshipAvgWeekdayQuickFacts = () => {
  const { fellowshipId } = useContext(ChurchContext)

  const { data, loading, error } = useQuery(FELLOWSHIP_AVG_WEEKDAY_STATS, {
    variables: { fellowshipId: fellowshipId, days: 60 },
  })

  const fellowship = data?.fellowships[0]
  const leadersName = `${fellowship?.leader?.firstName} ${fellowship?.leader?.lastName}`
  const churchName = `${fellowship?.name}`
  const higherLevelName = `${fellowship?.council?.name} ${fellowship?.council?.__typename}`

  const attendanceDetails = [
    {
      churchType: 'Fellowship',
      cardType: 'Attendance',
      leadersName: leadersName,
      churchName: churchName,
      churchAvgAttendanceThisMonth: `${fellowship?.avgWeekdayStats?.attendance}`,
      avgHigherLevelAttendanceThisMonth: `${fellowship?.council?.avgFellowshipWeekdayStats?.attendance}`,
      higherLevelName: higherLevelName,
    },
  ]

  const incomeDetails = [
    {
      churchType: 'Fellowship',
      cardType: 'Income',
      leadersName: leadersName,
      churchName: churchName,
      churchAvgIncomeThisMonth: `${fellowship?.avgWeekdayStats?.income}`,
      avgHigherLevelIncomeThisMonth: `${fellowship?.council?.avgFellowshipWeekdayStats?.income}`,
      higherLevelName: higherLevelName,
    },
  ]

  return (
    <ApolloWrapper loading={loading} error={error} data={data}>
      <div className="quick-fact-page">
        <QuickFactsHeader />
        <PlaceholderCustom loading={loading}>
          <div className=" page-padding mt-3 quick-fact-card-wrapper">
            <QuickFactsSlider
              attendanceDetails={attendanceDetails}
              incomeDetails={incomeDetails}
            />
          </div>
        </PlaceholderCustom>
      </div>
    </ApolloWrapper>
  )
}
export default FellowshipAvgWeekdayQuickFacts
