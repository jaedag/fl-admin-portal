import React, { useContext } from 'react'
import QuickFactsCard from '../components/QuickFactsCard'
import '../QuickFacts.css'
import { useQuery } from '@apollo/client'
import { ChurchContext } from 'contexts/ChurchContext'
import BaseComponent from 'components/base-component/BaseComponent'
import { FELLOWSHIP_ATTENDANCE_FACTS } from '../QuickFactsQueries'
import QuickFactsSelect from '../components/QuickFactsSelect'

const FellowshipAttendanceFacts = () => {
  const { fellowshipId } = useContext(ChurchContext)

  const { data, loading, error } = useQuery(FELLOWSHIP_ATTENDANCE_FACTS, {
    variables: { fellowshipId: fellowshipId },
  })

  const fellowship = data?.fellowships[0]

  const details = [
    {
      churchType: 'Fellowship',
      cardType: 'Attendance',
      leadersName: `${fellowship?.leader?.firstName} ${fellowship?.leader?.lastName}`,
      churchName: `${fellowship?.name}`,
      churchAvgAttendanceThisMonth: `${fellowship?.avgWeekdayAttendanceThisMonth}`,
      avgHigherLevelAttendanceThisMonth: `${fellowship?.council?.fellowshipAvgAttendanceThisMonth}`,
      higherLevelName: `${fellowship?.council?.name} ${fellowship?.council?.__typename}`,
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
export default FellowshipAttendanceFacts
