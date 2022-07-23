import React from 'react'
import { Button } from 'react-bootstrap'
import Popup from './Popup'
import { useNavigate } from 'react-router'

interface ErrorDialogProps {
  errorMessage: string
  togglePopup: () => void
  link?: string
}

const ErrorPopup = (props: ErrorDialogProps) => {
  const { errorMessage, togglePopup, link } = props
  const navigate = useNavigate()

  return (
    <Popup handleClose={togglePopup}>
      <h6>{errorMessage}</h6>
      <Button
        variant="danger"
        type="submit"
        size="lg"
        className={`w-100 mt-2`}
        onClick={() => {
          togglePopup()
          if (link) navigate(link)
        }}
      >
        Okay
      </Button>
    </Popup>
  )
}

export default ErrorPopup
