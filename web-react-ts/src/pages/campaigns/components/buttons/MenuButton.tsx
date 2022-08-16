import React, { useContext } from 'react'
import { MemberContext } from 'contexts/MemberContext'
import { Button } from 'react-bootstrap'
import './TrendsButton.css'

type Props = {
  name: string
  onClick: () => void
}

const MenuButton = (props: Props) => {
  const { theme } = useContext(MemberContext)
  return (
    <Button
      onClick={props.onClick}
      variant="secondary"
      className={`${theme} menu-padding`}
      size="lg"
    >
      {props.name}
    </Button>
  )
}

export default MenuButton
