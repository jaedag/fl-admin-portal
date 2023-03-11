import { PlaceType } from './MapComponent'

type MapIconType = google.maps.Icon

export const getMapIcon = (place: PlaceType) => {
  if (place.typename === 'UniversityVenue') {
    return {
      url: 'https://res.cloudinary.com/firstlovecenter/image/upload/v1678534118/map-icons/univenue-marker_n2zdqi.png',
      scaledSize: new google.maps.Size(40, 40),
    } as MapIconType
  }
  if (place.typename === 'OutdoorPark') {
    return {
      url: 'https://res.cloudinary.com/firstlovecenter/image/upload/v1678533891/map-icons/loud-speaker-outdoor-venue_wqpjqr.png',
      scaledSize: new google.maps.Size(30, 30),
    } as MapIconType
  }

  if (place.typename === 'Fellowship') {
    return {
      url: 'https://res.cloudinary.com/firstlovecenter/image/upload/v1678533889/map-icons/bible-fellowship-service_hlpo0d.png',
      scaledSize: new google.maps.Size(40, 40),
    } as MapIconType
  }

  if (place.typename === 'HighSchool') {
    return {
      url: 'https://res.cloudinary.com/firstlovecenter/image/upload/v1678533894/map-icons/school-shs-schools_cfm6sr.png',
      scaledSize: new google.maps.Size(40, 40),
    } as MapIconType
  }

  return undefined
}

export const getMapIconClass = (place: PlaceType) => {
  if (place.typename === 'UniversityVenue') {
    return 'university-venue-label'
  }
  if (place.typename === 'OutdoorPark') {
    return 'outdoor-park-label'
  }

  if (place.typename === 'Fellowship') {
    return 'fellowship-label'
  }

  if (place.typename === 'HighSchool') {
    return 'high-school-label'
  }

  return undefined
}
