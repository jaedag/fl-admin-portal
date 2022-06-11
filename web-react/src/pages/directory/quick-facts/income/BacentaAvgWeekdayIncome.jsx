import React, { useContext } from 'react'
import '../QuickFacts.css'
import { useQuery } from '@apollo/client'
import { ChurchContext } from 'contexts/ChurchContext'
import BaseComponent from 'components/base-component/BaseComponent'
import { BACENTA_AVG_WEEKDAY_INCOME_THIS_MONTH } from '../QuickFactsQueries'
import QuickFactsHeader from '../components/QuickFactsHeader'
import IncomeQuickFactsCard from '../components/IncomeQuickFactsCard'

const BacentaAvgWeekdayIncome = () => {
  const { bacentaId } = useContext(ChurchContext)

  const { data, loading, error } = useQuery(
    BACENTA_AVG_WEEKDAY_INCOME_THIS_MONTH,
    {
      variables: { bacentaId: bacentaId },
    }
  )

  const bacenta = data?.bacentas[0]

  const details = [
    {
      churchType: 'Bacenta',
      cardType: 'Income',
      leadersName: `${bacenta?.leader?.firstName} ${bacenta?.leader?.lastName}`,
      churchName: `${bacenta?.name}`,
      churchAvgIncomeThisMonth: `${bacenta?.avgWeekdayIncomeThisMonth}`,
      avgHigherLevelIncomeThisMonth: `${bacenta?.council?.avgBacentaWeekdayIncomeThisMonth}`,
      higherLevelName: `${bacenta?.council?.name} ${bacenta?.council?.__typename}`,
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
export default BacentaAvgWeekdayIncome
