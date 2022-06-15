import "./Landing.scss"
import hero from '../../assets/comics-landing-image--min.jpeg';

import comicOne from '../../assets/comic-1--min.jpg';
import comicTwo from '../../assets/comic-2--min.jpg';
import comicThree from '../../assets/comic-3--min.jpg';
import comicFour from '../../assets/comic-4--min.jpg';
import comicFive from '../../assets/comic-5--min.jpg';
import comicSix from '../../assets/comic-6--min.jpg';
import comicSeven from '../../assets/comic-7--min.jpg';

import {ReactComponent as VisionOne} from "../../assets/comics-graphic-1.svg"
import {ReactComponent as VisionTwo} from "../../assets/comics-graphic-2.svg"
import {ReactComponent as VisionThree} from "../../assets/comics-graphic-3.svg"
import {ReactComponent as HeroLogo} from "../../assets/beckett-comic-logo.svg"
import {ReactComponent as FooterLogo} from "../../assets/beckett-logo.svg"

const Landing = () => {
  return (
    <div className="page-wrapper page-landing">

      <nav className="landing-nav_component">
        <div className="landing-nav_content-wrapper">
            <div className="landing-nav_wrapper">
              <HeroLogo className="landing-nav_logo"></HeroLogo>
            </div>
            <a href="/login" className="landing-button landing-button-primary text-base">Login</a>
        </div>
      </nav>

      <div className="main-wrapper">

        <section className="section-landing-header">
          <div className="landing-header_component">
            <div className="landing-header_background-wrapper">
              <div className="landing-header_background-overlay"></div>
              <div className="landing-header_background-image-blur"></div>
              <img src={hero} alt="person looking up at the stars" className="landing-header_background-image"></img>
            </div>
            <div className="landing-page-padding">
            <div className="landing-header_content-wrapper">
              <h1 className="text-5xl landing-heading mb-7 text-center font-medium">Comprehensive comic book pricing at your fingertips </h1>
              <p className="mb-20 text-center max-w-xl font-medium">Browse pricing data on millions of comic books available to find your favorite titles all in one place.</p>
              <a href="/signup" className="landing-button landing-button-primary">Join the Waitlist</a>
            </div>
            </div>
          </div>
        </section>

        <div className="landing-content-wrapper">
          <div className="landing-page-padding  flex flex-col items-center">
            <div className="landing-container-large">

        <section className="section-landing-titles">
            <div className="landing-container-medium flex flex-col items-center w-full">
              <div className="layout1_component">
                <h2 className="text-3xl landing-heading text-center mb-20 font-medium">Browse Millions of Titles</h2>
                <div className="titles_component">
                  <div className="titles_layout">
                    <div className="titles_image-wrapper">
                      <img src={comicOne} alt="" className="titles_image"></img>
                    </div>
                    <div className="titles_image-wrapper">
                      <img src={comicTwo} alt="" className="titles_image"></img>
                    </div>
                    <div className="titles_image-wrapper">
                      <img src={comicThree} alt="" className="titles_image"></img>
                    </div>
                    <div className="titles_image-wrapper">
                      <img src={comicFour} alt="" className="titles_image"></img>
                    </div>
                    <div className="titles_image-wrapper">
                      <img src={comicFive} alt="" className="titles_image"></img>
                    </div>
                    <div className="titles_image-wrapper">
                      <img src={comicSix} alt="" className="titles_image"></img>
                    </div>
                    <div className="titles_image-wrapper">
                      <img src={comicSeven} alt="" className="titles_image"></img>
                    </div>
                  </div>
                </div>
                <div className="mb-14"></div>
                <div className="indicator-dots_component">
                  <div className="indicator-dots_dots-wrapper">
                    <div className="indicator-dots_dot-active"></div>
                    <div className="indicator-dots_dot-inactive"></div>
                    <div className="indicator-dots_dot-inactive"></div>
                  </div>
                </div>
              </div>
            </div>
        </section>

        <div className="w-full h-px">
          <div className="page-divider_component"></div>
        </div>

        <section className="section-landing-value">

          <div className="landing-value-item landing-container-medium">
            <div className="layout2_component">
              <div className="layout2_image-wrapper">
              <VisionOne className="layout2_image"></VisionOne>
              </div>
              <div className="layout2_content-wrapper">
                <h3 className="text-3xl landing-heading mb-8 font-semibold">Search Comics</h3>
                <p>Explore our extensive library of comic book titles to learn more about pricing, listings, and valuation.</p>
              </div>
            </div>
          </div>
          
          <div className="landing-value-item landing-container-medium">
            <div className="layout2_component">
              <div className="layout2_content-wrapper">
                <h3 className="text-3xl landing-heading mb-8 font-semibold">Compare Market Sales</h3>
                <p>Access Beckett’s pricing expertise as you compare your favorite titles, view pricing history, and see prices for related comics.</p>
              </div>
              <div className="layout2_image-wrapper">
              <VisionTwo className="layout2_image"></VisionTwo>
              </div>
            </div>
          </div>

          <div className="landing-value-item landing-container-medium">
                <div className="layout2_component">
                <div className="layout2_image-wrapper">
                <VisionThree className="layout2_image"></VisionThree>
                </div>
                <div className="layout2_content-wrapper">
                  <h3 className="text-3xl landing-heading mb-8 font-semibold">Purchase and Enjoy</h3>
                  <p>Discover listings for your favorite comics and be empowered to make an informed comic purchase.</p>
              </div>
            </div>
          </div>
        </section>
        </div>


          </div>
        </div>
        <div className="landing-page-padding  flex flex-col items-center">
        <section className="section-landing-cta">
          <div className="landing-page-padding flex flex-col items-center">
            <div className="landing-container-medium">
              <div className="layout3_component">
              <h2 className="text-4xl landing-heading">Ready to get started?<br/>Sign up today.</h2>
              <div className="layout3_landing-buttons-wrapper">
                <a href="/signup" className="landing-button landing-button-primary mr-8">Join the waitlist</a>
                <a href="/login" className="landing-button landing-button-secondary">Login</a>
              </div>
              </div>
            </div>
          </div>
        </section>

        </div>

      </div>

      <footer className="landing-footer_component">
        <div className="landing-container-large">
        <div className="w-full h-px">
          <div className="page-divider_component"></div>
        </div>
        <div className="landing-footer_layout">
          <div className="landing-footer_left-wrapper">
            <FooterLogo className="landing-footer_logo mb-8"></FooterLogo>
            <p className="mb-3">©2022</p>
            <a href="/">Terms of Service</a>
          </div>
          <div className="landing-footer_right-wrapper">
            <div className="landing-footer_content-column">
              <p className="landing-footer_content-heading">Features</p>
              <a href="/" className="landing-footer_content-item">Feature</a>
              <a href="/" className="landing-footer_content-item">Feature</a>
              <a href="/" className="landing-footer_content-item">Feature</a>
            </div>
            <div className="landing-footer_content-column">
              <p className="landing-footer_content-heading">Resources</p>
              <a href="/" className="landing-footer_content-item">Resource</a>
              <a href="/" className="landing-footer_content-item">Resource</a>
              <a href="/" className="landing-footer_content-item">Resource</a>
            </div>
            <div className="landing-footer_content-column">
              <p className="landing-footer_content-heading">Company</p>
              <a href="/" className="landing-footer_content-item">Company</a>
              <a href="/" className="landing-footer_content-item">Company</a>
              <a href="/" className="landing-footer_content-item">Company</a>
            </div>
          </div>
        </div>
        </div>
      </footer>
    </div>
  )
}

export default Landing