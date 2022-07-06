import { useState } from 'react'

const usePopup = () => {
  const [isOpen, setIsOpen] = useState(false)

  const togglePopup = () => {
    setIsOpen(!isOpen)
  }
  return { isOpen, setIsOpen, togglePopup }
}

export default usePopup
