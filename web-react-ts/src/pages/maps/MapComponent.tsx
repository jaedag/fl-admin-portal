import { GoogleMap } from '@react-google-maps/api'
import React, { useCallback, useMemo, useRef } from 'react'
import { Col, Row } from 'react-bootstrap'
import './Map.css'

type LatLngLiteral = google.maps.LatLngLiteral
type MapOptions = google.maps.MapOptions

const MapComponent = () => {
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

  return (
    <Row>
      <Col className="col-auto">
        <div className="controls">Controls</div>
      </Col>
      <Col md={9}>
        <div className="map">
          <GoogleMap
            zoom={20}
            center={center}
            mapContainerClassName="map-container"
            options={options}
            onLoad={onLoad}
          />
        </div>
      </Col>
    </Row>
  )
}

export default MapComponent
