/* eslint-disable no-unused-vars */
import { FormikHelpers } from 'formik'
import { Fellowship } from 'global-types'

export type CreateMemberFormOptions = {
  firstName: string
  middleName: string
  lastName: string
  gender: 'Male' | 'Female' | ''
  phoneNumber: string
  whatsappNumber: string
  email?: string
  dob: string
  maritalStatus: 'Single' | 'Married' | ''
  occupation: string
  pictureUrl: string
  idlLocation: string
  fellowship: Fellowship | { [key: string]: unknown }
  ministry: string
}

export type MemberFormProps = {
  initialValues: CreateMemberFormOptions
  onSubmit: (
    values: CreateMemberFormOptions,
    onSubmitProps: FormikHelpers<CreateMemberFormOptions>
  ) => void
  title: string
  loading: boolean
  update?: boolean
}
