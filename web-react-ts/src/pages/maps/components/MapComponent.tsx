import React, { useCallback, useContext, useMemo, useRef } from 'react'
import {
  useLoadScript,
  GoogleMap,
  Marker,
  MarkerClusterer,
  InfoWindow,
} from '@react-google-maps/api'
import { useState } from 'react'
import '../Map.css'
import { Button, Col, Container, Offcanvas, Row } from 'react-bootstrap'
import { IoChevronUp } from 'react-icons/io5'
import { GooglePlaces, MemberPlaces } from '../Places'
import {
  ApolloError,
  LazyQueryExecFunction,
  OperationVariables,
} from '@apollo/client'
import { MemberContext } from 'contexts/MemberContext'
import LoadingScreen from 'components/base-component/LoadingScreen'
import './MapComponent.css'
import { getMapIcon, getMapIconClass } from './map-utils'
import CloudinaryImage from 'components/CloudinaryImage'

type LatLngLiteral = google.maps.LatLngLiteral
type MapOptions = google.maps.MapOptions

type LibrariesOptions = (
  | 'places'
  | 'drawing'
  | 'geometry'
  | 'localContext'
  | 'visualization'
)[]

type MapComponentProps = {
  memberSearch: LazyQueryExecFunction<any, OperationVariables>
  placesSearchByLocation: LazyQueryExecFunction<any, OperationVariables>
  placesSearchByName: LazyQueryExecFunction<any, OperationVariables>
  loading: boolean
  error: ApolloError | undefined
}

export type PlaceType = {
  id: string
  name: string
  typename:
    | 'GooglePlace'
    | 'Member'
    | 'Fellowship'
    | 'IndoorVenue'
    | 'OutdoorVenue'
    | 'HighSchool'
  picture?: string
  description?: string
  position: LatLngLiteral
}

const MapComponent = (props: MapComponentProps) => {
  const [libraries] = useState<LibrariesOptions>(['places'])
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY ?? '',
    libraries,
  })

  const [show, setShow] = useState(false)
  const [selected, setOffice] = useState<PlaceType>()
  const [clickedMarker, setClickedMarker] = useState<PlaceType>()
  const [places, setPlaces] = useState<PlaceType[]>([])

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const { currentUser } = useContext(MemberContext)

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

  const handleMarkerClick = (marker: PlaceType) => {
    setClickedMarker(marker)
  }

  const getTypename = (place: PlaceType) => {
    switch (place.typename) {
      case 'GooglePlace':
        return 'Office'
      case 'Member':
        return ''
      case 'Fellowship':
        return 'Fellowship'
      case 'IndoorVenue':
        return 'Indoor Venue'
      case 'OutdoorVenue':
        return 'Outdoor Venue'
      case 'HighSchool':
        return 'High School'
      default:
        return ''
    }
  }

  if (!isLoaded) {
    return <LoadingScreen />
  }

  const parseDescription = (description: string) => {
    return description.split('\n').map((item, i) => (
      <p key={i} className="mb-0">
        {item.split(':').map((item, i) => (
          <span key={i} className={i % 2 ? 'fw-bold' : 'text-secondary'}>
            {i % 2 ? `: ${item}` : item}
          </span>
        ))}
      </p>
    ))
  }

  return (
    <div className={`map`}>
      <GoogleMap
        zoom={20}
        center={center}
        mapContainerClassName="map-container"
        options={options}
        onLoad={onLoad}
      >
        {selected && (
          <>
            <Marker
              position={selected.position}
              label={{
                text: selected.name,
                className: 'marker selected ' + getMapIconClass(selected),
              }}
              onClick={() => handleMarkerClick(selected)}
            />
            {clickedMarker && (
              <InfoWindow
                position={clickedMarker.position}
                onCloseClick={() => setClickedMarker(undefined)}
              >
                <Container>
                  <Row>
                    {clickedMarker.picture && (
                      <Col>
                        <CloudinaryImage src={clickedMarker.picture} />
                      </Col>
                    )}
                    <Col>
                      <p className="info-window-header">{`${getTypename(
                        clickedMarker
                      )}: ${clickedMarker.name}`}</p>
                      <div className="info-window-text">
                        {parseDescription(clickedMarker.description ?? '')}
                      </div>
                    </Col>
                  </Row>
                </Container>
              </InfoWindow>
            )}
            <MarkerClusterer>
              {(clusterer) => (
                <div>
                  {places.map((place, index) => {
                    if (index === 0) return null

                    return (
                      <Marker
                        key={place.id}
                        label={{
                          text: place.name + ' ' + getTypename(place),
                          className: 'marker ' + getMapIconClass(place),
                        }}
                        position={place.position}
                        clusterer={clusterer}
                        icon={getMapIcon(place)}
                        onClick={() => handleMarkerClick(place)}
                      />
                    )
                  })}
                </div>
              )}
            </MarkerClusterer>
          </>
        )}
      </GoogleMap>
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
          <div>Search for a place</div>
          <GooglePlaces
            handleClose={handleClose}
            setOffice={(position) => {
              setOffice(position)
              mapRef.current?.panTo(position.position)

              props.placesSearchByLocation({
                variables: {
                  id: currentUser.id,
                  latitude: position.position.lat,
                  longitude: position.position.lng,
                },
              })
            }}
            {...props}
          />

          <div>Search our FLC Database</div>
          <MemberPlaces
            handleClose={handleClose}
            setOffice={async (position) => {
              setOffice(position)

              mapRef.current?.panTo(position.position)

              const response = await props.placesSearchByLocation({
                variables: {
                  id: currentUser.id,
                  latitude: position.position.lat,
                  longitude: position.position.lng,
                },
              })

              setPlaces(
                response.data.members[0].placesSearchByLocation.map(
                  (place: any) => ({
                    ...place,
                    position: {
                      lat: place.latitude,
                      lng: place.longitude,
                    },
                  })
                )
              )
            }}
            {...props}
          />
          <Button
            onClick={() => {
              window.navigator.geolocation.getCurrentPosition((position) => {
                mapRef.current?.panTo({
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
                })
              })

              handleClose()
            }}
          >
            My location
          </Button>
          <Button
            onClick={async () => {
              const position = { lat: 5.655949, lng: -0.167033 }

              const response = await props.placesSearchByLocation({
                variables: {
                  id: currentUser.id,
                  latitude: position.lat,
                  longitude: position.lng,
                },
              })

              setPlaces(
                response.data.members[0].placesSearchByLocation.map(
                  (place: any) => ({
                    ...place,
                    position: {
                      lat: place.latitude,
                      lng: place.longitude,
                    },
                  })
                )
              )

              mapRef.current?.panTo(position)

              handleClose()
            }}
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
