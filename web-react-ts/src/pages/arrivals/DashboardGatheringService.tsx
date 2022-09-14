import { useMutation, useQuery } from '@apollo/client'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import React, { useContext } from 'react'
import * as Yup from 'yup'
import { useNavigate } from 'react-router'
import {
  MAKE_GATHERINGSERVICEARRIVALS_ADMIN,
  SET_SWELL_DATE,
  SET_CODE_OF_THE_DAY,
} from './arrivalsMutation'
import { GATHERINGSERVICE_ARRIVALS_DASHBOARD } from './arrivalsQueries'
import { alertMsg, throwErrorMsg } from 'global-utils'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { Col, Container, Row, Button } from 'react-bootstrap'
import Popup from 'components/Popup/Popup'
import { Form, Formik, FormikHelpers } from 'formik'
import SubmitButton from 'components/formik/SubmitButton'
import RoleView from 'auth/RoleView'
import { permitAdmin } from 'permission-utils'
import MenuButton from 'components/buttons/MenuButton'
import HeadingSecondary from 'components/HeadingSecondary'
import { getHumanReadableDate } from 'jd-date-utils'
import DefaulterInfoCard from 'pages/services/defaulters/DefaulterInfoCard'
import { MemberContext } from 'contexts/MemberContext'
import usePopup from 'hooks/usePopup'
import { AdminFormOptions } from './DashboardConstituency'
import SearchMember from 'components/formik/SearchMember'
import PullToRefresh from 'react-simple-pull-to-refresh'

const GatheringServiceDashboard = () => {
  const { isOpen, togglePopup } = usePopup()
  const { currentUser } = useContext(MemberContext)
  const navigate = useNavigate()
  const today = new Date().toISOString().slice(0, 10)
  const { data, loading, error, refetch } = useQuery(
    GATHERINGSERVICE_ARRIVALS_DASHBOARD,
    {
      variables: { id: currentUser?.currentChurch.id, date: today },
    }
  )

  const [SetSwellDate] = useMutation(SET_SWELL_DATE)
  const [SetCodeOfTheDay] = useMutation(SET_CODE_OF_THE_DAY)
  const [MakeGatheringServiceArrivalsAdmin] = useMutation(
    MAKE_GATHERINGSERVICEARRIVALS_ADMIN
  )
  const gatheringService = data?.gatheringServices[0]

  const initialValues: AdminFormOptions = {
    adminName: gatheringService?.arrivalsAdmin
      ? `${gatheringService?.arrivalsAdmin?.firstName} ${gatheringService?.arrivalsAdmin?.lastName}`
      : '',
    adminSelect: gatheringService?.arrivalsAdmin?.id ?? '',
  }
  const validationSchema = Yup.object({
    adminSelect: Yup.string().required(
      'Please select an Admin from the dropdown'
    ),
  })

  const submitCodeOfTheDay = async () => {
    const promptBox = window.prompt('Enter the Code of The Day')

    await SetCodeOfTheDay({ variables: { code: promptBox } })
      .then((res) => {
        alertMsg(
          `Code of the day has been set to "${res?.data?.SetCodeOfTheDay}"`
        )
      })
      .catch((error) => {
        alertMsg(error)
      })
  }

  const onSubmit = (
    values: AdminFormOptions,
    onSubmitProps: FormikHelpers<AdminFormOptions>
  ) => {
    onSubmitProps.setSubmitting(true)

    MakeGatheringServiceArrivalsAdmin({
      variables: {
        gatheringServiceId: currentUser?.currentChurch.id,
        newAdminId: values.adminSelect,
        oldAdminId: initialValues.adminSelect || 'no-old-admin',
      },
    })
      .then(() => {
        togglePopup()
        onSubmitProps.setSubmitting(false)
        alert('Gathering Service Arrivals Admin has been changed successfully')
      })
      .catch((e) => throwErrorMsg(e))
  }

  const aggregates = {
    title: 'Streams',
    data: gatheringService?.streamCount,
    link: `/arrivals/gatheringservice-by-stream`,
  }

  return (
    <PullToRefresh onRefresh={refetch}>
      <ApolloWrapper data={data} loading={loading} error={error}>
        <Container>
          <HeadingPrimary loading={loading}>
            {gatheringService?.name} Gathering Service Arrivals Summary
          </HeadingPrimary>
          <HeadingSecondary loading={loading}>
            Arrivals Admin: {gatheringService?.arrivalsAdmin?.fullName}
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
                        <SearchMember
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

          {data?.timeGraphs.length ? (
            <>
              <h4>{getHumanReadableDate(data?.timeGraphs[0]?.date, true)}</h4>
              <h5>{data?.timeGraphs[0].swell && `Swell Weekend!`}</h5>
            </>
          ) : null}

          <div className="d-grid gap-2">
            <RoleView roles={permitAdmin('GatheringService')}>
              <Button
                variant="outline-secondary"
                size="lg"
                onClick={() => togglePopup()}
              >
                Change Arrivals Admin
              </Button>

              {(!data?.timeGraphs.length || !data?.timeGraphs[0]?.swell) && (
                <Button
                  onClick={() => {
                    const confirmBox = window.confirm(
                      'Do you want to set today as a swell day?'
                    )

                    if (confirmBox === true) {
                      SetSwellDate({
                        variables: { date: today },
                      }).then(() => alertMsg('Swell Date Set Succesffully'))
                    }
                  }}
                >
                  Set Today as Swell
                </Button>
              )}

              <Button onClick={() => submitCodeOfTheDay()}>
                Code of the Day
              </Button>
            </RoleView>
            <DefaulterInfoCard defaulter={aggregates} />

            <MenuButton
              title="Bacentas With No Activity"
              onClick={() => navigate('/arrivals/bacentas-no-activity')}
              number={gatheringService?.bacentasNoActivityCount.toString()}
              color="red"
              iconBg
              noCaption
            />
            <MenuButton
              title="Bacentas Mobilising"
              onClick={() => navigate('/arrivals/bacentas-mobilising')}
              number={gatheringService?.bacentasMobilisingCount.toString()}
              color="orange"
              iconBg
              noCaption
            />
            <MenuButton
              title="Bacentas On The Way"
              onClick={() => navigate('/arrivals/bacentas-on-the-way')}
              number={gatheringService?.bacentasOnTheWayCount.toString()}
              color="yellow"
              iconBg
              noCaption
            />

            <MenuButton
              title="Bacentas Below 8"
              onClick={() => navigate('/arrivals/bacentas-below-8')}
              number={gatheringService?.bacentasBelow8Count.toString()}
              iconBg
              color="red"
              noCaption
            />

            <MenuButton
              title="Bacentas That Have Arrived"
              onClick={() => navigate('/arrivals/bacentas-have-arrived')}
              number={gatheringService?.bacentasHaveArrivedCount.toString()}
              color="green"
              iconBg
              noCaption
            />

            <div className="mt-5 d-grid gap-2">
              <MenuButton
                title="Members On The Way"
                number={gatheringService?.bussingMembersOnTheWayCount.toString()}
                color="yellow"
                iconBg
                noCaption
              />
              <MenuButton
                title="Members That Have Arrived"
                number={gatheringService?.bussingMembersHaveArrivedCount.toString()}
                color="green"
                iconBg
                noCaption
              />
            </div>
          </div>
        </Container>
      </ApolloWrapper>
    </PullToRefresh>
  )
}

export default GatheringServiceDashboard
