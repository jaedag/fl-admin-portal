import React from 'react'
import AuthButton from './buttons/AuthButton'
import MobileView from './responsive-design/MobileView'
import TabletDesktopView from './responsive-design/TabletDesktopView'
import { Container } from 'react-bootstrap'
import './Login.css'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import BarIcon from '../assets/bars.svg'
import GlobeIcon from '../assets/globe.svg'
import Silhouette from '../assets/silhouette.svg'

const Login = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    autoplaySpeed: 2100,
  }
  const catchPhrase = 'A church full of young people on fire for the Lord'

  return (
    <>
      <TabletDesktopView>
        <div className="container text-center mt-5 desktop-card login-page">
          <div className="row align-self-center">
            <Slider {...settings} className="mb-5 mt-5">
              <div>
                <img
                  src={Silhouette}
                  alt="silhouette"
                  className="img-fluid mx-auto d-block logo"
                />
              </div>
              <div>
                <img
                  src={BarIcon}
                  alt="bar"
                  className="img-fluid mx-auto d-block logo"
                />
              </div>
              <div>
                <img
                  src={GlobeIcon}
                  alt="globe"
                  className="img-fluid mx-auto d-block logo"
                />
              </div>
            </Slider>
            <p className="mb-3 mt-3 text-white">FLC SERVANTS PORTAL</p>

            <p className="mt-3 text-white">{catchPhrase}</p>

            <p className="text-secondary mb-3">
              Click to log in to your servants portal
            </p>
            <div className="col-6 mx-auto mb-5">
              <AuthButton mobileFullSize="true" />
            </div>
          </div>
        </div>
      </TabletDesktopView>

      {/* <!--Mobile--> */}
      <MobileView className="bg-wrapper">
        <Container className="text-center mt-5 bg-content login-page">
          <Slider {...settings} className="mb-5">
            <div>
              <img
                src={Silhouette}
                alt="silhouette"
                className="img-fluid mx-auto d-block logo"
              />
            </div>
            <div>
              <img
                src={BarIcon}
                alt="bar"
                className="img-fluid mx-auto d-block logo"
              />
            </div>
            <div>
              <img
                src={GlobeIcon}
                alt="globe"
                className="img-fluid mx-auto d-block logo"
              />
            </div>
          </Slider>
          <p className="mb-3 mt-3 text-white">FLC SERVANTS PORTAL</p>

          <p className="mt-3 text-white">{catchPhrase}</p>

          <p className="text-secondary mb-3">
            Click to log in to your servants portal
          </p>
          <div className="col-6 mx-auto ">
            <AuthButton mobileFullSize="true" />
          </div>
        </Container>
      </MobileView>
    </>
  )
}

export default Login
