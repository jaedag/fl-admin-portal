import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import Popup from '../Popup/Popup'
import { Button, Container, Spinner } from 'react-bootstrap'
import usePopup from 'hooks/usePopup'
import './AuthButton.css'
import { BoxArrowRight } from 'react-bootstrap-icons'

type AuthButtonPropsType = {
  mobileFullSize?: boolean
}
const AuthButton = (props: AuthButtonPropsType) => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0()
  const { togglePopup, isOpen } = usePopup()
  const { mobileFullSize } = props

  if (!isAuthenticated) {
    return (
      <Container className="d-grid gap-2">
        <Button
          variant="primary"
          size="lg"
          className={`login auth-button ${
            !mobileFullSize && `d-none d-md-inline`
          }`}
          onClick={() => loginWithRedirect()}
        >
          Log In
        </Button>
        {!mobileFullSize && (
          <i
            className="fas fa-sign-in-alt fa-2x d-md-none"
            onClick={() => loginWithRedirect()}
          />
        )}
      </Container>
    )
  }

  if (isAuthenticated && location.pathname === '/') {
    return (
      <div className="text-secondary text-center">
        <p>Please wait while we log you in</p>
        <Spinner animation="grow" />
      </div>
    )
  }

  if (isAuthenticated) {
    return (
      <Container>
        <div className="d-grid gap-2">
          <Button
            size="lg"
            variant="danger"
            className={`auth-button logout text-nowrap ${
              !mobileFullSize && `d-none d-md-inline`
            }`}
            onClick={togglePopup}
          >
            Log Out <BoxArrowRight />
          </Button>
        </div>
        {isOpen && (
          <Popup handleClose={togglePopup}>
            <>
              <b>Confirm Log Out</b>
              <p className="mt-2">Are you sure you want to Log Out?</p>
              <div className="d-grid gap-2">
                <Button
                  className={`auth-button logout mt-3 ${
                    !mobileFullSize && `d-none d-md-inline`
                  }`}
                  onClick={() => {
                    logout({ returnTo: window.location.origin })
                    togglePopup()
                  }}
                >
                  Log Out
                </Button>
              </div>
            </>
          </Popup>
        )}

        {!mobileFullSize && (
          <i
            className="fas fa-sign-out-alt fa-2x d-md-none"
            onClick={() => logout({ returnTo: window.location.origin })}
          />
        )}
      </Container>
    )
  }
}

export default AuthButton
