import { addMinutes } from 'jd-date-utils'
import { getTodayTime } from 'jd-date-utils'
import { isToday } from 'jd-date-utils'
import { BacentaWithArrivals, BussingRecord } from './arrivals-types'

export const MOBILE_NETWORK_OPTIONS = [
  { key: '', value: '' },
  { key: 'MTN', value: 'MTN' },
  { key: 'Vodafone', value: 'Vodafone' },
  { key: 'AirtelTigo', value: 'AirtelTigo' },
]

const isArrivalsToday = (bacenta: BacentaWithArrivals) => {
  if (!bacenta) return false

  const today = new Date().getDay()
  if (
    today === 6 &&
    (bacenta.stream_name.toLowerCase() === 'anagkazo' ||
      bacenta.stream_name.toLowerCase() === 'campus')
  ) {
    // Anagkazo and Campus are on Saturday
    return true
  }

  if (today === 0 && bacenta.stream_name.toLowerCase() === 'town') {
    return true
  }

  return false
}

export const beforeCountingDeadline = (
  bussing: BussingRecord,
  church: BacentaWithArrivals
) => {
  if (!bussing || !church) {
    return
  }

  const today = new Date()

  if (church?.__typename !== 'Bacenta') return false

  const arrivalStartTime = new Date(
    getTodayTime(church?.stream.arrivalStartTime)
  )
  const arrivalEndTime = new Date(getTodayTime(church?.stream.arrivalEndTime))
  const countingEndTime = addMinutes(arrivalEndTime.toString(), 30)

  if (
    isArrivalsToday(church) &&
    arrivalStartTime < today &&
    today < countingEndTime
  ) {
    if (isToday(bussing?.created_at)) {
      //If the record was created today
      //And if the time is less than the arrivals cutoff time
      return true
    }
  }

  // return false
  return false
}

export const beforeArrivalDeadline = (
  bussing: BussingRecord,
  church: BacentaWithArrivals
) => {
  if (!church) {
    return
  }

  const today = new Date()

  if (church?.__typename !== 'Bacenta') return

  const arrivalStartTime = new Date(
    getTodayTime(church?.stream.arrivalStartTime)
  )
  const arrivalEndTime = new Date(getTodayTime(church?.stream.arrivalEndTime))

  if (
    isArrivalsToday(church) &&
    arrivalStartTime < today &&
    today < arrivalEndTime
  ) {
    if (!bussing) {
      return true
    }

    if (isToday(bussing?.created_at) && !bussing?.bussingPictures) {
      //If the record was created today
      //And if the time is less than the arrivals cutoff time
      return true
    }
  }

  // return false
  return false
}

export const beforeMobilisationDeadline = (
  church?: BacentaWithArrivals,
  bussing?: BussingRecord
) => {
  if (!church) {
    return
  }

  const today = new Date()

  if (church?.__typename !== 'Bacenta') return

  const mobilisationStartTime = new Date(
    getTodayTime(church?.stream.mobilisationStartTime)
  )
  const mobilisationEndTime = new Date(
    getTodayTime(church?.stream.mobilisationEndTime)
  )

  if (
    isArrivalsToday(church) &&
    mobilisationStartTime < today &&
    today < mobilisationEndTime
  ) {
    if (!bussing) return true

    if (!isToday(bussing?.created_at)) return true

    if (isToday(bussing?.created_at) && !bussing?.mobilisationPicture) {
      return true //Should Fill
    }
  }

  // return false
  return false
}
