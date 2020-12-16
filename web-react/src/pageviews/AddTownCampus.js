import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from '../components/formik-components/FormikControl'

import { GET_CAMPUS_APOSTLES, GET_TOWN_APOSTLES } from '../queries/ListQueries'
import {
  CREATE_TOWN_MUTATION,
  CREATE_CAMPUS_MUTATION,
} from '../queries/AdditionMutations'
import { NavBar } from '../components/NavBar'
import { ErrorScreen, LoadingScreen } from '../components/StatusScreens'
import {
  ApostleContext,
  CampusTownContext,
  ChurchContext,
} from '../context/ChurchContext'

function AddTownCampus() {
  const initialValues = {
    campusTownName: '',
    campusTownLeaderName: '',
    leaderWhatsapp: '',
    apostleSelect: '',
  }
  const { church, capitalise, phoneNum } = useContext(ChurchContext)
  const { setTownID, setCampusID } = useContext(CampusTownContext)
  const { setApostleID } = useContext(ApostleContext)

  const phoneRegExp = /^[+][(]{0,1}[1-9]{1,4}[)]{0,1}[-\s/0-9]*$/
  const validationSchema = Yup.object({
    // apostleSelect: Yup.string().required('Choose a Town'),
    campusTownName: Yup.string().required(
      `${capitalise(church.church)} Name is a required field`
    ),
    leaderWhatsapp: Yup.string().matches(
      phoneRegExp,
      `Phone Number must start with + and country code (eg. '+233')`
    ),
  })

  const [AddTown, { data: newTownData }] = useMutation(CREATE_TOWN_MUTATION, {
    onCompleted: (newTownData) => {
      setTownID(newTownData.AddTown.townID)
    },
  })
  console.log(phoneNum, newTownData, newCampusData)
  const [AddCampus, { data: newCampusData }] = useMutation(
    CREATE_CAMPUS_MUTATION,
    {
      onCompleted: (newCampusData) => {
        setCampusID(newCampusData.AddCampus.campusID)
      },
    }
  )
  const history = useHistory()

  const {
    data: apostleCampusData,
    loading: apostleCampusLoading,
    error: apostleCampusError,
  } = useQuery(GET_CAMPUS_APOSTLES)
  const {
    data: apostleTownData,
    loading: apostleTownLoading,
    error: apostleTownError,
  } = useQuery(GET_TOWN_APOSTLES)

  if (apostleCampusLoading || apostleTownLoading) {
    return <LoadingScreen />
  } else if (apostleCampusError || apostleTownError) {
    return <ErrorScreen />
  } else if (
    (apostleCampusData && church.church === 'campus') ||
    (apostleTownData && church.church === 'town')
  ) {
    const apostleCampusOptions = apostleCampusData.apostlesListCampus.map(
      (apostle) => ({
        value: apostle.memberID,
        key: apostle.firstName + ' ' + apostle.lastName,
      })
    )

    const apostleTownOptions = apostleTownData.apostlesListTown.map(
      (apostle) => ({
        value: apostle.memberID,
        key: apostle.firstName + ' ' + apostle.lastName,
      })
    )

    //onSubmit receives the form state as argument
    const onSubmit = (values, onSubmitProps) => {
      setApostleID(values.apostleSelect)
      if (church.church === 'town') {
        AddTown({
          variables: {
            townName: values.campusTownName,
            townLeaderName: values.campusTownLeaderName,
            lWhatsappNumber: values.leaderWhatsapp,
            apostleID: values.apostleSelect,
          },
        })
      } else if (church.church === 'campus') {
        AddCampus({
          variables: {
            campusName: values.campusTownName,
            campusLeaderName: values.campusTownLeaderName,
            lWhatsappNumber: values.leaderWhatsapp,
            apostleID: values.apostleSelect,
          },
        })
      }
      // console.log(newTownData)
      // console.log(newCampusData)

      console.log('Form data', values)
      onSubmitProps.setSubmitting(false)
      history.push(`/${church.church}/displaydetails`)
    }

    return (
      <div>
        <NavBar />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => (
            <div className="body-card py-4 container mt-5">
              <div className="container infobar">{`Start a New ${capitalise(
                church.church
              )}`}</div>
              <Form>
                <div className="form-group">
                  <div className="row row-cols-1 row-cols-md-2">
                    {/* <!-- Basic Info Div --> */}
                    <div className="col mb-2">
                      <div className="form-row row-cols-2">
                        <div className="col-8">
                          <FormikControl
                            className="form-control"
                            control="select"
                            name="apostleSelect"
                            options={
                              church.church === 'campus'
                                ? apostleCampusOptions
                                : apostleTownOptions
                            }
                            defaultOption="Select an Apostle"
                          />
                        </div>
                      </div>

                      <div className="form-row row-cols-3">
                        <div className="col-9">
                          <FormikControl
                            className="form-control"
                            control="input"
                            name="campusTownName"
                            placeholder={`Name of ${capitalise(church.church)}`}
                          />
                        </div>
                      </div>
                      <div className="row d-flex align-items-center">
                        <div className="col">
                          <FormikControl
                            className="form-control"
                            control="input"
                            name="campusTownLeaderName"
                            placeholder={`Name of ${capitalise(
                              church.church
                            )} GSO`}
                          />
                        </div>
                      </div>
                      <div className="form-row row-cols-3">
                        <div className="col-9">
                          <FormikControl
                            className="form-control"
                            control="input"
                            name="leaderWhatsapp"
                            placeholder="Enter Leader WhatsApp No"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-center">
                  <button
                    type="submit"
                    disabled={!formik.isValid || formik.isSubmitting}
                    className="btn btn-primary px-5 py-3"
                  >
                    Submit
                  </button>
                </div>
              </Form>
            </div>
          )}
        </Formik>
      </div>
    )
  }
}

export default AddTownCampus
