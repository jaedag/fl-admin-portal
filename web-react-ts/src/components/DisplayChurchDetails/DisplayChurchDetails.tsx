import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import DetailsCard from '../card/DetailsCard'
import { MemberContext } from '../../contexts/MemberContext'
import { ChurchContext } from '../../contexts/ChurchContext'
import Timeline, { TimelineElement } from '../Timeline/Timeline'
import EditButton from '../buttons/EditButton'
import ChurchButton from '../buttons/ChurchButton/ChurchButton'
import './DisplayChurchDetails.css'
import RoleView from '../../auth/RoleView'
import { Form, Formik, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import { useMutation } from '@apollo/client'
import {
  MAKE_CAMPUS_ADMIN,
  MAKE_CONSTITUENCY_ADMIN,
  MAKE_COUNCIL_ADMIN,
  MAKE_OVERSIGHT_ADMIN,
  MAKE_STREAM_ADMIN,
} from './AdminMutations'
import {
  alertMsg,
  directoryLock,
  plural,
  throwToSentry,
} from '../../global-utils'
import { getWeekNumber } from 'jd-date-utils'
import Breadcrumb from './Breadcrumb'
import { Button, Col, Container, Modal, Row } from 'react-bootstrap'
import PlaceholderCustom from 'components/Placeholder'
import { Geo, PencilSquare } from 'react-bootstrap-icons'
import ViewAll from 'components/buttons/ViewAll'
import { permitAdmin } from 'permission-utils'
import useSetUserChurch from 'hooks/useSetUserChurch'
import { Church, ChurchLevel, MemberWithoutBioData, Role } from 'global-types'
import { BacentaWithArrivals } from 'pages/arrivals/arrivals-types'
import SearchMember from 'components/formik/SearchMember'
import useModal from 'hooks/useModal'
import SubmitButton from 'components/formik/SubmitButton'
import { DetailsArray } from 'pages/directory/display/DetailsFellowship'
import LeaderAvatar from 'components/LeaderAvatar/LeaderAvatar'

type DisplayChurchDetailsProps = {
  details: DetailsArray
  loading: boolean
  church?: BacentaWithArrivals
  name: string
  leaderTitle: string
  leader: MemberWithoutBioData
  admin?: MemberWithoutBioData
  churchId: string
  churchType: ChurchLevel
  subChurch?: ChurchLevel
  editlink: string
  editPermitted: Role[]
  history: TimelineElement[]
  breadcrumb: Church[]
  buttons: Church[]
  vacation?: 'Active' | 'Vacation'
  vacationCount?: number

  buttonsSecondRow?: Church[]
  subChurchBasonta?: string
  basontaLeaders?: MemberWithoutBioData[]
  momoNumber?: string
  //Fellowships
  location?: {
    longitude: number
    latitude: number
  }
  last3Weeks?: {
    number: number
    filled: boolean
    banked: boolean | 'No Service'
  }[]
}

type FormOptions = {
  adminName: string
  adminSelect: string
}

const DisplayChurchDetails = (props: DisplayChurchDetailsProps) => {
  const { setUserChurch } = useSetUserChurch()
  const navigate = useNavigate()
  let needsAdmin

  let roles: Role[] = []

  switch (props.churchType) {
    case 'Constituency':
      needsAdmin = true
      roles = permitAdmin('Council')
      break
    case 'Council':
      needsAdmin = true
      roles = permitAdmin('Stream')
      break
    case 'Stream':
      needsAdmin = true
      roles = permitAdmin('Campus')
      break
    case 'Campus':
      needsAdmin = true
      roles = permitAdmin('Oversight')
      break
    case 'Oversight':
      needsAdmin = true
      roles = permitAdmin('Denomination')
      break
    case 'Denomination':
      needsAdmin = true
      roles = []
      break
    default:
      needsAdmin = false
      break
  }

  const { currentUser } = useContext(MemberContext)
  const { show, handleShow, handleClose } = useModal()
  const { constituencyId, councilId, streamId, campusId } =
    useContext(ChurchContext)

  const htmlElement = document.querySelector('html')
  const currentTheme = htmlElement?.getAttribute('data-bs-theme') || 'dark'

  //Change Admin Initialised
  const [MakeConstituencyAdmin] = useMutation(MAKE_CONSTITUENCY_ADMIN)
  const [MakeCouncilAdmin] = useMutation(MAKE_COUNCIL_ADMIN)
  const [MakeStreamAdmin] = useMutation(MAKE_STREAM_ADMIN)
  const [MakeCampusAdmin] = useMutation(MAKE_CAMPUS_ADMIN)
  const [MakeOversightAdmin] = useMutation(MAKE_OVERSIGHT_ADMIN)

  const initialValues: FormOptions = {
    adminName: props.admin
      ? `${props.admin?.firstName} ${props.admin?.lastName}`
      : '',
    adminSelect: props.admin?.id ?? '',
  }
  const validationSchema = Yup.object({
    adminSelect: Yup.string().required(
      'Please select an Admin from the dropdown'
    ),
  })

  const onSubmit = async (
    values: FormOptions,
    onSubmitProps: FormikHelpers<FormOptions>
  ) => {
    if (initialValues.adminSelect === values.adminSelect) {
      return
    }

    try {
      if (props.churchType === 'Oversight') {
        await MakeOversightAdmin({
          variables: {
            oversightId: props.churchId,
            newAdminId: values.adminSelect,
            oldAdminId: initialValues.adminSelect || 'no-old-admin',
          },
        })
        alertMsg('Oversight Admin has been changed successfully')
      }

      if (props.churchType === 'Campus') {
        await MakeCampusAdmin({
          variables: {
            campusId: campusId,
            newAdminId: values.adminSelect,
            oldAdminId: initialValues.adminSelect || 'no-old-admin',
          },
        })

        alertMsg('Campus Admin has been changed successfully')
      }

      if (props.churchType === 'Stream') {
        await MakeStreamAdmin({
          variables: {
            streamId: streamId,
            newAdminId: values.adminSelect,
            oldAdminId: initialValues.adminSelect || 'no-old-admin',
          },
        })

        alertMsg('Stream Admin has been changed successfully')
      }

      if (props.churchType === 'Council') {
        await MakeCouncilAdmin({
          variables: {
            councilId: councilId,
            newAdminId: values.adminSelect,
            oldAdminId: initialValues.adminSelect || 'no-old-admin',
          },
        })

        alertMsg('Council Admin has been changed successfully')
      }

      if (props.churchType === 'Constituency') {
        await MakeConstituencyAdmin({
          variables: {
            constituencyId: constituencyId,
            newAdminId: values.adminSelect,
            oldAdminId: initialValues.adminSelect || 'no-old-admin',
          },
        })
        alertMsg('Constituency Admin has been changed successfully')
      }
    } catch (e) {
      throwToSentry('', e)
    } finally {
      handleClose()
    }

    onSubmitProps.resetForm()
  }
  //End of Admin Change

  const shouldFill = () => {
    let shouldFill = true

    // If the have filled their form this week, they shouldn't fill again
    const filledThisWeek = props.last3Weeks?.filter(
      (week) => week.number === getWeekNumber()
    )
    if (filledThisWeek?.length && filledThisWeek[0].filled === true) {
      shouldFill = false
    }

    //If the church is on vacation, they shouldn't fill
    if (props.vacation === 'Vacation') {
      shouldFill = false
    }

    return shouldFill
  }

  return (
    <>
      <div className="py-2 top-heading title-bar">
        <Breadcrumb breadcrumb={props.breadcrumb} />
        <hr />
        <Container>
          <PlaceholderCustom as="h3" loading={!props.name} xs={12}>
            <h3 className="mt-3 font-weight-bold">
              {`${props.name} ${props.churchType}`}

              {directoryLock(currentUser, props.churchType) && (
                <RoleView roles={props.editPermitted} directoryLock>
                  <EditButton link={props.editlink} />
                </RoleView>
              )}
            </h3>
          </PlaceholderCustom>

          {needsAdmin && (
            <RoleView roles={roles}>
              <span>
                {!!props.admin && (
                  <span>
                    {props.admin?.firstName + '  ' + props.admin?.lastName}
                  </span>
                )}
              </span>
              <Button className="p-1 small ms-2" onClick={handleShow}>
                <PencilSquare /> Change Admin
              </Button>
            </RoleView>
          )}
        </Container>
        <Modal show={show} onHide={handleClose} centered>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(formik) => (
              <Form>
                <Modal.Header closeButton>
                  Change {`${props.churchType}`} Admin
                </Modal.Header>
                <Modal.Body>
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
                </Modal.Body>
                <Modal.Footer>
                  <SubmitButton formik={formik} />
                  <Button variant="primary" onClick={handleClose}>
                    Close
                  </Button>
                </Modal.Footer>
              </Form>
            )}
          </Formik>
        </Modal>
      </div>
      <Container>
        <LeaderAvatar leader={props.leader} leaderTitle={props.leaderTitle} />
        {props.details?.length && (
          <Row>
            {props.details.map((detail, i) => (
              <Col key={i} xs={detail.width ?? 6}>
                <DetailsCard
                  onClick={() => navigate(detail.link)}
                  heading={detail.title}
                  creativearts={detail?.creativearts}
                  detail={
                    !props.loading ? detail?.number?.toString() || '0' : ''
                  }
                  vacationCount={
                    !props.loading
                      ? detail?.vacationCount?.toString() || '0'
                      : ''
                  }
                  vacationIcBacentaCount={
                    !props.loading
                      ? detail?.vacationIcBacentaCount?.toString() || '0'
                      : ''
                  }
                />
              </Col>
            ))}
          </Row>
        )}
        {props.churchType === 'Bacenta' &&
        (props.church?.sprinterTopUp !== 0 ||
          props.church?.urvanTopUp !== 0) ? (
          <RoleView
            roles={['leaderBacenta']}
            permittedStream={[
              'Gospel Encounter',
              'First Love Experience',
              'Holy Ghost Encounter',
            ]}
            verifyId={props?.leader?.id}
          >
            {!props.momoNumber && !props.loading && (
              <p className="my-1 bad fw-bold text-center">
                There is no valid Mobile Money Number! Please update!
              </p>
            )}

            <div className="d-grid gap-2">
              <PlaceholderCustom
                loading={props.loading}
                className={`btn-graphs ${currentTheme}`}
                button="true"
              >
                <Button
                  className={`${currentTheme}`}
                  onClick={() => {
                    navigate(`/${props.churchType.toLowerCase()}/editbussing`)
                  }}
                >
                  Bus Payment Details
                </Button>
              </PlaceholderCustom>
            </div>
          </RoleView>
        ) : null}
        <hr />
        <div className="d-grid gap-2">
          <PlaceholderCustom
            loading={props.loading}
            className="btn-graphs"
            variant="brand"
            button="button"
          >
            <Button
              variant="brand"
              size="lg"
              onClick={() => {
                setUserChurch({
                  id: props.churchId,
                  name: props.name,
                  __typename: props.churchType,
                })
                navigate(`/trends`)
              }}
            >
              View Trends
            </Button>
          </PlaceholderCustom>

          {shouldFill() && (
            <PlaceholderCustom
              loading={props.loading}
              className="btn-graphs"
              size="lg"
              button="button"
            >
              <Button
                variant="brand"
                size="lg"
                onClick={() => {
                  setUserChurch({
                    id: props.churchId,
                    name: props.name,
                    __typename: props.churchType,
                  })

                  navigate(`/services/${props.churchType.toLowerCase()}`)
                }}
              >
                Service Forms
              </Button>
            </PlaceholderCustom>
          )}
        </div>
        {props?.location && props.location?.latitude !== 0 && (
          <Container className="mt-4 text-center">
            <h3>LOCATION</h3>
            <p>Click here for directions</p>
            <a
              className="btn p-3"
              href={`https://www.google.com/maps/search/?api=1&query=${props?.location?.latitude}%2C${props?.location?.longitude}`}
            >
              <Geo size="75" />
            </a>
          </Container>
        )}

        {props.last3Weeks && props.details[2].number === 'Active' && (
          <>
            <h3 className="mt-4">FORMS</h3>
            {props.last3Weeks.map((week, i) => (
              <Container key={i} className="mt-4">
                <div className="text-secondary">{`WEEK ${week.number}`}</div>
                <p className="mb-0">
                  Income Form -{' '}
                  <span
                    className={`${week.filled ? 'filled' : 'not-filled'}`}
                  >{`${week.filled ? 'Filled' : 'Not Filled'}`}</span>
                </p>
                {week.filled && week.banked !== 'No Service' && (
                  <p>
                    Banking Slip -{' '}
                    <span
                      className={`${week.banked ? 'filled' : 'not-filled'}`}
                    >{`${week.banked ? 'Submitted' : 'Not Submitted'}`}</span>
                  </p>
                )}
              </Container>
            ))}
          </>
        )}
      </Container>

      {props.subChurch && props.buttons?.length ? (
        <>
          <Container>
            <hr className="hr-line" />

            <div className="row justify-content-between">
              <div className="col">
                <p className="text-secondary">{`${props.subChurch} Locations`}</p>
              </div>
              <div className="col-auto">
                <Link
                  className="card text-secondary px-1"
                  to={`/${props.subChurch.toLowerCase()}/displayall`}
                >
                  {`View All ${plural(props.subChurch)}`}
                </Link>
              </div>
            </div>
          </Container>

          <div className="container mb-4 card-button-row">
            <table>
              <tbody>
                <tr>
                  {props.buttons.map((church, index) => {
                    if (index > 4) {
                      return null
                    }
                    return (
                      <td className="col-auto" key={index}>
                        <ChurchButton church={church} />{' '}
                      </td>
                    )
                  })}
                </tr>
              </tbody>
            </table>
          </div>
        </>
      ) : null}
      {props.subChurch && !props.buttons?.length ? (
        <Container className="d-grid gap-2 mt-2">
          <RoleView roles={props.editPermitted}>
            <PlaceholderCustom
              loading={props.loading}
              className="btn-graphs"
              variant={currentTheme as 'dark' | 'light'}
              button="button"
            >
              <Button
                className="btn-graphs"
                variant={currentTheme as 'dark' | 'light'}
                onClick={() =>
                  navigate(
                    `/${props.subChurch?.toLowerCase()}/add${props.subChurch?.toLowerCase()}`
                  )
                }
              >
                {`Add New ${props.subChurch}`}
              </Button>
            </PlaceholderCustom>
          </RoleView>
        </Container>
      ) : null}

      {props.history?.length && (
        <Container className="mt-5">
          <Row>
            <Col>
              <h3>CHURCH HISTORY</h3>
            </Col>
            <Col className="col-auto">
              <ViewAll to={`/${props.churchType.toLowerCase()}/history`} />
            </Col>
          </Row>

          <Timeline record={props.history} modifier="church" limit={5} />
        </Container>
      )}
    </>
  )
}

export default DisplayChurchDetails
