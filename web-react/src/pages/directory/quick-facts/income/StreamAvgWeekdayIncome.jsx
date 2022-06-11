import React, { useContext } from 'react'
import '../QuickFacts.css'
import { useQuery } from '@apollo/client'
import { ChurchContext } from 'contexts/ChurchContext'
import BaseComponent from 'components/base-component/BaseComponent'
import { STREAM_AVG_WEEKDAY_INCOME_THIS_MONTH } from '../QuickFactsQueries'
import QuickFactsHeader from '../components/QuickFactsHeader'
import IncomeQuickFactsCard from '../components/IncomeQuickFactsCard'

const StreamAvgWeekdayIncome = () => {
  const { streamId } = useContext(ChurchContext)

  const { data, loading, error } = useQuery(
    STREAM_AVG_WEEKDAY_INCOME_THIS_MONTH,
    {
      variables: { streamId: streamId },
    }
  )

  const stream = data?.streams[0]

  const details = [
    {
      churchType: 'Stream',
      cardType: 'Income',
      leadersName: `${stream?.leader?.firstName} ${stream?.leader?.lastName}`,
      churchName: `${stream?.name}`,
      churchAvgIncomeThisMonth: `${stream?.avgWeekdayIncomeThisMonth}`,
      avgHigherLevelIncomeThisMonth: `${stream?.gatheringService?.avgStreamWeekdayIncomeThisMonth}`,
      higherLevelName: `${stream?.gatheringService?.name} ${stream?.gatheringService?.__typename}`,
    },
  ]

  return (
    <BaseComponent loading={loading} error={error} data={data}>
      <div className="quick-fact-page">
        <QuickFactsHeader previous={'attendance'} next={'attendance'} />

        <div className=" page-padding mt-3 quick-fact-card-wrapper">
          <IncomeQuickFactsCard details={details} />
        </div>
      </div>
    </BaseComponent>
  )
}
export default StreamAvgWeekdayIncome
