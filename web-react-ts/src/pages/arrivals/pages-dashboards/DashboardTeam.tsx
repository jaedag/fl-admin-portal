import { useMutation, useQuery } from '@apollo/client'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import MenuButton from 'components/buttons/MenuButton'
import SubmitButton from 'components/formik/SubmitButton'
import Popup from 'components/Popup/Popup'
import { Form, Formik, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import React from 'react'
import { useContext } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { TEAM_ARRIVALS_DASHBOARD } from '../arrivalsQueries'
import { useNavigate } from 'react-router'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import RoleView from 'auth/RoleView'
import { SHORT_POLL_INTERVAL, throwToSentry } from 'global-utils'
import { MAKE_TEAMARRIVALS_ADMIN } from '../arrivalsMutation'
import { permitAdmin, permitArrivals } from 'permission-utils'
import usePopup from 'hooks/usePopup'
import SearchMember from 'components/formik/SearchMember'
import { beforeStreamArrivalsDeadline } from '../arrivals-utils'
import ErrorText from 'components/ErrorText'
import PullToRefresh from 'react-simple-pull-to-refresh'
import ArrivalsMenuDropdown from '../ArrivalsMenuDropdown'
import Input from 'components/formik/Input'
import { ChurchContext } from 'contexts/ChurchContext'
import ArrivalsDateSubmitBtn from '../components/ArrivalsDateSubmitBtn'
import MemberAvatarWithName from 'components/LeaderAvatar/MemberAvatarWithName'

export type AdminFormOptions = {
  adminName: string
  adminSelect: string
}

type DateFormOptions = {
  arrivalDate: string
}

const TeamDashboard = () => {
  const { isOpen, togglePopup } = usePopup()
  const navigate = useNavigate()
  const { arrivalDate, setArrivalDate, teamId } = useContext(ChurchContext)
  const today = new Date().toISOString().slice(0, 10)
  const { data, loading, error, refetch } = useQuery(TEAM_ARRIVALS_DASHBOARD, {
    variables: {
      id: teamId,
      date: today,
      arrivalDate: arrivalDate || today,
    },
    pollInterval: SHORT_POLL_INTERVAL,
    fetchPolicy: 'cache-and-network',
  })

  const [MakeTeamArrivalsAdmin] = useMutation(MAKE_TEAMARRIVALS_ADMIN)
  const team = data?.teams[0]

  const initialValues: AdminFormOptions = {
    adminName: team?.arrivalsAdmin ? `${team?.arrivalsAdmin?.fullName}` : '',
    adminSelect: team?.arrivalsAdmin?.id ?? '',
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

    MakeTeamArrivalsAdmin({
      variables: {
        teamId,
        newAdminId: values.adminSelect,
        oldAdminId: initialValues.adminSelect || 'no-old-admin',
      },
    })
      .then(() => {
        togglePopup()
        onSubmitProps.setSubmitting(false)
        alert('Team Arrivals Admin has been changed successfully')
      })
      .catch((e) => throwToSentry(e))
  }

  const ArrivalsMenu = [
    { title: 'Change Arrivals Admin', onClick: togglePopup },
  ]

  const dateValidationSchema = Yup.object({
    date: Yup.date().notRequired(),
  })

  const dateInitialValues: DateFormOptions = {
    arrivalDate: arrivalDate,
  }

  const onDateSubmit = (
    values: DateFormOptions,
    onSubmitProps: FormikHelpers<DateFormOptions>
  ) => {
    onSubmitProps.setSubmitting(true)

    setArrivalDate(values.arrivalDate)
    onSubmitProps.setSubmitting(false)
  }

  return (
    <PullToRefresh onRefresh={refetch}>
      <ApolloWrapper data={data} loading={loading} error={error}>
        <Container>
          <HeadingPrimary loading={loading}>
            {team?.name} Team Arrivals Real Time Dashboard
          </HeadingPrimary>
          {team?.arrivalsAdmin && (
            <>
              <hr className="m-2" />
              <div className="ps-4">
                <div className="text-warning">Arrivals Admin</div>
                <MemberAvatarWithName member={team?.arrivalsAdmin} />
              </div>
              <hr className="m-2" />
            </>
          )}
          {isOpen && (
            <Popup handleClose={togglePopup}>
              <b>Change Arrivals Admin</b>
              <p>Please enter the name of the new administrator</p>

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

          <div className="d-grid gap-2">
            <Formik
              initialValues={dateInitialValues}
              validationSchema={dateValidationSchema}
              onSubmit={onDateSubmit}
              validateOnMount
            >
              {(formik) => (
                <Form>
                  <Row className="align-items-center gx-0 justify-content-between">
                    <Col className="d-inline-block" xs={5}>
                      <Input
                        name="arrivalDate"
                        type="date"
                        placeholder="dd/mm/yyyy"
                        aria-describedby="date"
                      />
                    </Col>
                    <Col xs={2}>
                      <ArrivalsDateSubmitBtn formik={formik} />
                    </Col>
                    <Col>
                      <RoleView
                        roles={[
                          ...permitAdmin('Team'),
                          ...permitArrivals('Council'),
                        ]}
                      >
                        <ArrivalsMenuDropdown menuItems={ArrivalsMenu} />
                      </RoleView>
                    </Col>
                  </Row>
                </Form>
              )}
            </Formik>

            {!beforeStreamArrivalsDeadline(team?.council.stream) && (
              <ErrorText>Arrival Deadline is up! Thank you very much</ErrorText>
            )}
            <ApolloWrapper loading={loading} data={data} error={error}>
              <>
                <MenuButton
                  title="Bacentas With No Activity"
                  onClick={() => navigate('/arrivals/bacentas-no-activity')}
                  number={team?.bacentasNoActivityCount.toString()}
                  color="red"
                  iconBg
                  noCaption
                />
                <MenuButton
                  title="Bacentas Mobilising"
                  onClick={() => navigate('/arrivals/bacentas-mobilising')}
                  number={team?.bacentasMobilisingCount.toString()}
                  color="orange"
                  iconBg
                  noCaption
                />
                <MenuButton
                  title="Bacentas On The Way"
                  onClick={() => navigate('/arrivals/bacentas-on-the-way')}
                  number={team?.bacentasOnTheWayCount.toString()}
                  color="yellow"
                  iconBg
                  noCaption
                />
                <MenuButton
                  title={`Bacentas That Didn't Bus`}
                  onClick={() => navigate('/arrivals/bacentas-below-8')}
                  number={team?.bacentasBelow8Count.toString()}
                  iconBg
                  color="red"
                  noCaption
                />
                <MenuButton
                  title="Bacentas That Have Arrived"
                  onClick={() => navigate('/arrivals/bacentas-have-arrived')}
                  number={team?.bacentasHaveArrivedCount.toString()}
                  color="green"
                  iconBg
                  noCaption
                />
                <div className="mt-5 d-grid gap-2">
                  <MenuButton
                    title="Members On The Way"
                    number={team?.bussingMembersOnTheWayCount.toString()}
                    color="yellow"
                    iconBg
                    noCaption
                  />
                  <MenuButton
                    title="Members That Have Arrived"
                    number={team?.bussingMembersHaveArrivedCount.toString()}
                    color="green"
                    iconBg
                    noCaption
                  />
                  <MenuButton
                    title="Busses That Have Arrived"
                    number={team?.bussesThatArrivedCount.toString()}
                    color="green"
                    iconBg
                    noCaption
                  />
                </div>
              </>
            </ApolloWrapper>
          </div>
        </Container>
      </ApolloWrapper>
    </PullToRefresh>
  )
}

export default TeamDashboard
