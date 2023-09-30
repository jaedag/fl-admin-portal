import React from 'react'
import { Dropdown } from 'react-bootstrap'
import { getServiceGraphData } from './graphs-utils'
import './GraphDropdown.css'
import { ChurchLevel } from 'global-types'

type GraphDropdownProps = {
  setBussing?: React.Dispatch<React.SetStateAction<boolean>>
  setChurchData: React.Dispatch<React.SetStateAction<any>>
  setRehearsal?: React.Dispatch<React.SetStateAction<boolean>>
  setMinistryMeeting?: React.Dispatch<React.SetStateAction<boolean>>
  data: any
}

const GraphDropdown = ({
  setBussing,
  setRehearsal,
  setMinistryMeeting,
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
              setBussing && setBussing(true)
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
              setBussing && setBussing(false)
              setSelected('Services')
              setChurchData(getServiceGraphData(data, 'service'))
            }}
          >
            {`${churchLevel} Services`}
          </Dropdown.Item>
        )}

        {!['Bacenta', 'Fellowship', ...sontaLevels].includes(churchLevel) && (
          <Dropdown.Item
            className="py-3"
            onClick={() => {
              setBussing && setBussing(false)
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
              setBussing && setBussing(false)
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
              setBussing && setBussing(false)
              setSelected('Services Total (USD)')
              setChurchData(
                getServiceGraphData(data, 'serviceAggregateWithDollar')
              )
            }}
          >
            Weekday Total (USD)
          </Dropdown.Item>
        )}

        {['Hub'].includes(churchLevel) && (
          <Dropdown.Item
            className="py-3"
            onClick={() => {
              setRehearsal && setRehearsal(true)
              setSelected('Rehearsals')
              setChurchData(getServiceGraphData(data, 'rehearsal'))
            }}
          >
            {`${churchLevel} Rehearsals Total`}
          </Dropdown.Item>
        )}

        {['Ministry', 'CreativeArts'].includes(churchLevel) && (
          <Dropdown.Item
            className="py-3"
            onClick={() => {
              setBussing && setBussing(false)
              setSelected('Rehearsals')
              setChurchData(getServiceGraphData(data, 'service'))
            }}
          >
            {`${churchLevel} Rehearsals Total`}
          </Dropdown.Item>
        )}
        {['Ministry', 'CreativeArts'].includes(churchLevel) && (
          <Dropdown.Item
            className="py-3"
            onClick={() => {
              setBussing && setBussing(false)
              setSelected('Rehearsals')
              setChurchData(getServiceGraphData(data, 'service'))
            }}
          >
            {`${churchLevel} Weekend Meeting Total`}
          </Dropdown.Item>
        )}
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default GraphDropdown
