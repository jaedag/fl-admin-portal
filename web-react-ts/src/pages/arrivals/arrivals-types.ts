import { Bacenta, Member, Stream, TimeGraph } from 'global-types'

type Network = 'MTN' | 'Vodafone' | 'AirtelTigo' | 'Airtel' | 'Tigo'

export interface BussingRecord {
  id: string
  week: number
  created_at: string
  mobilisationPicture: string
  created_by: Member
  serviceDate: TimeGraph

  bussingPictures: string[]
  attendance: number
  leaderDeclaration: number
  numberOfBusses: number
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
}

export interface BacentaWithArrivals extends Bacenta {
  stream: StreamWithArrivals
  arrivalsCodeOfTheDay: string
  momoNumber: string
  normalBussingTopUp: number
  swellBussingTopUp: number
  bussing: BussingRecord[]
}
