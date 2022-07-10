import { MemberContext } from 'contexts/MemberContext'
import React, { useContext } from 'react'
import { Table } from 'react-bootstrap'
import PlaceholderCustom from '../Placeholder'
import './TableFromArrays.css'

type TableFromArrayProps = {
  tableArray: string[][]
  loading: boolean
}

const TableFromArrays = ({ tableArray, loading }: TableFromArrayProps) => {
  const { theme } = useContext(MemberContext)

  return (
    <Table variant={theme} striped bordered>
      <tbody>
        {tableArray?.map((row: string[], i: number) => (
          <tr key={i}>
            {row.map((col: string, j: number) => (
              <PlaceholderCustom
                key={j}
                as="td"
                xs={12}
                loading={loading && j % 2 === 0}
                className="td-placeholder"
              >
                <td>{col}</td>
              </PlaceholderCustom>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default TableFromArrays
