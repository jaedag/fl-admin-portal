import React from 'react'
import { Dropdown } from 'react-bootstrap'
import { getServiceGraphData } from './graphs-utils'
import './GraphDropdown.css'
import { ChurchLevel } from 'global-types'

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
  const churchLevel: ChurchLevel = data?.__typename

  const sontaLevels = ['Hub', 'Ministry', 'CreativeArts']

  return (
    <Dropdown className="border-none">
      <Dropdown.Toggle variant="danger">{selected}</Dropdown.Toggle>

      <Dropdown.Menu variant="dark">
        {churchLevel === 'Bacenta' && (
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
        )}

        {!['Bacenta', ...sontaLevels].includes(churchLevel) && (
          <Dropdown.Item
            className="py-3"
            onClick={() => {
              setBussing(false)
              setSelected('Services')
              setChurchData(getServiceGraphData(data, 'service'))
            }}
          >
            {`${churchLevel} Services`}
          </Dropdown.Item>
        )}

        {['Hub'].includes(churchLevel) && (
          <Dropdown.Item
            className="py-3"
            onClick={() => {
              setBussing(false)
              setSelected('Rehearsals')
              setChurchData(getServiceGraphData(data, 'service'))
            }}
          >
            {`${churchLevel} Rehearsals`}
          </Dropdown.Item>
        )}
        {!['Bacenta', 'Fellowship', ...sontaLevels].includes(churchLevel) && (
          <Dropdown.Item
            className="py-3"
            onClick={() => {
              setBussing(true)
              setSelected('Bussing Total')
              setChurchData(getServiceGraphData(data, 'bussingAggregate'))
            }}
          >
            Bussing Total
          </Dropdown.Item>
        )}
        {!['Fellowship'].includes(churchLevel) && (
          <Dropdown.Item
            className="py-3"
            onClick={() => {
              setBussing(false)
              setSelected('Fellowship Total')
              setChurchData(getServiceGraphData(data, 'serviceAggregate'))
            }}
          >
            Weekday Total
          </Dropdown.Item>
        )}
        {['Campus', 'Oversight', 'Denomination'].includes(churchLevel) && (
          <Dropdown.Item
            className="py-3"
            onClick={() => {
              setBussing(false)
              setSelected('Services Total (USD)')
              setChurchData(
                getServiceGraphData(data, 'serviceAggregateWithDollar')
              )
            }}
          >
            Weekday Total (USD)
          </Dropdown.Item>
        )}
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default GraphDropdown
