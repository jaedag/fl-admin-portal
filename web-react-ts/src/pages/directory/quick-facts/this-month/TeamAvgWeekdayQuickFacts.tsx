import React, { useContext } from 'react'
import '../QuickFacts.css'
import { useQuery } from '@apollo/client'
import { ChurchContext } from 'contexts/ChurchContext'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { TEAM_AVG_WEEKDAY_STATS } from '../QuickFactsQueries'
import QuickFactsHeader from '../components/QuickFactsHeader'
import QuickFactsSlider from '../components/QuickFactsSlider'
import PlaceholderCustom from 'components/Placeholder'
import { AttendanceDetailsInterface } from '../components/AttendanceQuickFactsCard'
import { IncomeDetailsInterface } from '../components/IncomeQuickFactsCard'
import { MemberContext } from 'contexts/MemberContext'
import { BussingDetailsInterface } from '../components/BussingQuickFactsCard'

const TeamAvgWeekdayQuickFacts = () => {
  const { teamId } = useContext(ChurchContext)
  const { currentUser } = useContext(MemberContext)

  const { data, loading, error } = useQuery(TEAM_AVG_WEEKDAY_STATS, {
    variables: { teamId: teamId, days: 30 },
  })

  const team = data?.teams[0]
  const leadersName = `${team?.leader?.firstName} ${team?.leader?.lastName}`
  const churchName = `${team?.name}`
  const higherLevelName = `${team?.council?.name} ${team?.council?.__typename}`

  const attendanceDetails: AttendanceDetailsInterface[] = [
    {
      churchType: 'Team',
      cardType: 'Attendance',
      leadersName: leadersName,
      churchName: churchName,
      churchAvgAttendanceThisMonth: `${team?.avgWeekdayStats?.attendance}`,
      avgHigherLevelAttendanceThisMonth: `${team?.council?.avgTeamWeekdayStats?.attendance}`,
      higherLevelName: higherLevelName,
    },
  ]

  const incomeDetails: IncomeDetailsInterface[] = [
    {
      churchType: 'Team',
      cardType: 'Income',
      leadersName: leadersName,
      churchName: churchName,
      currency: currentUser.currency,
      churchAvgIncomeThisMonth: `${team?.avgWeekdayStats?.income}`,
      avgHigherLevelIncomeThisMonth: `${team?.council?.avgTeamWeekdayStats.income}`,
      higherLevelName: higherLevelName,
    },
  ]

  const bussingDetails: BussingDetailsInterface[] = [
    {
      churchType: 'Team',
      cardType: 'Bussing',
      leadersName: leadersName,
      churchName: churchName,
      churchBussingThisMonth: `${team?.avgBussingAttendance}`,
      avgHigherLevelBussingThisMonth: `${team?.council?.avgTeamBussingAttendance}`,
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
export default TeamAvgWeekdayQuickFacts
