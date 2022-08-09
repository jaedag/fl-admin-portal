import Textarea from './Textarea'

export const arrayError = (
  array: string | string[] | number[] | undefined,
  index: number
) => {
  if (array?.length) return array[index]

  return array
}

type FormikControlProps = {
  control: 'textarea'
  name: string
  label?: string
  [key: string]: any
}

function FormikControl(props: FormikControlProps) {
  const { control, ...rest } = props

  switch (control) {
    case 'textarea':
      return <Textarea {...rest} />

    default:
      return null
  }
}

export default FormikControl
