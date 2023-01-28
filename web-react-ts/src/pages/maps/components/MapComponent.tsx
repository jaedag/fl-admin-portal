import { GoogleMap } from '@react-google-maps/api'
import LoadingScreen from 'components/base-component/LoadingScreen'
import React, { useCallback, useMemo, useRef } from 'react'
import { useLoadScript } from '@react-google-maps/api'
import { useState } from 'react'
import '../Map.css'
import { Button, Offcanvas } from 'react-bootstrap'
import { IoChevronUp } from 'react-icons/io5'
import Places from '../Places'

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
  const [office, setOffice] = useState<LatLngLiteral>()

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
      clickableIcons: true,
      mapTypeId: 'hybrid',
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
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="bottom"
        className="offcanvas"
      >
        <Offcanvas.Header closeButton className="dark">
          <Offcanvas.Title>Maps Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="dark">
          Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc.
          <Places
            setOffice={(position) => {
              setOffice(position)
              mapRef.current?.panTo(position)
            }}
          ></Places>
          <Button
            onClick={() => {
              window.navigator.geolocation.getCurrentPosition((position) => {
                mapRef.current?.panTo({
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
                })
              })
            }}
          >
            My location
          </Button>
          <Button
            onClick={() =>
              mapRef.current?.panTo({ lat: 5.655949, lng: -0.167033 })
            }
          >
            First Love Center
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
