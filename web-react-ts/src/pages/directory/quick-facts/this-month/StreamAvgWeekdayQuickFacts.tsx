import React, { useContext } from 'react'
import '../QuickFacts.css'
import { useQuery } from '@apollo/client'
import { ChurchContext } from 'contexts/ChurchContext'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { STREAM_AVG_WEEKDAY_STATS } from '../QuickFactsQueries'
import QuickFactsHeader from '../components/QuickFactsHeader'
import QuickFactsSlider from '../components/QuickFactsSlider'
import PlaceholderCustom from 'components/Placeholder'

const StreamAvgWeekdayQuickFacts = () => {
  const { streamId } = useContext(ChurchContext)

  const { data, loading, error } = useQuery(STREAM_AVG_WEEKDAY_STATS, {
    variables: { streamId: streamId, days: 30 },
  })

  const stream = data?.streams[0]
  const leadersName = `${stream?.leader?.firstName} ${stream?.leader?.lastName}`
  const churchName = `${stream?.name}`
  const higherLevelName = `${stream?.gatheringService?.name} ${stream?.gatheringService?.__typename}`

  const attendanceDetails = [
    {
      churchType: 'Stream',
      cardType: 'Attendance',
      leadersName: leadersName,
      churchName: churchName,
      churchAvgAttendanceThisMonth: `${stream?.avgWeekdayStats?.attendance}`,
      avgHigherLevelAttendanceThisMonth: `${stream?.gatheringService?.avgStreamWeekdayStats?.attendance}`,
      higherLevelName: higherLevelName,
    },
  ]

  const incomeDetails = [
    {
      churchType: 'Stream',
      cardType: 'Income',
      leadersName: leadersName,
      churchName: churchName,
      churchAvgIncomeThisMonth: `${stream?.avgWeekdayStats?.income}`,
      avgHigherLevelIncomeThisMonth: `${stream?.gatheringService?.avgStreamWeekdayStats?.income}`,
      higherLevelName: higherLevelName,
    },
  ]

  const bussingDetails = [
    {
      churchType: 'Stream',
      cardType: 'Bussing',
      leadersName: leadersName,
      churchName: churchName,
      churchBussingThisMonth: `${stream?.avgBussingAttendance}`,
      avgHigherLevelBussingThisMonth: `${stream?.gatheringService?.avgStreamBussingAttendance}`,
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
export default StreamAvgWeekdayQuickFacts
