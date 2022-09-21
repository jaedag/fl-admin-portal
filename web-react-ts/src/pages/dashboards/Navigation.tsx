import RoleView from 'auth/RoleView'
import UserProfileIcon from 'components/UserProfileIcon/UserProfileIcon'
import { MemberContext } from 'contexts/MemberContext'
import { useContext } from 'react'
import { Container, Nav, Navbar, Offcanvas, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { menuItems } from './dashboard-utils'
import SearchBox from 'components/SearchBox'
import { ArrowClockwise, ChevronLeft, Moon, Sun } from 'react-bootstrap-icons'
import './Navigation.css'
import { useNavigate } from 'react-router-dom'

const Navigator = () => {
  const { theme, setTheme } = useContext(MemberContext)
  const navigate = useNavigate()

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
        <Navbar.Brand>
          <ChevronLeft
            className="mx-4"
            size={24}
            onClick={() => navigate(-1)}
          />
          <ArrowClockwise size={24} onClick={() => window.location.reload()} />
        </Navbar.Brand>

        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="start"
        >
          <Offcanvas.Header className={`${theme}`} closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel"></Offcanvas.Title>
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
