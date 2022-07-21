import { useMutation, useQuery } from '@apollo/client'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import React, { useContext } from 'react'
import * as Yup from 'yup'
import { useNavigate } from 'react-router'
import { MAKE_STREAMARRIVALS_ADMIN } from './arrivalsMutation'
import { STREAM_ARRIVALS_DASHBOARD } from './arrivalsQueries'
import { throwErrorMsg } from 'global-utils'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { Col, Container, Row } from 'react-bootstrap'
import Popup from 'components/Popup/Popup'
import { Form, Formik, FormikHelpers } from 'formik'
import FormikControl from 'components/formik-components/FormikControl'
import SubmitButton from 'components/formik-components/SubmitButton'
import RoleView from 'auth/RoleView'
import {
  permitAdmin,
  permitArrivals,
  permitArrivalsConfirmer,
  permitArrivalsCounter,
} from 'permission-utils'
import MenuButton from 'components/buttons/MenuButton'
import DefaulterInfoCard from 'pages/services/defaulters/DefaulterInfoCard'
import { MemberContext } from 'contexts/MemberContext'
import { CheckAll } from 'react-bootstrap-icons'
import usePopup from 'hooks/usePopup'
import HeadingSecondary from 'components/HeadingSecondary'
import { AdminFormOptions } from './DashboardConstituency'
import ArrivalsMenuDropdown from './ArrivalsMenuDropdown'

const StreamDashboard = () => {
  const { isOpen, togglePopup } = usePopup()
  const { currentUser } = useContext(MemberContext)
  const navigate = useNavigate()
  const { data, loading, error } = useQuery(STREAM_ARRIVALS_DASHBOARD, {
    variables: { id: currentUser?.currentChurch.id },
  })
  const [MakeStreamArrivalsAdmin] = useMutation(MAKE_STREAMARRIVALS_ADMIN)
  const stream = data?.streams[0]

  const initialValues: AdminFormOptions = {
    adminName: stream?.arrivalsAdmin
      ? `${stream?.arrivalsAdmin?.firstName} ${stream?.arrivalsAdmin?.lastName}`
      : '',
    adminSelect: stream?.arrivalsAdmin?.id ?? '',
  }
  const validationSchema = Yup.object({
    adminSelect: Yup.string().required(
      'Please select an Admin from the dropdown'
    ),
  })

  const onSubmit = (
    values: AdminFormOptions,
    onSubmitProps: FormikHelpers<AdminFormOptions>
  ) => {
    onSubmitProps.setSubmitting(true)

    MakeStreamArrivalsAdmin({
      variables: {
        streamId: currentUser?.currentChurch.id,
        newAdminId: values.adminSelect,
        oldAdminId: initialValues.adminSelect || 'no-old-admin',
      },
    })
      .then(() => {
        togglePopup()
        onSubmitProps.setSubmitting(false)
        alert('stream Arrivals Admin has been changed successfully')
      })
      .catch((e) => throwErrorMsg(e))
  }

  const aggregates = {
    title: 'Councils',
    data: stream?.councilCount,
    link: `/arrivals/stream-by-council`,
  }

  const ArrivalsMenu = [
    { title: 'Change Arrivals Admin', onClick: togglePopup },
    {
      title: 'Arrivals Helpers',
      onClick: () => navigate('/stream/arrivals-helpers'),
    },
    {
      title: 'Arrival Times',
      onClick: () => navigate('/stream/arrival-times'),
    },
  ]
  return (
    <ApolloWrapper data={data} loading={loading} error={error}>
      <Container>
        <HeadingPrimary loading={loading}>
          {stream?.name} Stream Arrivals Summary
        </HeadingPrimary>
        <HeadingSecondary loading={loading}>
          Arrivals Admin: {stream?.arrivalsAdmin?.fullName}
        </HeadingSecondary>
        {isOpen && (
          <Popup handleClose={togglePopup}>
            <b>Change Arrivals Admin</b>
            <p>Please enter the name of the new arrivals rep</p>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {(formik) => (
                <Form>
                  <Row className="form-row">
                    <Col>
                      <FormikControl
                        control="memberSearch"
                        name="adminSelect"
                        initialValue={initialValues?.adminName}
                        placeholder="Select an Admin"
                        setFieldValue={formik.setFieldValue}
                        aria-describedby="Member Search"
                        error={formik.errors.adminSelect}
                      />
                    </Col>
                  </Row>

                  <SubmitButton formik={formik} />
                </Form>
              )}
            </Formik>
          </Popup>
        )}

        <RoleView
          roles={[...permitAdmin('Stream'), ...permitArrivals('Stream')]}
        >
          <ArrivalsMenuDropdown menuItems={ArrivalsMenu} />
        </RoleView>

        <div className="d-grid gap-2 mt-3">
          <DefaulterInfoCard defaulter={aggregates} />
          <MenuButton
            title="Bacentas With No Activity"
            onClick={() => navigate('/arrivals/bacentas-no-activity')}
            number={stream?.bacentasNoActivityCount.toString()}
            color="red"
            iconBg
            noCaption
          />
          <MenuButton
            title="Bacentas Mobilising"
            onClick={() => navigate('/arrivals/bacentas-mobilising')}
            number={stream?.bacentasMobilisingCount.toString()}
            color="orange"
            iconBg
            noCaption
          />
          <MenuButton
            title="Bacentas On The Way"
            onClick={() => navigate('/arrivals/bacentas-on-the-way')}
            number={stream?.bacentasOnTheWayCount.toString()}
            color="yellow"
            iconBg
            noCaption
          />
          <RoleView roles={permitArrivalsCounter()}>
            <MenuButton
              title="Bacentas To Be Counted"
              onClick={() => navigate('/arrivals/bacentas-to-count')}
              number={stream?.bacentasNotCountedCount.toString()}
              color="yellow"
              iconBg
              noCaption
            />
          </RoleView>
          <RoleView roles={permitArrivalsConfirmer()}>
            <MenuButton
              title="Confirm Bacenta Arrival"
              color="yellow"
              onClick={() => navigate('/arrivals/confirm-bacenta-arrival')}
              iconComponent={CheckAll}
              iconBg
              noCaption
            />
          </RoleView>

          <MenuButton
            title="Bacentas Below 8"
            onClick={() => navigate('/arrivals/bacentas-below-8')}
            number={stream?.bacentasBelow8Count.toString()}
            iconBg
            color="red"
            noCaption
          />

          <MenuButton
            title="Bacentas That Have Arrived"
            onClick={() => navigate('/arrivals/bacentas-have-arrived')}
            number={stream?.bacentasHaveArrivedCount.toString()}
            iconBg
            color="green"
            noCaption
          />

          <div className="mt-5 d-grid gap-2">
            <MenuButton
              title="Members On The Way"
              number={stream?.bussingMembersOnTheWayCount.toString()}
              color="yellow"
              iconBg
              noCaption
            />
            <MenuButton
              title="Members That Have Arrived"
              number={stream?.bussingMembersHaveArrivedCount.toString()}
              color="green"
              iconBg
              noCaption
            />
          </div>
        </div>
      </Container>
    </ApolloWrapper>
  )
}

export default StreamDashboard
