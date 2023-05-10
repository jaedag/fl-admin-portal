import { MemberContext } from 'contexts/MemberContext'
import { ChurchIdAndName } from 'global-types'
import { useContext } from 'react'

const useSetUserChurch = () => {
  const { currentUser, setCurrentUser } = useContext(MemberContext)

  const setUserChurch = (church: ChurchIdAndName) => {
    setCurrentUser({
      ...currentUser,
      currentChurch: church,
    })

    sessionStorage.setItem(
      'currentUser',
      JSON.stringify({
        ...currentUser,
        currentChurch: church,
      })
    )
  }

  const setUserFinancials = (financials: any) => {
    setCurrentUser({
      ...currentUser,
      currentChurch: financials,
      currency: financials.currency,
      conversionRateToDollar: financials.conversionRateToDollar,
      noIncomeTracking: financials.noIncomeTracking,
    })

    sessionStorage.setItem(
      'currentUser',
      JSON.stringify({
        ...currentUser,
        currentChurch: financials,
        currency: financials.currency,
        conversionRateToDollar: financials.conversionRateToDollar,
        noIncomeTracking: financials.noIncomeTracking,
      })
    )
  }

  return { currentUser, setCurrentUser, setUserChurch, setUserFinancials }
}

export default useSetUserChurch
