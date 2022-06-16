import React from 'react'
import AuthButton from './buttons/AuthButton'
import Logo from '../assets/flc-logo-small.png'
import MobileView from './responsive-design/MobileView'
import TabletDesktopView from './responsive-design/TabletDesktopView'
import { Container } from 'react-bootstrap'
import './Login.css'

const Login = () => {
  const catchPhrase = 'A church full of young people on fire for the Lord'

  return (
    <>
      <TabletDesktopView>
        <div className="container  ">
          {/* <!--Web Logo and text--> */}
          <div className="row align-self-center">
            {/* <!--Sign In--> */}

            <form className="login-page-lg">
              <div className="m-5">
                <div className="col-auto my-3">
                  <img src={Logo} alt="logo" className="img-fluid" />{' '}
                  <div className="mb-3">{catchPhrase}</div>
                  <p className="text-secondary mb-3">
                    Click to log in to your servants portal
                  </p>
                </div>
                <AuthButton />
              </div>
            </form>
          </div>
        </div>
      </TabletDesktopView>

      {/* <!--Mobile--> */}
      <MobileView className="bg-wrapper">
        <Container className="text-center mt-5 bg-content">
          <img
            src={Logo}
            alt="logo"
            className="img-fluid mx-auto d-block logo"
          />

          <div className="mb-5 font-primary">
            <p>
              <i>{catchPhrase}</i>
            </p>
          </div>

          <p className="text-secondary mb-3">
            Click to log in to your servants portal
          </p>
          <div className="col-auto text-center">
            <AuthButton mobileFullSize="true" />
          </div>

          <div className="col-12 col-lg-6 d-flex justify-content-center my-3 ">
            <div className=" flex-grow-1" />
          </div>
        </Container>
      </MobileView>
    </>
  )
}

export default Login
