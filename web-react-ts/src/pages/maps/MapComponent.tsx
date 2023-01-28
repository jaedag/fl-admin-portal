import { GoogleMap } from '@react-google-maps/api'
import LoadingScreen from 'components/base-component/LoadingScreen'
import React, { useCallback, useMemo, useRef } from 'react'
import { useLoadScript } from '@react-google-maps/api'
import { useState } from 'react'
import './Map.css'
import { Button, Offcanvas } from 'react-bootstrap'
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

  const [show, setShow] = useState(false)
  const [position, setPosition] = useState<LatLngLiteral | undefined>(undefined)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

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
        center={position ?? center}
        mapContainerClassName="map-container"
        options={options}
        onLoad={onLoad}
      />
      <Offcanvas show={show} onHide={handleClose} placement="bottom">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc.
          <Button
            onClick={() => {
              window.navigator.geolocation.getCurrentPosition((position) => {
                setPosition({
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
                })

                console.log(position.coords)

                document.getElementById('venueLongitude')?.focus()
                document.getElementById('venueLatitude')?.focus()
                document.getElementById('venueLatitude')?.blur()
              })
            }}
          >
            My location
          </Button>
        </Offcanvas.Body>
      </Offcanvas>
      <div className="floating-action">
        <Button
          variant="primary"
          onClick={handleShow}
          className="rounded-circle"
        >
          <IoChevronUp />
        </Button>
      </div>
    </div>
  )
}

export default MapComponent
