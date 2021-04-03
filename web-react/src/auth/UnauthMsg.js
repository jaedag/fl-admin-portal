import React from 'react'
import { useHistory } from 'react-router-dom'
import { NavBar } from '../components/NavBar'

export const UnauthMsg = () => {
  const history = useHistory()

  return (
    <React.Fragment>
      <NavBar />
      <div className="container body-container">
        {/* <!--Web Logo and text--> */}
        <div className="row d-flex align-items-center justify-content-center d-lg-none">
          <div className="col-12 col-lg-6 justify-content-center">
            {`Heya! Looks like you're trying to view some information that is not
            meant for you. Please contact the system administrator for more
            information`}
            <div>
              {' '}
              <button
                className="btn-primary"
                onClick={() => {
                  history.goBack()
                }}
              >
                Click Here To Go Back
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <!--Mobile--> */}
      {/* <div className="row d-flex align-items-center justify-content-center d-lg-none">
        <div className="col-12 col-lg-6">
          <img
            src={Logo}
            alt="logo"
            className="img-fluid mx-auto d-block d-lg-none"
            style={{ maxWidth: '30%' }}
          />
          <div className="d-lg-none h2 text-center text-white">FLC Admin</div>
          <div className="col-auto my-3 align-items-center">
            First Love Church is a church full of young people on fire for the
            Lord
          </div>
          <div className="col-auto">
            <AuthButton />
          </div>
        </div>

        <div className="col-12 col-lg-6 d-flex justify-content-center my-3 ">
          <div className="d-lg-none flex-grow-1" />
        </div>
      </div> */}
    </React.Fragment>
  )
}
