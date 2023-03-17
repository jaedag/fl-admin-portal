import './SplashScreen.css'
import logo from 'assets/splash-screen-flc-logo.png'

const SplashSreen = () => {
  return (
    <div className="cover">
      <div className="d-flex aligns-items-center justify-content-center ">
        <img src={logo} alt="FLC Logo" id="icon" className="animation" />
      </div>
    </div>
  )
}

export default SplashSreen
