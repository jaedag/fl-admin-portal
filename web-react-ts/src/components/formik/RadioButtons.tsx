import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from './TextError/TextError'
import { FormikComponentProps } from './formiik-types'

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
              <span className="col pl-0" key={option.key}>
                <input
                  type="radio"
                  id={option.value}
                  {...field}
                  value={option.value}
                  checked={field.value === option.value}
                />
                <label className="pl-2" htmlFor={option.value}>
                  {option.key}
                </label>
              </span>
            )
          })
        }}
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </div>
  )
}

export default RadioButtons
