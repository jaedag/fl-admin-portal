import React from 'react'
import { Link } from 'react-router-dom'
import './ViewAll.css'

const ViewAll = ({ to }: { to: string }) => {
  return (
    <Link className="view-all" to={to}>
      VIEW ALL
    </Link>
  )
}

export default ViewAll
