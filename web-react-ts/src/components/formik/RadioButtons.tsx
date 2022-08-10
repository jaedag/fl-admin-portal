import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from './TextError/TextError'
import { FormikComponentProps } from './formiik-types'
import { Form } from 'react-bootstrap'

interface RadioButtonProps extends FormikComponentProps {}

const RadioButtons = (props: RadioButtonProps) => {
  const { label, name, options, ...rest } = props

  return (
    <div>
      {label ? (
        <div>
          <label className="font-weight-bold" htmlFor={name}>
            {label}
          </label>
        </div>
      ) : null}
      <Field name={name} className="row row-cols-2 form-control" {...rest}>
        {({ field }: any) => {
          return options?.map((option) => {
            return (
              <div className="col radio-container pl-0" key={option.key}>
                <Form.Check
                  type="radio"
                  id={option.value}
                  {...field}
                  label={option.key}
                  value={option.value}
                  checked={field.value === option.value}
                />
              </div>
            )
          })
        }}
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </div>
  )
}

export default RadioButtons
