import { PlaceType } from './MapComponent'

type MapIconType = google.maps.Icon

export const getMapIcon = (place: PlaceType) => {
  if (place.typename === 'UniversityVenue') {
    return {
      url: 'https://res.cloudinary.com/firstlovecenter/image/upload/v1678237752/home-solid_p0plyb.svg',
      scaledSize: new google.maps.Size(30, 30),
    } as MapIconType
  }

  return undefined
}

export const getMapIconClass = (place: PlaceType) => {
  if (place.typename === 'UniversityVenue') {
    return 'university-venue-label'
  }

  return undefined
}
