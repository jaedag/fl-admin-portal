import React from 'react'
import { Dropdown } from 'react-bootstrap'
import { getServiceGraphData } from './graphs-utils'
import './GraphDropdown.css'

const GraphDropdown = ({ setBussing, setChurchData, data }) => (
  <Dropdown className="border-none">
    <Dropdown.Toggle variant="danger">Select Service</Dropdown.Toggle>

    <Dropdown.Menu variant="dark">
      <Dropdown.Item
        className="py-3"
        onClick={() => {
          setBussing(true)
          setChurchData(getServiceGraphData(data, 'bussing'))
        }}
      >
        Bussing
      </Dropdown.Item>
      <Dropdown.Item
        className="py-3"
        onClick={() => {
          setBussing(false)
          setChurchData(getServiceGraphData(data))
        }}
      >
        Fellowship Services
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
)

export default GraphDropdown
