import React, { useContext } from 'react'
import QuickFactsCard from '../components/QuickFactsCard'
import '../QuickFacts.css'
import { useQuery } from '@apollo/client'
import { ChurchContext } from 'contexts/ChurchContext'
import BaseComponent from 'components/base-component/BaseComponent'
import { STREAM_ATTENDANCE_FACTS } from '../QuickFactsQueries'
import QuickFactsSelect from '../components/QuickFactsSelect'

const StreamAttendanceFacts = () => {
  const { streamId } = useContext(ChurchContext)

  const { data, loading, error } = useQuery(STREAM_ATTENDANCE_FACTS, {
    variables: { streamId: streamId },
  })

  const stream = data?.streams[0]

  const details = [
    {
      churchType: 'Stream',
      cardType: 'Attendance',
      leadersName: `${stream?.leader?.firstName} ${stream?.leader?.lastName}`,
      churchName: `${stream?.name}`,
      churchAvgAttendanceThisMonth: `${stream?.avgWeekdayAttendanceThisMonth}`,
      avgHigherLevelAttendanceThisMonth: `${stream?.gatheringService?.avgStreamWeekdayAttendanceThisMonth}`,
      higherLevelName: `${stream?.gatheringService?.name} ${stream?.gatheringService?.__typename}`,
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
export default StreamAttendanceFacts
