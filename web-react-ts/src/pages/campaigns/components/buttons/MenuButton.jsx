import React, { useContext } from 'react'
import { MemberContext } from 'contexts/MemberContext'
import { Button } from 'react-bootstrap'

const MenuButton = (props) => {
  const { theme } = useContext(MemberContext)
  return (
    <Button
      onClick={props.onClick}
      variant="secondary"
      className={`${theme}`}
      style={{ padding: '19px 58px' }}
      size="lg"
    >
      {props.name}
    </Button>
  )
}

export default MenuButton
