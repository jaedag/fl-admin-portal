import { useQuery } from '@apollo/client'
import RoleView from 'auth/RoleView'
import UserProfileIcon from 'components/UserProfileIcon/UserProfileIcon'
import { MemberContext } from 'contexts/MemberContext'
import { authorisedLink, capitalise, plural } from 'global-utils'
import { getServiceGraphData } from 'pages/services/graphs/graphs-utils'
import React, { useContext, useEffect } from 'react'
import { Container, Nav, Navbar, Offcanvas, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { menuItems, parseRoles, roles } from './dashboard-utils'
import logo from 'assets/flc-logo-red.png'
import { useAuth0 } from '@auth0/auth0-react'
import { GET_LOGGED_IN_USER } from 'components/UserProfileIcon/UserQueries'
import SearchBox from 'components/SearchBox'
import { Moon, Sun } from 'react-bootstrap-icons'
import { permitMe } from 'permission-utils'
import useLogMeIn from './LogMeIn'
import './Navigation.css'
import { churchLevels } from 'pages/directory/update/directory-utils'

const Navigator = () => {
  const {
    currentUser,
    theme,
    setTheme,
    userJobs,
    setUserJobs,
    setCurrentUser,
  } = useContext(MemberContext)
  const { user } = useAuth0()
  const { servant } = useLogMeIn()

  useQuery(GET_LOGGED_IN_USER, {
    variables: { email: user.email },
    onCompleted: (data) => {
      const church = data.memberByEmail.stream_name

      setCurrentUser({
        ...currentUser,
        id: data.memberByEmail.id,
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
      })

      sessionStorage.setItem('currentUser', JSON.stringify({ ...currentUser }))
    },
  })

  let userRoles = []
  let assessmentChurchData, assessmentChurch

  useEffect(() => {
    if (userJobs?.jobs.length === userRoles?.length) return

    setUserJobs({
      jobs: userRoles,
      assessmentData: assessmentChurchData,
      assessmentChurch: assessmentChurch,
    })
  }, [
    servant,
    currentUser,
    assessmentChurch,
    assessmentChurchData,
    userRoles,
    setUserJobs,
    userJobs?.jobs.length,
  ])

  const setServantuserRoles = (servant, servantType, churchType, verb) => {
    const permittedForLink = permitMe(churchType)

    if (
      servantType === 'isArrivalsConfirmerFor' ||
      servantType === 'isArrivalsCounterFor'
    ) {
      const adminsOneChurch = servant[`${verb}`]?.length === 1 ?? false
      userRoles.push({
        name: adminsOneChurch
          ? churchType + ' ' + parseRoles(servantType)
          : plural(churchType) + ' ' + parseRoles(servantType),
        church: servant[`${verb}`],
        number: servant[`${verb}`]?.length,
        link: authorisedLink(currentUser, permittedForLink, `/arrivals`),
      })

      assessmentChurch = servant[`${verb}`] && servant[`${verb}`][0]
      return
    }

    if (servantType === 'isAdminFor' || servantType === 'isArrivalsAdminFor') {
      const adminsOneChurch = servant[`${verb}`]?.length === 1 ?? false
      userRoles.push({
        name: adminsOneChurch
          ? churchType + ' ' + parseRoles(servantType)
          : plural(churchType) + ' ' + parseRoles(servantType),
        church: servant[`${verb}`],
        number: servant[`${verb}`]?.length,

        link: authorisedLink(
          currentUser,
          permittedForLink,
          adminsOneChurch
            ? `/${churchType.toLowerCase()}/displaydetails`
            : `/servants/church-list`
        ),
      })

      assessmentChurch = servant[`${verb}`] && servant[`${verb}`][0]
      return
    }

    const leadsOneChurch = servant[`${verb}`]?.length === 1 ?? false

    userRoles.push({
      name: leadsOneChurch ? churchType : plural(churchType),
      church: servant[`${verb}`],
      number: servant[`${verb}`]?.length,
      link: authorisedLink(
        currentUser,
        permittedForLink,
        leadsOneChurch
          ? `/${churchType.toLowerCase()}/displaydetails`
          : `/servants/church-list`
      ),
    })

    assessmentChurch = servant[`${verb}`] && servant[`${verb}`][0]
  }

  const getServantuserRoles = (servant) => {
    churchLevels.forEach((level) => {
      roles[`${level}`].forEach((verb) => {
        const shouldSearch = (verb, level) => {
          return currentUser?.roles.includes(parseRoles(verb) + level)
        }

        if (shouldSearch(verb, level)) {
          setServantuserRoles(servant, verb, level, verb + level)
        }
      })
    })

    //run the get graph function after all checking is done to avoid multiple unnecessary runs
    if (assessmentChurch) {
      return getServiceGraphData(assessmentChurch)
    }

    return
  }

  assessmentChurchData = servant && getServantuserRoles(servant)

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
          <Offcanvas.Body className={`${theme}`}>
            <Nav className="justify-content-start flex-grow-1">
              {menuItems.map((menuItem, index) => (
                <RoleView key={index} userRoles={menuItem.userRoles}>
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
          <Container className={`footer ${theme}`}>
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
