import { useMutation, useQuery } from '@apollo/client'
import React, { useContext } from 'react'
import { Button, Container, Spinner } from 'react-bootstrap'
import {
  SET_FELLOWSHIP_TO_HUB_FELLOWSHIP,
  SET_HUB_FELLOWSHIP_TO_REGULAR_FELLOWSHIP,
} from '../update/StatusChanges'
import { ChurchContext } from 'contexts/ChurchContext'
import { DISPLAY_FELLOWSHIP } from '../display/ReadQueries'
import { useNavigate } from 'react-router'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import HeadingSecondary from 'components/HeadingSecondary'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import { Form, Formik, FormikHelpers } from 'formik'
import { makeSelectOptions, throwToSentry } from 'global-utils'
import { GET_FELLOWSHIP_COUNCIL_HUBS } from './SontaListQueries'
import Select from 'components/formik/Select'
import SubmitButton from 'components/formik/SubmitButton'

const MakeHubFellowship = () => {
  const { clickCard, fellowshipId } = useContext(ChurchContext)
  const { data, loading, error } = useQuery(DISPLAY_FELLOWSHIP, {
    variables: { id: fellowshipId },
  })
  const {
    data: hubData,
    loading: hubLoading,
    error: hubError,
  } = useQuery(GET_FELLOWSHIP_COUNCIL_HUBS, {
    variables: {
      fellowshipId,
    },
  })

  const [MakeHubFellowship] = useMutation(SET_FELLOWSHIP_TO_HUB_FELLOWSHIP)
  const [RemoveHubFellowship] = useMutation(
    SET_HUB_FELLOWSHIP_TO_REGULAR_FELLOWSHIP
  )

  const navigate = useNavigate()
  const fellowship = data?.fellowships[0]

  const initialValues = {
    hub: '',
    fellowship: fellowshipId,
  }

  const handleMakeHubFellowship = async (
    values: typeof initialValues,
    onSubmitProps: FormikHelpers<typeof initialValues>
  ) => {
    onSubmitProps.setSubmitting(true)
    try {
      await MakeHubFellowship({
        variables: {
          fellowshipId: fellowshipId,
          hubId: values.hub,
        },
      })
      clickCard(fellowshipId)
      navigate('/fellowship/displaydetails')
    } catch (error) {
      throwToSentry('Error Making Hub Fellowhsip ', error)
    } finally {
      onSubmitProps.setSubmitting(false)
    }
  }

  const handleRemoveHubFellowship = async () => {
    setBtnLoading(true)
    try {
      await RemoveHubFellowship({
        variables: {
          fellowshipId,
        },
      })
      clickCard(fellowshipId)
      navigate('/fellowship/displaydetails')
    } catch (error) {
      throwToSentry('Error Removing Hub Fellowship ', error)
    } finally {
      setBtnLoading(false)
    }
  }
  const [btnLoading, setBtnLoading] = React.useState(false)

  const hubOptions = makeSelectOptions(hubData?.fellowships[0].councilHubs)

  return (
    <ApolloWrapper
      data={data && hubData}
      loading={loading && hubLoading}
      error={error && hubError}
    >
      <Container>
        <HeadingPrimary>Change Hub Fellowship Status</HeadingPrimary>
        <HeadingSecondary>{`${fellowship?.name} ${fellowship?.__typename}`}</HeadingSecondary>

        {fellowship?.hubStatus && (
          <Container>
            <div>Remove Hub Fellowship Status</div>
            <Button
              className="my-4"
              disabled={btnLoading}
              onClick={handleRemoveHubFellowship}
            >
              {btnLoading ? (
                <Spinner size="sm" />
              ) : (
                `Remove Hub Fellowship Status`
              )}
            </Button>
          </Container>
        )}
        {!fellowship?.hubStatus && (
          <Formik
            initialValues={initialValues}
            onSubmit={handleMakeHubFellowship}
          >
            {(formik) => (
              <Form>
                <Select name="hub" label="Hub" options={hubOptions} />
                <SubmitButton formik={formik} />
              </Form>
            )}
          </Formik>
        )}
      </Container>
    </ApolloWrapper>
  )
}

export default MakeHubFellowship
