import { MemberContext } from 'contexts/MemberContext'
import React, { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import './MenuItem.css'

type MenuItemProps = {
  name: string
  onClick: () => void
  inactive: boolean
  to: string
}

const MenuItem = (props: MenuItemProps) => {
  const { name, onClick, inactive, to } = props
  const [expand, setExpand] = useState(false)
  const { theme } = useContext(MemberContext)

  useEffect(() => {
    if (inactive) {
      setExpand(false)
    }
  }, [inactive])

  return (
    <li onClick={onClick}>
      <NavLink
        className={`menu-item ${theme}`}
        to={to}
        onClick={() => {
          setExpand(!expand)
        }}
      >
        <span>{name}</span>
      </NavLink>
    </li>
  )
}

export default MenuItem
