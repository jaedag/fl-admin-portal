import { useLazyQuery } from '@apollo/client'
import RoleView from 'auth/RoleView'
import UserProfileIcon from 'components/UserProfileIcon/UserProfileIcon'
import { ChurchContext } from 'contexts/ChurchContext'
import { MemberContext } from 'contexts/MemberContext'
import { authorisedLink, capitalise, plural } from 'global-utils'
import { getServiceGraphData } from 'pages/services/trends/trends-utils'
import React, { useContext, useEffect } from 'react'
import { Container, Nav, Navbar, Offcanvas, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { menuItems } from './dashboard-utils'
import './Navigation.css'
import logo from 'assets/flc-logo-red.png'
import { useAuth0 } from '@auth0/auth0-react'
import { GET_LOGGED_IN_USER } from 'components/UserProfileIcon/UserQueries'
import SearchBox from 'components/SearchBox'
import { Moon, Sun } from 'react-bootstrap-icons'
import { permitMe } from 'permission-utils'
import LogMeIn from './LogMeIn'

const Navigator = () => {
  const {
    currentUser,
    theme,
    setTheme,
    userJobs,
    setUserJobs,
    setCurrentUser,
  } = useContext(MemberContext)
  const { clickCard } = useContext(ChurchContext)
  const { user } = useAuth0()
  const { servant } = LogMeIn()

  const [memberByEmail] = useLazyQuery(GET_LOGGED_IN_USER, {
    onCompleted: (data) => {
      const church = data.memberByEmail.stream_name

      setCurrentUser({
        ...currentUser,
        __typename: 'Member',
        id: data.memberByEmail.id,
        firstName: data.memberByEmail.firstName,
        lastName: data.memberByEmail.lastName,
        fullName:
          data.memberByEmail.firstName + ' ' + data.memberByEmail.lastName,
        picture: data.memberByEmail?.pictureUrl ?? null,
        fellowship: data.memberByEmail?.fellowship.id,
        bacenta: data.memberByEmail?.fellowship?.bacenta?.id,
        council:
          data.memberByEmail?.fellowship?.bacenta.constituency?.council.id,
        constituency: data.memberByEmail?.fellowship?.bacenta.constituency?.id,
        church: { church: church, subChurch: 'bacenta' },
        stream_name: capitalise(data?.memberByEmail?.stream_name),
        stream:
          data.memberByEmail?.fellowship?.bacenta.constituency?.council.stream
            .id,
        gatheringService:
          data.memberByEmail?.fellowship?.bacenta.constituency?.council.stream
            .gatheringService.id,
        email: user?.email,
        roles: user ? user[`https://flcadmin.netlify.app/roles`] : [],
      })

      sessionStorage.setItem('currentUser', JSON.stringify({ ...currentUser }))
    },
  })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  let roles = []
  let assessmentChurchData, assessmentChurch

  useEffect(() => {
    if (!user) return

    memberByEmail({ variables: { email: user?.email } })
  }, [currentUser?.id, memberByEmail, user])

  useEffect(() => {
    if (userJobs?.jobs.length === roles?.length) return

    setUserJobs({
      jobs: roles,
      assessmentData: assessmentChurchData,
      assessmentChurch: assessmentChurch,
    })
  }, [
    assessmentChurch,
    assessmentChurchData,
    roles,
    setUserJobs,
    userJobs?.jobs.length,
  ])

  const setServantRoles = (servant, servantType, churchType) => {
    let verb

    switch (servantType) {
      case 'Leader':
        verb = `leads${churchType}`
        break
      case 'Admin':
        verb = `isAdminFor${churchType}`
        break
      case 'ArrivalsAdmin':
        verb = `isArrivalsAdminFor${churchType}`
        break
      case 'ArrivalsCounter':
        verb = `isArrivalsCounterFor${churchType}`
        break

      case 'ArrivalsConfirmer':
        verb = `isArrivalsConfirmerFor${churchType}`
        break
      default:
        break
    }

    const permittedForLink = permitMe(churchType)

    if (
      servantType === 'ArrivalsConfirmer' ||
      servantType === 'ArrivalsCounter'
    ) {
      const adminsOneChurch = servant[`${verb}`].length === 1 ?? false
      roles.push({
        name: adminsOneChurch
          ? churchType + ' ' + servantType
          : plural(churchType) + ' ' + servantType,
        church: servant[`${verb}`],
        number: servant[`${verb}`].length,
        link: authorisedLink(currentUser, permittedForLink, `/arrivals`),
      })

      assessmentChurch = servant[`${verb}`][0]
      return
    }

    if (servantType === 'Admin' || servantType === 'ArrivalsAdmin') {
      const adminsOneChurch = servant[`${verb}`].length === 1 ?? false
      roles.push({
        name: adminsOneChurch
          ? churchType + ' ' + servantType
          : plural(churchType) + ' ' + servantType,
        church: servant[`${verb}`],
        number: servant[`${verb}`].length,
        clickCard: () => {
          clickCard(servant[`${verb}`][0])
        },
        link: authorisedLink(
          currentUser,
          permittedForLink,
          adminsOneChurch
            ? `/${churchType.toLowerCase()}/displaydetails`
            : `/servants/church-list`
        ),
      })

      assessmentChurch = servant[`${verb}`][0]
      return
    }

    const leadsOneChurch = servant[`${verb}`].length === 1 ?? false
    roles.push({
      name: leadsOneChurch ? churchType : plural(churchType),
      church: servant[`${verb}`],
      number: servant[`${verb}`]?.length,
      clickCard: () => {
        clickCard(servant[`${verb}`][0])
      },
      link: authorisedLink(
        currentUser,
        permittedForLink,
        leadsOneChurch
          ? `/${churchType.toLowerCase()}/displaydetails`
          : `/servants/church-list`
      ),
    })

    assessmentChurch = servant[`${verb}`][0]
  }

  const getServantRoles = (servant) => {
    if (servant?.leadsFellowship?.length) {
      setServantRoles(servant, 'Leader', 'Fellowship')
    }
    if (servant?.leadsBacenta?.length) {
      setServantRoles(servant, 'Leader', 'Bacenta')
    }
    if (servant?.leadsSonta?.length) {
      setServantRoles(servant, 'Leader', 'Sonta')
    }
    if (servant?.leadsConstituency?.length) {
      setServantRoles(servant, 'Leader', 'Constituency')
    }
    if (servant?.isAdminForConstituency?.length) {
      setServantRoles(servant, 'Admin', 'Constituency')
    }
    if (servant?.isArrivalsAdminForConstituency?.length) {
      setServantRoles(servant, 'ArrivalsAdmin', 'Constituency')
    }
    if (servant?.leadsCouncil?.length) {
      setServantRoles(servant, 'Leader', 'Council')
    }
    if (servant?.isAdminForCouncil?.length) {
      setServantRoles(servant, 'Admin', 'Council')
    }
    if (servant?.isArrivalsAdminForCouncil?.length) {
      setServantRoles(servant, 'ArrivalsAdmin', 'Council')
    }
    if (servant?.leadsMinistry?.length) {
      setServantRoles(servant, 'Leader', 'Ministry')
    }
    if (servant?.leadsStream?.length) {
      setServantRoles(servant, 'Leader', 'Stream')
    }
    if (servant?.isAdminForStream?.length) {
      setServantRoles(servant, 'Admin', 'Stream')
    }
    if (servant?.isArrivalsAdminForStream?.length) {
      setServantRoles(servant, 'ArrivalsAdmin', 'Stream')
    }
    if (servant?.isArrivalsCounterForStream?.length) {
      setServantRoles(servant, 'ArrivalsCounter', 'Stream')
    }
    if (servant?.isArrivalsConfirmerForStream?.length) {
      setServantRoles(servant, 'ArrivalsConfirmer', 'Stream')
    }
    if (servant?.leadsGatheringService?.length) {
      setServantRoles(servant, 'Leader', 'GatheringService')
    }
    if (servant?.isAdminForGatheringService?.length) {
      setServantRoles(servant, 'Admin', 'GatheringService')
    }
    if (servant?.isArrivalsAdminForGatheringService?.length) {
      setServantRoles(servant, 'ArrivalsAdmin', 'GatheringService')
    }
    if (servant?.leadsBasonta?.length) {
      setServantRoles(servant, 'Leader', 'Basonta')
    }

    //run the get graph function after all checking is done to avoid multiple unnecessary runs
    if (assessmentChurch) {
      return getServiceGraphData(assessmentChurch)
    }

    return
  }

  assessmentChurchData = servant && getServantRoles(servant)

  return (
    <Navbar
      collapseOnSelect
      bg={theme}
      variant={theme}
      expand={false}
      sticky="top"
    >
      <Container fluid>
        <Navbar.Toggle
          aria-controls="offcanvasNavbar"
          className="nav-toggler"
        />

        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="start"
          className={`bg-nav ${theme}`}
        >
          <Offcanvas.Header className={`${theme}`} closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">
              <img
                src={logo}
                width="50"
                height="50"
                className="d-inline-block align-top"
                alt="FLC Admin Logo"
              />
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-start flex-grow-1">
              {menuItems.map((menuItem, index) => (
                <RoleView key={index} roles={menuItem.roles}>
                  <Nav.Link
                    as={Link}
                    eventKey={index}
                    exact={menuItem.exact}
                    to={menuItem.to}
                    className="font-primary nav-btn"
                  >
                    {menuItem.name}
                  </Nav.Link>
                </RoleView>
              ))}
            </Nav>
            <SearchBox />
          </Offcanvas.Body>
          <Container className="footer">
            <Row>
              <Col>
                <Nav.Link
                  as={Link}
                  eventKey={menuItems.length}
                  exact="true"
                  to="/user-profile"
                >
                  <UserProfileIcon />
                </Nav.Link>
              </Col>
              <Col>
                <div className="d-flex justify-content-center align-items-center h-100">
                  {theme === 'light' ? (
                    <Moon
                      size={22}
                      onClick={() => {
                        theme === 'light' ? setTheme('dark') : setTheme('light')
                      }}
                    />
                  ) : (
                    <Sun
                      size={22}
                      onClick={() => {
                        theme === 'dark' ? setTheme('light') : setTheme('dark')
                      }}
                    />
                  )}
                </div>
              </Col>
            </Row>
          </Container>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  )
}

export default Navigator
