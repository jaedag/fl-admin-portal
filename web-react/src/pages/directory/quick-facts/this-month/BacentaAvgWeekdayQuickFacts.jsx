import { useContext } from 'react'
import '../QuickFacts.css'
import { useQuery } from '@apollo/client'
import { ChurchContext } from 'contexts/ChurchContext'
import BaseComponent from 'components/base-component/BaseComponent'
import {
  BACENTA_AVG_WEEKDAY_ATTENDANCE_THIS_MONTH,
  BACENTA_AVG_WEEKDAY_INCOME_THIS_MONTH,
  BACENTA_AVG_BUSSING_THIS_MONTH,
} from '../QuickFactsQueries'
import QuickFactsHeader from '../components/QuickFactsHeader'
import QuickFactsSlider from '../components/QuickFactsSlider'
import PlaceholderCustom from 'components/Placeholder'

const BacentaAvgWeekdayQuickFacts = () => {
  const { bacentaId } = useContext(ChurchContext)

  const {
    data: attendanceData,
    loading: attendanceLoading,
    error: attendanceError,
  } = useQuery(BACENTA_AVG_WEEKDAY_ATTENDANCE_THIS_MONTH, {
    variables: { bacentaId: bacentaId },
  })

  const { data: incomeData } = useQuery(BACENTA_AVG_WEEKDAY_INCOME_THIS_MONTH, {
    variables: { bacentaId: bacentaId },
  })

  const { data: bussingData } = useQuery(BACENTA_AVG_BUSSING_THIS_MONTH, {
    variables: { bacentaId: bacentaId },
  })

  const bacentaAttendance = attendanceData?.bacentas[0]
  const bacentaIncome = incomeData?.bacentas[0]
  const bacentaBussing = bussingData?.bacentas[0]

  const attendanceDetails = [
    {
      churchType: 'Bacenta',
      cardType: 'Attendance',
      leadersName: `${bacentaAttendance?.leader?.firstName} ${bacentaAttendance?.leader?.lastName}`,
      churchName: `${bacentaAttendance?.name}`,
      churchAvgAttendanceThisMonth: `${bacentaAttendance?.avgWeekdayAttendanceThisMonth}`,
      avgHigherLevelAttendanceThisMonth: `${bacentaAttendance?.council?.avgBacentaWeekdayAttendanceThisMonth}`,
      higherLevelName: `${bacentaAttendance?.council?.name} ${bacentaAttendance?.council?.__typename}`,
    },
  ]

  const incomeDetails = [
    {
      churchType: 'Bacenta',
      cardType: 'Income',
      leadersName: `${bacentaIncome?.leader?.firstName} ${bacentaIncome?.leader?.lastName}`,
      churchName: `${bacentaIncome?.name}`,
      churchAvgIncomeThisMonth: `${bacentaIncome?.avgWeekdayIncomeThisMonth}`,
      avgHigherLevelIncomeThisMonth: `${bacentaIncome?.council?.avgBacentaWeekdayIncomeThisMonth}`,
      higherLevelName: `${bacentaIncome?.council?.name} ${bacentaIncome?.council?.__typename}`,
    },
  ]

  const bussingDetails = [
    {
      churchType: 'Bacenta',
      cardType: 'Bussing',
      leadersName: `${bacentaBussing?.leader?.firstName} ${bacentaBussing?.leader?.lastName}`,
      churchName: `${bacentaBussing?.name}`,
      churchBussingThisMonth: `${bacentaBussing?.avgBussingAttendanceThisMonth}`,
      avgHigherLevelBussingThisMonth: `${bacentaBussing?.council?.avgBacentaBussingAttendanceThisMonth}`,
      higherLevelName: `${bacentaBussing?.council?.name} ${bacentaBussing?.council?.__typename}`,
    },
  ]

  return (
    <BaseComponent
      loading={attendanceLoading}
      error={attendanceError}
      data={attendanceData}
    >
      <div className="quick-fact-page">
        <QuickFactsHeader />
        <PlaceholderCustom loading={attendanceLoading}>
          <div className=" page-padding mt-3 quick-fact-card-wrapper">
            <QuickFactsSlider
              attendanceDetails={attendanceDetails}
              incomeDetails={incomeDetails}
              bussingDetails={bussingDetails}
            />
          </div>
        </PlaceholderCustom>
      </div>
    </BaseComponent>
  )
}
export default BacentaAvgWeekdayQuickFacts
