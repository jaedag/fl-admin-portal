import React, { useContext } from 'react'
import '../QuickFacts.css'
import { useQuery } from '@apollo/client'
import { ChurchContext } from 'contexts/ChurchContext'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { BACENTA_AVG_WEEKDAY_STATS } from '../QuickFactsQueries'
import QuickFactsHeader from '../components/QuickFactsHeader'
import QuickFactsSlider from '../components/QuickFactsSlider'
import PlaceholderCustom from 'components/Placeholder'

const BacentaAvgWeekdayQuickFacts = () => {
  const { bacentaId } = useContext(ChurchContext)

  const { data, loading, error } = useQuery(BACENTA_AVG_WEEKDAY_STATS, {
    variables: { bacentaId: bacentaId, days: 30 },
  })

  const bacenta = data?.bacentas[0]
  const leadersName = `${bacenta?.leader?.firstName} ${bacenta?.leader?.lastName}`
  const churchName = `${bacenta?.name}`
  const higherLevelName = `${bacenta?.council?.name} ${bacenta?.council?.__typename}`

  const attendanceDetails = [
    {
      churchType: 'Bacenta',
      cardType: 'Attendance',
      leadersName: leadersName,
      churchName: churchName,
      churchAvgAttendanceThisMonth: `${bacenta?.avgWeekdayStats?.attendance}`,
      avgHigherLevelAttendanceThisMonth: `${bacenta?.council?.avgBacentaWeekdayStats?.attendance}`,
      higherLevelName: higherLevelName,
    },
  ]

  const incomeDetails = [
    {
      churchType: 'Bacenta',
      cardType: 'Income',
      leadersName: leadersName,
      churchName: churchName,
      churchAvgIncomeThisMonth: `${bacenta?.avgWeekdayStats?.income}`,
      avgHigherLevelIncomeThisMonth: `${bacenta?.council?.avgBacentaWeekdayStats?.income}`,
      higherLevelName: higherLevelName,
    },
  ]

  const bussingDetails = [
    {
      churchType: 'Bacenta',
      cardType: 'Bussing',
      leadersName: leadersName,
      churchName: churchName,
      churchBussingThisMonth: `${bacenta?.avgBussingAttendance}`,
      avgHigherLevelBussingThisMonth: `${bacenta?.council?.avgBacentaBussingAttendance}`,
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
export default BacentaAvgWeekdayQuickFacts
