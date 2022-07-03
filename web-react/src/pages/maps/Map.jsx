import { GoogleMap } from '@react-google-maps/api'
import { useCallback, useMemo, useRef } from 'react'
import { Col, Row } from 'react-bootstrap'
import './Map.css'

const Map = () => {
  const mapRef = useRef()
  const center = useMemo(() => ({ lat: 5.655949, lng: -0.167033 }), [])
  const options = useMemo(() => ({
    mapId: 'b0ab33f7a0fc53d5',
    disableDefaultUI: true,
    clickableIcons: false,
  }))
  const onLoad = useCallback((map) => (mapRef.current = map), [])

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

export default Map
