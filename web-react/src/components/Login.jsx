import React from 'react'
import AuthButton from './buttons/AuthButton'
import UserProfileIcon from './UserProfileIcon/UserProfileIcon'
import Logo from '../img/flc-logo-small.png'
import MobileView from './responsive-design/MobileView'
import TabletDesktopView from './responsive-design/TabletDesktopView'

const Login = () => {
  const version = 'v0.5.2'
  return (
    <>
      <TabletDesktopView>
        <div className="container body-container ">
          {/* <!--Web Logo and text--> */}
          <div className="row align-self-center">
            {/* <!--Sign In--> */}

            <form className="login-page-lg">
              <div className="m-5">
                <div className="col-auto my-3">
                  <img src={Logo} alt="logo" className="img-fluid" />{' '}
                  <sup>
                    <small>{version}</small>
                  </sup>
                  <div className="">
                    First Love Church is a church full of young people on fire
                    for the Lord
                  </div>
                </div>
                <UserProfileIcon />
              </div>
            </form>
          </div>
        </div>
      </TabletDesktopView>

      {/* <!--Mobile--> */}
      <MobileView>
        <div className="row d-flex align-items-center justify-content-center">
          <div className="col-12 col-lg-6">
            <img
              src={Logo}
              alt="logo"
              className="img-fluid mx-auto d-block "
              style={{ maxWidth: '30%' }}
            />
            <div className=" text-center">
              <span className="h2 font-weight-bold">FLC Admin</span>
              <sup>
                <small>{version}</small>
              </sup>
            </div>
            <div className="col-auto my-3 align-items-center text-center">
              First Love Church is a church full of young people on fire for the
              Lord!
            </div>
            <div className="col-auto text-center">
              <AuthButton mobileFullSize="true" />
            </div>
          </div>

          <div className="col-12 col-lg-6 d-flex justify-content-center my-3 ">
            <div className=" flex-grow-1" />
          </div>
        </div>
      </MobileView>
    </>
  )
}

export default Login
