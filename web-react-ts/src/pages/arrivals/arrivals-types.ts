import { ApolloError } from '@apollo/client'
import {
  Bacenta,
  Church,
  ChurchLevel,
  Constituency,
  Member,
  Stream,
  StreamOptions,
  TimeGraph,
} from 'global-types'

type Network = 'MTN' | 'Vodafone' | 'AirtelTigo' | 'Airtel' | 'Tigo'

export interface BussingRecord {
  id: string
  week: number
  created_at: string
  mobilisationPicture: string
  created_by: Member
  serviceDate: TimeGraph

  bussingPictures?: string[]
  attendance: number
  leaderDeclaration: number
  personalContribution: number
  numberOfBusses: number
  numberOfSprinters: number
  numberOfUrvans: number
  numberOfCars: number
  bussingCost: number
  bussingTopUp: number
  counted_by: Member

  comments: string
  arrivalTime: Date
  transactionId: number
  arrival_confirmed_by: Member

  mobileNetwork: Network
  momoNumber: string
  momoName: string
}

export interface StreamWithArrivals extends Stream {
  mobilisationStartTime: string
  mobilisationEndTime: string
  arrivalStartTime: string
  arrivalEndTime: string
  arrivalsConfirmers: Member[]
  arrivalsCounters: Member[]
}

export type BusZone = {
  id: string
  number: number
  sprinterCost: number
  urvanCost: number
}

export interface BacentaWithArrivals extends Bacenta {
  stream: StreamWithArrivals
  stream_name: StreamOptions
  arrivalsCodeOfTheDay: string
  momoNumber: string
  zone: BusZone
  bussing: BussingRecord[]
}

export interface HigherChurchWithArrivals extends Church {
  __typename: 'Constituency' | 'Stream' | 'Council' | 'GatheringService'
  stream_name: StreamOptions
  stream: Stream
  activeBacentaCount: number
  bacentasNoActivity: BacentaWithArrivals[]
  bacentasMobilising: BacentaWithArrivals[]
  bacentasOnTheWay: BacentaWithArrivals[]
  bacentasBelow8: BacentaWithArrivals[]
  bacentasHaveArrived: BacentaWithArrivals[]
  bacentasNotCounted: BacentaWithArrivals[]

  bacentasNotCountedCount: number
  bacentasNoActivityCount: number
  bacentasMobilisingCount: number
  bacentasOnTheWayCount: number
  bacentasBelow8Count: number
  bacentasHaveArrivedCount: number
  bussingMembersOnTheWayCount: number
  bussingMembersHaveArrivedCount: number
  [key: string]: any
}

export interface ArrivalsUseChurchType {
  church: HigherChurchWithArrivals | null
  loading: boolean
  error: ApolloError | undefined
}

export interface ArrivalsUseChurchExt extends ArrivalsUseChurchType {
  subChurchLevel: ChurchLevel
}
