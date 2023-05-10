import React, { useContext } from 'react'
import '../QuickFacts.css'
import { useQuery } from '@apollo/client'
import { ChurchContext } from 'contexts/ChurchContext'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { GATHERING_SERVICE_AVG_WEEKDAY_STATS } from '../QuickFactsQueries'
import QuickFactsHeader from '../components/QuickFactsHeader'
import QuickFactsSlider from '../components/QuickFactsSlider'
import PlaceholderCustom from 'components/Placeholder'
import { AttendanceDetailsInterface } from '../components/AttendanceQuickFactsCard'
import { IncomeDetailsInterface } from '../components/IncomeQuickFactsCard'
import { MemberContext } from 'contexts/MemberContext'

const GatheringServiceAvgWeekdayQuickFacts = () => {
  const { gatheringServiceId } = useContext(ChurchContext)
  const { currentUser } = useContext(MemberContext)

  const { data, loading, error } = useQuery(
    GATHERING_SERVICE_AVG_WEEKDAY_STATS,
    {
      variables: { gatheringServiceId: gatheringServiceId, days: 30 },
    }
  )

  const gatheringService = data?.gatheringServices[0]
  const leadersName = `${gatheringService?.leader?.firstName} ${gatheringService?.leader?.lastName}`
  const churchName = `${gatheringService?.name}`
  const higherLevelName = `${gatheringService?.oversight?.name} `

  const attendanceDetails: AttendanceDetailsInterface[] = [
    {
      churchType: 'Gathering Service',
      cardType: 'Attendance',
      leadersName: leadersName,
      churchName: churchName,
      churchAvgAttendanceThisMonth: `${gatheringService?.avgWeekdayStats?.attendance}`,
      avgHigherLevelAttendanceThisMonth: `${gatheringService?.oversight?.avgGatheringServiceWeekdayStats?.attendance}`,
      higherLevelName: higherLevelName,
    },
  ]

  const incomeDetails: IncomeDetailsInterface[] = [
    {
      churchType: 'Gathering Service',
      cardType: 'Income',
      leadersName: leadersName,
      churchName: churchName,
      currency: currentUser.currency,
      churchAvgIncomeThisMonth: `${gatheringService?.avgWeekdayStats?.income}`,
      avgHigherLevelIncomeThisMonth: `${gatheringService?.oversight?.avgGatheringServiceWeekdayStats?.income}`,
      higherLevelName: higherLevelName,
    },
  ]

  const bussingDetails = [
    {
      churchType: 'Gathering Service',
      cardType: 'Bussing',
      leadersName: leadersName,
      churchName: churchName,
      churchBussingThisMonth: `${gatheringService?.avgBussingAttendance}`,
      avgHigherLevelBussingThisMonth: `${gatheringService?.oversight?.avgGatheringServiceBussingAttendance}`,
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
export default GatheringServiceAvgWeekdayQuickFacts
