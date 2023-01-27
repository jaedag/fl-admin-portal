import { GoogleMap } from '@react-google-maps/api'
import LoadingScreen from 'components/base-component/LoadingScreen'
import React, { useCallback, useMemo, useRef } from 'react'
import { useLoadScript } from '@react-google-maps/api'
import { useState } from 'react'
import './Map.css'
import { Button } from 'react-bootstrap'
import { IoChevronUp } from 'react-icons/io5'

type LatLngLiteral = google.maps.LatLngLiteral
type MapOptions = google.maps.MapOptions

type LibrariesOptions = (
  | 'places'
  | 'drawing'
  | 'geometry'
  | 'localContext'
  | 'visualization'
)[]

const MapComponent = () => {
  const [libraries] = useState<LibrariesOptions>(['places'])
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY ?? '',
    libraries,
  })

  const mapRef = useRef<GoogleMap>()
  const center = useMemo<LatLngLiteral>(
    () => ({ lat: 5.655949, lng: -0.167033 }),
    []
  )
  const options = useMemo<MapOptions>(
    () => ({
      mapId: 'b0ab33f7a0fc53d5',
      disableDefaultUI: true,
      clickableIcons: false,
      mapTypeId: 'satellite',
    }),
    []
  )
  const onLoad = useCallback((map: any) => (mapRef.current = map), [])

  if (!isLoaded) {
    return <LoadingScreen />
  }

  return (
    <div className="map">
      <GoogleMap
        zoom={20}
        center={center}
        mapContainerClassName="map-container"
        options={options}
        onLoad={onLoad}
      />
      <div className="floating-action">
        <Button variant="primary" className="rounded-circle">
          <IoChevronUp />
        </Button>
      </div>
    </div>
  )
}

export default MapComponent
