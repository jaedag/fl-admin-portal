import { ChurchIdAndName } from 'global-types'

export interface StreamForAccounts extends ChurchIdAndName {
  councils: CouncilForAccounts[]
}

export interface CouncilForAccounts extends ChurchIdAndName {
  currentBalance: number
  bussingPurseBalance: number
}
