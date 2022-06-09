import React, { useContext } from 'react'
import QuickFactsCard from '../components/QuickFactsCard'
import '../QuickFacts.css'
import { useQuery } from '@apollo/client'
import { ChurchContext } from 'contexts/ChurchContext'
import BaseComponent from 'components/base-component/BaseComponent'
import { CONSTITUENCY_ATTENDANCE_FACTS } from '../QuickFactsQueries'
import QuickFactsSelect from '../components/QuickFactsSelect'

const ConstituencyAttendanceFacts = () => {
  const { constituencyId } = useContext(ChurchContext)

  const { data, loading, error } = useQuery(CONSTITUENCY_ATTENDANCE_FACTS, {
    variables: { constituencyId: constituencyId },
  })

  const constituency = data?.constituencies[0]

  const details = [
    {
      churchType: 'Constituency',
      cardType: 'Attendance',
      leadersName: `${constituency?.leader?.firstName} ${constituency?.leader?.lastName}`,
      churchName: `${constituency?.name}`,
      churchAvgAttendanceThisMonth: `${constituency?.avgWeekdayAttendanceThisMonth}`,
      avgHigherLevelAttendanceThisMonth: `${constituency?.council?.avgConstituencyWeekdayAttendanceThisMonth}`,
      higherLevelName: `${constituency?.council?.name} ${constituency?.council?.__typename}`,
    },
  ]

  return (
    <BaseComponent loading={loading} error={error} data={data}>
      <div className="quick-fact-page">
        <div className="d-flex justify-content-between page-padding">
          <div></div>
          <div>
            <div className="quick-fact-text">Quick Facts</div>
            <div className="mx-auto mt-2 fit-content">
              <QuickFactsSelect />
            </div>
          </div>
          <div></div>
        </div>

        <div className=" page-padding mt-3 quick-fact-card-wrapper">
          <QuickFactsCard details={details} />
        </div>
      </div>
    </BaseComponent>
  )
}
export default ConstituencyAttendanceFacts
