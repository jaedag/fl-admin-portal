import { ApolloError } from '@apollo/client'
import { Church, StreamOptions, Fellowship } from 'global-types'

interface FellowshipWithArrivals extends Fellowship {
  __typename: 'Fellowship'
}

interface HigherChurchWithDefaulters extends Church {
  __typename: 'Constituency' | 'Stream' | 'Council' | 'GatheringService'
  stream_name: StreamOptions
  servicesThisWeek: FellowshipWithArrivals[]
  formDefaultersThisWeek: FellowshipWithArrivals[]
  bankedThisWeek: FellowshipWithArrivals[]
  bankingDefaultersThisWeek: FellowshipWithArrivals[]
  cancelledServicesThisWeek: FellowshipWithArrivals[]

  servicesThisWeekCount: number
  formDefaultersThisWeekCount: number
  bankedThisWeekCount: number
  bankingDefaultersThisWeekCount: number
  cancelledServicesThisWeekCount: number

  [key: string]: any
}

export interface DefaultersUseChurchtype {
  church: HigherChurchWithDefaulters | null
  loading: boolean
  error: ApolloError | undefined
}
