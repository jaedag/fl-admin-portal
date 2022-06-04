import React, { useContext } from 'react'
import QuickFactsCard from '../components/QuickFactsCard'
import '../QuickFacts.css'
import { useQuery } from '@apollo/client'
import { ChurchContext } from 'contexts/ChurchContext'
import BaseComponent from 'components/base-component/BaseComponent'
import { BACENTA_ATTENDANCE_FACTS } from '../QuickFactsQueries'
import QuickFactsSelect from '../components/QuickFactsSelect'

const BacentaAttendanceFacts = () => {
  const { bacentaId } = useContext(ChurchContext)

  const { data, loading, error } = useQuery(BACENTA_ATTENDANCE_FACTS, {
    variables: { bacentaId: bacentaId },
  })

  const bacenta = data?.bacentas[0]

  const details = [
    {
      churchType: 'Bacenta',
      cardType: 'Attendance',
      leadersName: `${bacenta?.leader?.firstName} ${bacenta?.leader?.lastName}`,
      churchName: `${bacenta?.name}`,
      churchAvgAttendanceThisMonth: `${bacenta?.avgWeekdayAttendanceThisMonth}`,
      avgHigherLevelAttendanceThisMonth: `${bacenta?.council?.avgBacentaWeekdayAttendanceThisMonth}`,
      higherLevelName: `${bacenta?.council?.name} ${bacenta?.council?.__typename}`,
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
export default BacentaAttendanceFacts
