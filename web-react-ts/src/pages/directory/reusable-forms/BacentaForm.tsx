import { useMutation, useQuery } from '@apollo/client'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import {
  FieldArray,
  FieldArrayRenderProps,
  Form,
  Formik,
  FormikHelpers,
} from 'formik'
import * as Yup from 'yup'
import {
  makeSelectOptions,
  throwToSentry,
  VACATION_OPTIONS,
} from 'global-utils'
import { permitAdmin, permitAdminArrivals } from 'permission-utils'
import { GET_COUNCIL_CONSTITUENCIES } from 'queries/ListQueries'
import React, { useContext, useState } from 'react'
import { ChurchContext } from 'contexts/ChurchContext'
import PlusSign from 'components/buttons/PlusMinusSign/PlusSign'
import MinusSign from 'components/buttons/PlusMinusSign/MinusSign'
import { useNavigate } from 'react-router'
import { MAKE_BACENTA_INACTIVE } from 'pages/directory/update/CloseChurchMutations'
import Popup from 'components/Popup/Popup'
import RoleView from 'auth/RoleView'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import { MemberContext } from 'contexts/MemberContext'
import SubmitButton from 'components/formik/SubmitButton'
import { DISPLAY_CONSTITUENCY } from 'pages/directory/display/ReadQueries'
import usePopup from 'hooks/usePopup'
import Select from 'components/formik/Select'
import Input from 'components/formik/Input'
import SearchMember from 'components/formik/SearchMember'
import SearchFellowship from 'components/formik/SearchFellowship'
import { FormikInitialValues } from 'components/formik/formik-types'
import { Church } from 'global-types'

export interface BacentaFormValues extends FormikInitialValues {
  constituency: string
  graduationStatus: string
  vacationStatus: string
  fellowships?: Church[]
}

type BacentaFormProps = {
  initialValues: BacentaFormValues
  onSubmit: (
    values: BacentaFormValues,
    onSubmitProps: FormikHelpers<BacentaFormValues>
  ) => void
  title: string
  newBacenta: boolean
}

const BacentaForm = ({
  initialValues,
  onSubmit,
  title,
  newBacenta,
}: BacentaFormProps) => {
  const { clickCard, bacentaId } = useContext(ChurchContext)
  const [felllowshipModal, setFellowshipModal] = useState(false)
  const [closeDown, setCloseDown] = useState(false)

  const navigate = useNavigate()
  const [buttonLoading, setButtonLoading] = useState(false)
  const [CloseDownBacenta] = useMutation(MAKE_BACENTA_INACTIVE, {
    refetchQueries: [
      {
        query: DISPLAY_CONSTITUENCY,
        variables: { id: initialValues.constituency },
      },
    ],
  })

  const validationSchema = Yup.object({
    name: Yup.string().required('Bacenta Name is a required field'),
    leaderId: Yup.string().required('Please choose a leader from the dropdown'),
    fellowships: newBacenta
      ? Yup.array().nullable()
      : Yup.array().of(
          Yup.object().required('Please pick a fellowship from the dropdown')
        ),
    vacationStatus: Yup.string().required(
      'Vacation Status is a required field'
    ),
  })

  return (
    <Container>
      <HeadingPrimary>{title}</HeadingPrimary>
      <HeadingSecondary>{initialValues.name}</HeadingSecondary>
      <RoleView roles={permitAdminArrivals('Stream')}>
        <Button
          variant="warning"
          onClick={() => navigate('/bacenta/editbussing')}
        >
          Edit Bussing Details
        </Button>
      </RoleView>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        validateOnMount
      >
        {(formik) => (
          <Container className="py-4">
            <Form>
              <div className="form-group">
                <Row className="row-cols-1 row-cols-md-2">
                  {/* <!-- Basic Info Div --> */}
                  <Col className="mb-2">
                    <Row className="form-row">
                      <Col>
                        <RoleView roles={permitAdmin('Council')}>
                          <Select
                            label={`Select a Constituency`}
                            name="constituency"
                            options={constituencyOptions}
                            defaultOption={`Select a Constituency`}
                          />
                        </RoleView>
                        <Input
                          name="name"
                          label="Name of Bacenta"
                          placeholder="Enter Name Here"
                        />
                        <Select
                          name="vacationStatus"
                          options={VACATION_OPTIONS}
                          defaultOption="Choose Vacation Status"
                          label="Status"
                        />
                      </Col>
                    </Row>

                    <Row className="d-flex align-items-center mb-3">
                      <RoleView roles={permitAdminArrivals('Constituency')}>
                        <Col>
                          <SearchMember
                            name="leaderId"
                            initialValue={initialValues?.leaderName}
                            placeholder="Start typing"
                            label="Select a Leader"
                            setFieldValue={formik.setFieldValue}
                            aria-describedby="Member Search Box"
                            error={formik.errors.leaderId}
                          />
                        </Col>
                      </RoleView>
                    </Row>
                  </Col>
                </Row>
              </div>

              <SubmitButton formik={formik} />
            </Form>
            {isOpen && (
              <Popup handleClose={togglePopup}>
                Are you sure you want to close down this bacenta?
                <Button
                  variant="primary"
                  size="lg"
                  type="submit"
                  disabled={buttonLoading}
                  className={`btn-main ${theme}`}
                  onClick={() => {
                    setButtonLoading(true)
                    CloseDownBacenta({
                      variables: {
                        id: bacentaId,
                        leaderId: initialValues.leaderId,
                      },
                    })
                      .then((res) => {
                        clickCard(res.data.CloseDownBacenta)
                        setButtonLoading(false)
                        togglePopup()
                        navigate(`/constituency/displaydetails`)
                      })
                      .catch((error) => {
                        setButtonLoading(false)
                        throwToSentry(
                          'There was an error closing down this bacenta',
                          error
                        )
                      })
                  }}
                >
                  {buttonLoading ? `Submitting...` : `Yes, I'm sure`}
                </Button>
                <Button
                  variant="primary"
                  className={`btn-secondary mt-2 ${theme}`}
                  onClick={togglePopup}
                >
                  No, take me back
                </Button>
              </Popup>
            )}
            {!newBacenta && (
              <Button
                variant="primary"
                size="lg"
                disabled={formik.isSubmitting}
                className={`btn-secondary ${theme} mt-3`}
                onClick={togglePopup}
              >
                Close Down Bacenta
              </Button>
            )}
          </Container>
        )}
      </Formik>
    </Container>
  )
}

export default BacentaForm
