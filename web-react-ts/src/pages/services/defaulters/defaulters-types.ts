import { ApolloError } from '@apollo/client'
import { Church, StreamOptions, Fellowship, ServiceRecord } from 'global-types'

export interface FellowshipWithDefaulters extends Fellowship {
  __typename: 'Fellowship'
  bacenta: {
    id: string
    name: string
    constituency: Church
  }
  services: ServiceRecord[]
}

export interface HigherChurchWithDefaulters extends Church {
  __typename: 'Constituency' | 'Stream' | 'Council' | 'GatheringService'
  stream_name: StreamOptions
  servicesThisWeek: FellowshipWithDefaulters[]
  formDefaultersThisWeek: FellowshipWithDefaulters[]
  bankedThisWeek: FellowshipWithDefaulters[]
  bankingDefaultersThisWeek: FellowshipWithDefaulters[]
  cancelledServicesThisWeek: FellowshipWithDefaulters[]

  servicesThisWeekCount: number
  formDefaultersThisWeekCount: number
  bankedThisWeekCount: number
  bankingDefaultersThisWeekCount: number
  cancelledServicesThisWeekCount: number

  [key: string]: any
}

export interface DefaultersUseChurchType {
  church: HigherChurchWithDefaulters | null
  loading: boolean
  error: ApolloError | undefined
  refetch: () => Promise<any>
}
