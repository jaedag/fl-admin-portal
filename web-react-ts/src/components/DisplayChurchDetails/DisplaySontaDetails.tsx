import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import DetailsCard from '../card/DetailsCard'
import { ChurchContext } from '../../contexts/ChurchContext'
import Timeline, { TimelineElement } from '../Timeline/Timeline'
import EditButton from '../buttons/EditButton'
import ChurchButton from '../buttons/ChurchButton/ChurchButton'
import './DisplayChurchDetails.css'
import RoleView from '../../auth/RoleView'
import Breadcrumb from './Breadcrumb'
import { Button, Col, Container, Row } from 'react-bootstrap'
import PlaceholderCustom from 'components/Placeholder'
import { BsFillBarChartFill } from 'react-icons/bs'
import { CgFileDocument } from 'react-icons/cg'
import ViewAll from 'components/buttons/ViewAll'
import useSetUserChurch from 'hooks/useSetUserChurch'
import { Church, ChurchLevel, MemberWithoutBioData, Role } from 'global-types'
import { BacentaWithArrivals } from 'pages/arrivals/arrivals-types'
import { plural } from 'global-utils'

type DisplayChurchDetailsProps = {
  details: {
    title: string
    number: number | string
    link: string
    width?: number
  }[]
  loading: boolean
  church?: BacentaWithArrivals
  name: string
  leaderTitle: string
  leader: MemberWithoutBioData
  admin?: MemberWithoutBioData
  churchId: string
  churchType: ChurchLevel
  subLevel?: ChurchLevel
  editlink: string
  editPermitted: Role[]
  history: TimelineElement[]
  breadcrumb: Church[]
  buttons: { id: string; name: string; __typename: string }[]
  vacation?: 'Active' | 'Vacation'
  last3Weeks?: {
    number: number
    filled: boolean
    banked: boolean | 'No Service'
  }[]
}

const DisplaySontaDetails = (props: DisplayChurchDetailsProps) => {
  const { setUserChurch } = useSetUserChurch()
  const navigate = useNavigate()

  const { clickCard } = useContext(ChurchContext)

  return (
    <>
      <div className="py-2 top-heading title-bar">
        <Container>
          <Breadcrumb breadcrumb={props.breadcrumb} />
          <hr />
          <PlaceholderCustom as="h3" loading={!props.name} xs={12}>
            <h3 className="mx-3 mt-3 font-weight-bold">
              {`${props.name} ${props.churchType}`}

              <RoleView roles={props.editPermitted}>
                <EditButton link={props.editlink} />
              </RoleView>
            </h3>
          </PlaceholderCustom>
        </Container>
      </div>
      <Container>
        <Link
          to="/member/displaydetails"
          onClick={() => {
            clickCard(props.leader)
          }}
        >
          <DetailsCard
            loading={props.loading}
            heading={props.leaderTitle}
            detail={props.leader && props.leader?.nameWithTitle}
            img={props.leader?.pictureUrl}
            bgNone
          />
        </Link>
        {/* details section */}
        {props.details?.length && (
          <Row>
            {props.details.map((detail, i) => (
              <Col key={i} xs={detail.width ?? 6}>
                <DetailsCard
                  onClick={() => navigate(detail.link)}
                  heading={detail.title}
                  detail={
                    !props.loading ? detail?.number?.toString() || '0' : ''
                  }
                />
              </Col>
            ))}
          </Row>
        )}
        <hr />
        {/* Two buttons */}
        <div className="d-flex gap-2">
          <PlaceholderCustom
            loading={props.loading}
            className={`btn-sonta w-100`}
            button="button"
          >
            <Button
              className={`btn-sonta w-100`}
              onClick={() => {
                setUserChurch({
                  id: props.churchId,
                  name: props.name,
                  __typename: props.churchType,
                })
                navigate(`/trends`)
              }}
            >
              <BsFillBarChartFill /> View Trends
            </Button>
          </PlaceholderCustom>

          {props.churchType === 'Sonta' && (
            <PlaceholderCustom
              loading={props.loading}
              className={`btn-sonta w-100`}
              button="button"
            >
              <Button
                className={`btn-sonta w-100`}
                onClick={() => {
                  setUserChurch({
                    id: props.churchId,
                    name: props.name,
                    __typename: props.churchType,
                  })

                  navigate(`/services/${props.churchType.toLowerCase()}`)
                }}
              >
                <CgFileDocument /> Meeting Forms
              </Button>
            </PlaceholderCustom>
          )}
        </div>
        {/* End two buttons */}
      </Container>

      {props.subLevel && props.buttons?.length ? (
        <>
          <Container>
            <hr className="hr-line" />

            <div className="row justify-content-between">
              <div className="col">
                <p className="text-secondary">{`${props.subLevel} Locations`}</p>
              </div>
              <div className="col-auto">
                <Link
                  className="card text-secondary px-1"
                  to={`/${props?.subLevel.toLowerCase()}/displayall`}
                >
                  {`View All ${plural(props.subLevel)}`}
                </Link>
              </div>
            </div>
          </Container>

          <div className="container mb-4 card-button-row">
            <table>
              <tbody>
                <tr>
                  {props?.buttons?.map((church, index) => {
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

export default DisplaySontaDetails
