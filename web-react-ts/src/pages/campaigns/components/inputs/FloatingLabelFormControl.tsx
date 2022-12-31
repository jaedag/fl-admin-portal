import React from 'react'
import { FloatingLabel, Form } from 'react-bootstrap'

type FormControlProps = {
  label: string
  type: string
  value: number | string
  disabled: boolean
}

function FloatingLabelFormControl({
  label,
  type,
  value,
  disabled,
}: FormControlProps) {
  return (
    <FloatingLabel label={label}>
      <Form.Control
        type={type}
        value={value === null ? 0 : value}
        disabled={disabled}
      />
    </FloatingLabel>
  )
}

export default FloatingLabelFormControl
