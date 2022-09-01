import React from 'react'
import './SplashScreen.css'

const SplashSreen = () => {
  const logo = require('../../assets/splash-screen-flc-logo.png')

  return (
    <div className="cover">
      <div className="d-flex aligns-items-center justify-content-center ">
        <img src={logo} alt="FLC Logo" id="icon" className="animation" />
      </div>
    </div>
  )
}

export default SplashSreen
