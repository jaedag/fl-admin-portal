import React, { useContext } from 'react'
import QuickFactsCard from '../components/QuickFactsCard'
import '../QuickFacts.css'
import { useQuery } from '@apollo/client'
import { ChurchContext } from 'contexts/ChurchContext'
import BaseComponent from 'components/base-component/BaseComponent'
import { GATHERING_SERVICE_ATTENDANCE_FACTS } from '../QuickFactsQueries'
import QuickFactsSelect from '../components/QuickFactsSelect'

const GatheringServiceAttendanceFacts = () => {
  const { gatheringServiceId } = useContext(ChurchContext)

  const { data, loading, error } = useQuery(
    GATHERING_SERVICE_ATTENDANCE_FACTS,
    {
      variables: { gatheringServiceId: gatheringServiceId },
    }
  )

  const gatheringService = data?.gatheringServices[0]

  const details = [
    {
      churchType: 'Gathering Service',
      cardType: 'Attendance',
      leadersName: `${gatheringService?.leader?.firstName} ${gatheringService?.leader?.lastName}`,
      churchName: `${gatheringService?.name}`,
      churchAvgAttendanceThisMonth: `${gatheringService?.avgWeekdayAttendanceThisMonth}`,
      avgHigherLevelAttendanceThisMonth: `${gatheringService?.denomination?.avgGatheringServiceWeekdayAttendanceThisMonth}`,
      higherLevelName: `${gatheringService?.name} ${gatheringService?.__typename}`,
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

        <div className="page-padding mt-3">
          <QuickFactsCard details={details} />
        </div>
      </div>
    </BaseComponent>
  )
}
export default GatheringServiceAttendanceFacts
