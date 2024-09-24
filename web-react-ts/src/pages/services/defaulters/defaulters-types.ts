import { ApolloError } from '@apollo/client'
import {
  Church,
  StreamOptions,
  ServiceRecord,
  Member,
  Team,
  Council,
  MemberWithoutBioData,
  Campus,
  Stream,
  Hub,
  ChurchLevel,
  Bacenta,
} from 'global-types'

export interface HigherChurchWithDefaulters extends Church {
  services?: ServiceRecord[]
  rehearsals?: ServiceRecord[]
}
export interface HubWithDefaulters extends Hub {
  __typename: 'Hub'
  campus: Campus
  rehearsals: ServiceRecord[]
}
export interface BacentaWithDefaulters extends Bacenta {
  __typename: 'Bacenta'
  team: Team
  services: ServiceRecord[]
}
export interface TeamWithDefaulters extends Team {
  __typename: 'Team'
  council: Council
  services: ServiceRecord[]
}

export interface CouncilWithDefaulters extends Council {
  __typename: 'Council'
  council: {
    __typename: string
    id: string
    name: string
    stream: Church
  }
  services: ServiceRecord[]
}
export interface StreamWithDefaulters extends Stream {
  __typename: 'Stream'
  campus: Campus
  services: ServiceRecord[]
}
export interface HigherChurchWithDefaulters extends Church {
  __typename: ChurchLevel
  admin?: MemberWithoutBioData
  stream_name: StreamOptions
  servicesThisWeek: BacentaWithDefaulters[]
  formDefaultersThisWeek: BacentaWithDefaulters[]
  bankedThisWeek: BacentaWithDefaulters[]
  bankingDefaultersThisWeek: BacentaWithDefaulters[]
  cancelledServicesThisWeek: BacentaWithDefaulters[]
  teamBankingDefaultersThisWeek: TeamWithDefaulters[]
  councilBankingDefaultersThisWeek: CouncilWithDefaulters[]
  teamBankedThisWeek: TeamWithDefaulters[]
  councilBankedThisWeek: CouncilWithDefaulters[]

  streamServicesThisWeek?: StreamWithDefaulters[]
  streamFormDefaultersThisWeek?: StreamWithDefaulters[]
  streamBankedThisWeek?: StreamWithDefaulters[]
  streamBankingDefaultersThisWeek?: StreamWithDefaulters[]
  streamCancelledServicesThisWeek?: StreamWithDefaulters[]
  streamServicesThisWeekCount?: number
  streamFormDefaultersThisWeekCount?: number
  streamBankedThisWeekCount?: number
  streamBankingDefaultersThisWeekCount?: number
  streamCancelledServicesThisWeekCount?: number
  streamTeamBankingDefaultersThisWeekCount?: number

  bankedBy: Member
  servicesThisWeekCount: number
  formDefaultersThisWeekCount: number
  bankedThisWeekCount: number
  bankingDefaultersThisWeekCount: number
  cancelledServicesThisWeekCount: number
  teamBankingDefaultersThisWeekCount: number

  [key: string]: any
}

export interface HigherSontaChurchWithDefaulters
  extends HigherChurchWithDefaulters {
  __typename: 'Ministry' | 'HubCouncil' | 'CreativeArts'
  admin?: MemberWithoutBioData
  stream_name: StreamOptions
  hubRehearsalsThisWeek: BacentaWithDefaulters[]
  hubFormDefaultersThisWeek: BacentaWithDefaulters[]
  hubsBankedThisWeek: BacentaWithDefaulters[]
  hubBankingDefaultersThisWeek: BacentaWithDefaulters[]
  hubCancelledRehearsalsThisWeek: BacentaWithDefaulters[]
  teamBankingDefaultersThisWeek: TeamWithDefaulters[]
  councilBankingDefaultersThisWeek: CouncilWithDefaulters[]
  teamBankedThisWeek: TeamWithDefaulters[]
  councilBankedThisWeek: CouncilWithDefaulters[]

  streamServicesThisWeek?: StreamWithDefaulters[]
  streamFormDefaultersThisWeek?: StreamWithDefaulters[]
  streamBankedThisWeek?: StreamWithDefaulters[]
  streamBankingDefaultersThisWeek?: StreamWithDefaulters[]
  streamCancelledServicesThisWeek?: StreamWithDefaulters[]
  streamServicesThisWeekCount?: number
  streamFormDefaultersThisWeekCount?: number
  streamBankedThisWeekCount?: number
  streamBankingDefaultersThisWeekCount?: number
  streamCancelledServicesThisWeekCount?: number
  streamTeamBankingDefaultersThisWeekCount?: number

  bankedBy: Member
  hubRehearsalsThisWeekCount: number
  hubFormDefaultersThisWeekCount: number
  hubsBankedThisWeekCount: number
  hubBankingDefaultersThisWeekCount: number
  hubCancelledRehearsalsThisWeekCount: number
  hubTeamBankingDefaultersThisWeekCount: number

  // [key: string]: any
}

export interface DefaultersUseChurchType {
  church: HigherChurchWithDefaulters | HigherSontaChurchWithDefaulters | null
  loading: boolean
  error: ApolloError | undefined
  refetch: () => Promise<any>
}
