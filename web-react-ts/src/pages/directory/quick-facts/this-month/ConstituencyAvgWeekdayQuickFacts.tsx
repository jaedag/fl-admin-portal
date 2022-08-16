import React, { useContext } from 'react'
import '../QuickFacts.css'
import { useQuery } from '@apollo/client'
import { ChurchContext } from 'contexts/ChurchContext'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { CONSTITUENCY_AVG_WEEKDAY_STATS } from '../QuickFactsQueries'
import QuickFactsHeader from '../components/QuickFactsHeader'
import QuickFactsSlider from '../components/QuickFactsSlider'
import PlaceholderCustom from 'components/Placeholder'

const ConstituencyAvgWeekdayQuickFacts = () => {
  const { constituencyId } = useContext(ChurchContext)

  const { data, loading, error } = useQuery(CONSTITUENCY_AVG_WEEKDAY_STATS, {
    variables: { constituencyId: constituencyId, days: 30 },
  })

  const constituency = data?.constituencies[0]
  const leadersName = `${constituency?.leader?.firstName} ${constituency?.leader?.lastName}`
  const churchName = `${constituency?.name}`
  const higherLevelName = `${constituency?.council?.name} ${constituency?.council?.__typename}`

  const attendanceDetails = [
    {
      churchType: 'Constituency',
      cardType: 'Attendance',
      leadersName: leadersName,
      churchName: churchName,
      churchAvgAttendanceThisMonth: `${constituency?.avgWeekdayStats?.attendance}`,
      avgHigherLevelAttendanceThisMonth: `${constituency?.council?.avgConstituencyWeekdayStats?.attendance}`,
      higherLevelName: higherLevelName,
    },
  ]

  const incomeDetails = [
    {
      churchType: 'Constituency',
      cardType: 'Income',
      leadersName: leadersName,
      churchName: churchName,
      churchAvgIncomeThisMonth: `${constituency?.avgWeekdayStats?.income}`,
      avgHigherLevelIncomeThisMonth: `${constituency?.council?.avgConstituencyWeekdayStats.income}`,
      higherLevelName: higherLevelName,
    },
  ]

  const bussingDetails = [
    {
      churchType: 'Constituency',
      cardType: 'Bussing',
      leadersName: leadersName,
      churchName: churchName,
      churchBussingThisMonth: `${constituency?.avgBussingAttendance}`,
      avgHigherLevelBussingThisMonth: `${constituency?.council?.avgConstituencyBussingAttendance}`,
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
              bussingDetails={bussingDetails}
            />
          </div>
        </PlaceholderCustom>
      </div>
    </ApolloWrapper>
  )
}
export default ConstituencyAvgWeekdayQuickFacts
