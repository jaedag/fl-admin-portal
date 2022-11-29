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

const MultiImageUpload = (props: ImageUploadProps) => {
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

  const [uploadedImages, setUploadedImages] = useState<string[]>([])

  const uploadImage = async (e: any) => {
    const chosenImages = Array.prototype.slice.call(e.target.files)
    handleUploadImages(chosenImages)
  }

  const handleUploadImages = async (files: any[]) => {
    const uploaded: string[] = [...uploadedImages]

    files.forEach(async (file: any) => {
      const date = new Date().toISOString().slice(0, 10)
      const username = `${currentUser.firstName.toLowerCase()}-${currentUser.lastName.toLowerCase()}`
      let filename = `${username}-${currentUser.id}/${date}_${file.name}`
      filename = filename.replace(/\s/g, '-')
      filename = filename.replace(/~/g, '-')
      const data = new FormData()
      data.append('file', file)
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
      const image = await res.json()

      uploaded.push(image.secure_url)
      setUploadedImages([...uploaded])
      setFieldValue(`${name}`, uploaded)
    })
    setLoading((prev) => !prev)
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

      <div className="container mb-4 card-button-row">
        <table>
          <tbody>
            <tr>
              {uploadedImages?.map((image, index) => (
                <td className="col-auto" key={index}>
                  <img
                    src={image || initialValue}
                    className="multiimage-preview"
                    alt=""
                  />
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <label className="w-100">
        <input
          style={{ display: 'none' }}
          type="file"
          accept="image/png, image/webp, image/jpg, image/jpeg"
          onChange={(e) => uploadImage(e)}
          multiple
          {...rest}
        />

        <p className={`btn btn-primary image ${theme}`}>{placeholder}</p>
      </label>
      {props.error && <TextError>{props.error}</TextError>}
      {!props.error ?? <ErrorMessage name={name} component={TextError} />}
    </>
  )
}

export default MultiImageUpload
