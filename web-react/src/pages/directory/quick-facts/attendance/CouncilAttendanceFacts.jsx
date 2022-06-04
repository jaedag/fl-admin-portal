import React, { useContext } from 'react'
import QuickFactsCard from '../components/QuickFactsCard'
import '../QuickFacts.css'
import { useQuery } from '@apollo/client'
import { ChurchContext } from 'contexts/ChurchContext'
import BaseComponent from 'components/base-component/BaseComponent'
import { COUNCIL_ATTENDANCE_FACTS } from '../QuickFactsQueries'
import QuickFactsSelect from '../components/QuickFactsSelect'

const CouncilAttendanceFacts = () => {
  const { councilId } = useContext(ChurchContext)

  const { data, loading, error } = useQuery(COUNCIL_ATTENDANCE_FACTS, {
    variables: { councilId: councilId },
  })

  const council = data?.councils[0]

  const details = [
    {
      churchType: 'Council',
      cardType: 'Attendance',
      leadersName: `${council?.leader?.firstName} ${council?.leader?.lastName}`,
      churchName: `${council?.name}`,
      churchAvgAttendanceThisMonth: `${council?.avgWeekdayAttendanceThisMonth}`,
      avgHigherLevelAttendanceThisMonth: `${council?.stream?.avgCouncilWeekdayAttendanceThisMonth}`,
      higherLevelName: `${council?.stream?.name} ${council?.stream?.__typename}`,
    },
  ]

  return (
    <BaseComponent loading={loading} error={error} data={data}>
      <div>
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

        <div className=" page-padding mt-3">
          <QuickFactsCard details={details} />
        </div>
      </div>
    </BaseComponent>
  )
}
export default CouncilAttendanceFacts
