import React, { useContext } from 'react'
import IncomeQuickFactsCard from '../components/IncomeQuickFactsCard'
import '../QuickFacts.css'
import { useQuery } from '@apollo/client'
import { ChurchContext } from 'contexts/ChurchContext'
import BaseComponent from 'components/base-component/BaseComponent'
import { GATHERING_SERVICE_AVG_WEEKDAY_INCOME_THIS_MONTH } from '../QuickFactsQueries'
import QuickFactsHeader from '../components/QuickFactsHeader'

const GatheringServiceAvgWeekdayIncome = () => {
  const { gatheringServiceId } = useContext(ChurchContext)

  const { data, loading, error } = useQuery(
    GATHERING_SERVICE_AVG_WEEKDAY_INCOME_THIS_MONTH,
    {
      variables: { gatheringServiceId: gatheringServiceId },
    }
  )

  const gatheringService = data?.gatheringServices[0]

  const details = [
    {
      churchType: 'Gathering Service',
      cardType: 'Income',
      leadersName: `${gatheringService?.leader?.firstName} ${gatheringService?.leader?.lastName}`,
      churchName: `${gatheringService?.name}`,
      churchAvgIncomeThisMonth: `${gatheringService?.avgWeekdayIncomeThisMonth}`,
      avgHigherLevelIncomeThisMonth: `${gatheringService?.denomination?.avgGatheringServiceWeekdayIncomeThisMonth}`,
      higherLevelName: `${gatheringService?.name} ${gatheringService?.__typename}`,
    },
  ]

  return (
    <BaseComponent loading={loading} error={error} data={data}>
      <div className="quick-fact-page">
        <QuickFactsHeader previous={'attendance'} next={'attendance'} />

        <div className="page-padding mt-3 quick-fact-card-wrapper">
          <IncomeQuickFactsCard details={details} />
        </div>
      </div>
    </BaseComponent>
  )
}
export default GatheringServiceAvgWeekdayIncome
