import { useQuery } from '@apollo/client'
import RoleView from 'auth/RoleView'
import UserProfileIcon from 'components/UserProfileIcon/UserProfileIcon'
import { MemberContext } from 'contexts/MemberContext'
import { capitalise } from 'global-utils'
import React, { useContext } from 'react'
import { Container, Nav, Navbar, Offcanvas, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { menuItems } from './dashboard-utils'
import logo from 'assets/flc-logo-red.webp'
import { useAuth0 } from '@auth0/auth0-react'
import { GET_LOGGED_IN_USER } from 'components/UserProfileIcon/UserQueries'
import SearchBox from 'components/SearchBox'
import { Moon, Sun } from 'react-bootstrap-icons'
import './Navigation.css'

const Navigator = () => {
  const { currentUser, theme, setTheme, setCurrentUser } =
    useContext(MemberContext)
  const { user } = useAuth0()

  useQuery(GET_LOGGED_IN_USER, {
    variables: { email: user?.email },
    onCompleted: (data) => {
      const church = data.memberByEmail.stream_name
      console.log(data)
      setCurrentUser({
        ...currentUser,
        id: data.memberByEmail.id,
        fellowship: data.memberByEmail?.fellowship?.id,
        bacenta: data.memberByEmail?.fellowship?.bacenta?.id,
        council:
          data.memberByEmail?.fellowship?.bacenta.constituency?.council.id,
        constituency: data.memberByEmail?.fellowship?.bacenta.constituency?.id,
        church: { church: church, subChurch: 'bacenta' },
        stream_name: capitalise(data?.memberByEmail?.stream_name),
        stream:
          data.memberByEmail?.fellowship?.bacenta.constituency?.council.stream
            .id,
        noIncome:
          data.memberByEmail?.fellowship?.bacenta.constituency?.council.stream
            .gatheringService.noIncome,
        gatheringService:
          data.memberByEmail?.fellowship?.bacenta.constituency?.council.stream
            .gatheringService.id,
      })

      sessionStorage.setItem('currentUser', JSON.stringify({ ...currentUser }))
    },
  })

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
                <RoleView key={index} roles={menuItem.roles}>
                  <Nav.Link
                    as={Link}
                    eventKey={index}
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
