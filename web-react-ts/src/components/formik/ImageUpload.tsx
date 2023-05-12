import React, { useContext, useState } from 'react'
import { ErrorMessage } from 'formik'
import TextError from './TextError/TextError'
import { Container, Spinner } from 'react-bootstrap'
import { MemberContext } from 'contexts/MemberContext'
import './Formik.css'
import { FormikComponentProps } from './formik-types'

interface ImageUploadProps extends FormikComponentProps {
  uploadPreset?: string
  tags?: 'facial-recognition'
  initialValue?: string
  setFieldValue: (field: string, value: any) => void
}

const ImageUpload = (props: ImageUploadProps) => {
  const {
    label,
    name,
    initialValue,
    setFieldValue,
    uploadPreset,
    placeholder,
    tags,
    ...rest
  } = props
  const { theme, currentUser } = useContext(MemberContext)
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState('')

  // genereate a random 12 character string
  const randomString = (length: number) => {
    const chars =
      '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let result = ''
    for (let i = length; i > 0; --i)
      result += chars[Math.floor(Math.random() * 62)]
    return result
  }

  const uploadImage = async (e: any) => {
    const files = e.target.files
    const date = new Date().toISOString().slice(0, 10)
    const username = `${currentUser.firstName.toLowerCase()}-${currentUser.lastName.toLowerCase()}`
    let filename = `${username}-${currentUser.id}/${date}_${
      files[0]?.name ?? randomString(12)
    }`
    filename = filename.replace(/\s/g, '-')
    filename = filename.replace(/~/g, '-')
    filename = filename.replace(/[^a-zA-Z0-9-_]/g, '')

    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', uploadPreset || '')
    data.append('public_id', filename)

    data.append('tags', tags || '')

    setLoading(true)

    const res = await fetch(
      'https://api.cloudinary.com/v1_1/firstlovecenter/image/upload',
      {
        method: 'POST',
        body: data,
      }
    )
    const file = await res.json()

    setImage(file.secure_url)

    setFieldValue(`${name}`, file.secure_url)
    setLoading(false)
  }

  return (
    <>
      {label ? (
        <label className="label" htmlFor={name}>
          {label}
        </label>
      ) : null}
      {loading && (
        <Container className="text-center my-3">
          <Spinner animation="grow" />
        </Container>
      )}
      {(image || initialValue) && (
        <>
          <img src={image || initialValue} className="img-preview" alt="" />
        </>
      )}
      <label className="w-100">
        <input
          id={name}
          name={name}
          style={{ display: 'none' }}
          type="file"
          accept="image/png, image/webp, image/jpg, image/jpeg"
          onChange={uploadImage}
          {...rest}
        />

        <p className={`btn btn-primary image ${theme}`}>{placeholder}</p>
      </label>
      {props.error && <TextError>{props.error}</TextError>}
      {!props.error ?? <ErrorMessage name={name} component={TextError} />}
    </>
  )
}

export default ImageUpload
