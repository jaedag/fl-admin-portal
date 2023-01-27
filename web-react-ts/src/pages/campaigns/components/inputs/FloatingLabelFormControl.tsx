import React from 'react'
import { FloatingLabel, Form } from 'react-bootstrap'

type FormControlProps = {
  label: string
  value: string
  disabled: boolean
}

function FloatingLabelFormControl({
  label,
  value,
  disabled,
}: FormControlProps) {
  const floatingLabelValue = () => {
    if ((value === null || value === undefined) && label.includes('Income')) {
      return 'GHC 0.00'
    } else if (value !== null && label.includes('Income')) {
      const result = (+value).toLocaleString('en-US', {
        style: 'currency',
        currency: 'GHC',
      })
      return result
    } else if (value !== null && label.includes('Attendance')) {
      return value?.toLocaleString()
    } else {
      return '0'
    }
  }

  return (
    <FloatingLabel label={label}>
      <Form.Control value={floatingLabelValue()} disabled={disabled} />
    </FloatingLabel>
  )
}

export default FloatingLabelFormControl
