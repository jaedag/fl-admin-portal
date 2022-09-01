import React from 'react'
import { Dropdown } from 'react-bootstrap'
import { getServiceGraphData } from './graphs-utils'
import './GraphDropdown.css'

type GraphDropdownProps = {
  setBussing: React.Dispatch<React.SetStateAction<boolean>>
  setChurchData: React.Dispatch<React.SetStateAction<any>>
  data: any
}

const GraphDropdown = ({
  setBussing,
  setChurchData,
  data,
}: GraphDropdownProps) => {
  const [selected, setSelected] = React.useState('Select Service')
  return (
    <Dropdown className="border-none">
      <Dropdown.Toggle variant="danger">{selected}</Dropdown.Toggle>

      <Dropdown.Menu variant="dark">
        <Dropdown.Item
          className="py-3"
          onClick={() => {
            setBussing(true)
            setSelected('Bussing')
            setChurchData(getServiceGraphData(data, 'bussing'))
          }}
        >
          Bussing
        </Dropdown.Item>
        <Dropdown.Item
          className="py-3"
          onClick={() => {
            setBussing(false)
            setSelected('Services')
            setChurchData(getServiceGraphData(data))
          }}
        >
          Services
        </Dropdown.Item>
        <Dropdown.Item
          className="py-3"
          onClick={() => {
            setBussing(false)
            setSelected('Bussing Total')
            setChurchData(getServiceGraphData(data, 'bussingAggregate'))
          }}
        >
          Bussing Total
        </Dropdown.Item>
        <Dropdown.Item
          className="py-3"
          onClick={() => {
            setBussing(false)
            setSelected('Fellowship Total')
            setChurchData(getServiceGraphData(data, 'serviceAggregate'))
          }}
        >
          Services Total
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default GraphDropdown
