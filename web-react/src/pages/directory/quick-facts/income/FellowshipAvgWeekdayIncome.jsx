import React, { useContext } from 'react'
import '../QuickFacts.css'
import { useQuery } from '@apollo/client'
import { ChurchContext } from 'contexts/ChurchContext'
import BaseComponent from 'components/base-component/BaseComponent'
import { FELLOWSHIP_AVG_WEEKDAY_INCOME_THIS_MONTH } from '../QuickFactsQueries'
import QuickFactsHeader from '../components/QuickFactsHeader'
import IncomeQuickFactsCard from '../components/IncomeQuickFactsCard'

const FellowshipAvgWeekdayIncome = () => {
  const { fellowshipId } = useContext(ChurchContext)

  const { data, loading, error } = useQuery(
    FELLOWSHIP_AVG_WEEKDAY_INCOME_THIS_MONTH,
    {
      variables: { fellowshipId: fellowshipId },
    }
  )

  const fellowship = data?.fellowships[0]

  const details = [
    {
      churchType: 'Fellowship',
      cardType: 'Income',
      leadersName: `${fellowship?.leader?.firstName} ${fellowship?.leader?.lastName}`,
      churchName: `${fellowship?.name}`,
      churchAvgIncomeThisMonth: `${fellowship?.avgWeekdayIncomeThisMonth}`,
      avgHigherLevelIncomeThisMonth: `${fellowship?.council?.avgFellowshipWeekdayIncomeThisMonth}`,
      higherLevelName: `${fellowship?.council?.name} ${fellowship?.council?.__typename}`,
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
export default FellowshipAvgWeekdayIncome
