import "./Landing.scss"
import hero from '../../assets/comics-landing-image--min.jpeg';
import {ReactComponent as VisionOne} from "../../assets/comics-graphic-1.svg"
import {ReactComponent as VisionTwo} from "../../assets/comics-graphic-2.svg"
import {ReactComponent as VisionThree} from "../../assets/comics-graphic-3.svg"
import {ReactComponent as HeroLogo} from "../../assets/beckett-comic-logo.svg"
import {ReactComponent as FooterLogo} from "../../assets/beckett-logo.svg"

const Landing = () => {
  return (
    <div className="page-wrapper page-landing">

      <nav className="nav_component">
        <div className="nav_content-wrapper">
            <div className="nav_wrapper">
              <HeroLogo className="nav_logo"></HeroLogo>
            </div>
            <button className="button button-primary">Login</button>
        </div>
      </nav>

      <div className="main-wrapper">

        <section className="section-landing-header">
          <div className="landing-header_component">
            <div className="landing-header_background-wrapper">
              <div className="landing-header_background-overlay"></div>
              <img src={hero} alt="person looking up at the stars" className="landing-header_background-image"></img>
            </div>
            <div className="page-padding">
            <div className="landing-header_content-wrapper">
              <h1 className="text-5xl landing-heading mb-7 text-center font-medium">Comprehensive comic book pricing at your fingertips </h1>
              <p className="mb-20 text-center max-w-xl font-medium">Browse pricing data on millions of comic books available to find your favorite titles all in one place.</p>
              <button className="button button-primary">Join the Waitlist</button>
            </div>
            </div>
          </div>
        </section>

        <div className="landing-content-wrapper">
          <div className="page-padding  flex flex-col items-center">
            <div className="container-large">

        <section className="section-landing-titles">
            <div className="container-medium flex flex-col items-center w-full">
              <div className="layout1_component">
                <h2 className="text-3xl landing-heading text-center mb-20 font-medium">Browse Millions of Titles</h2>
                <div className="titles_component"></div>
                <div className="indicator-dots_component"></div>
              </div>
            </div>
        </section>

        <div className="w-100 h-px">
          <div className="page-divider_component"></div>
        </div>

        <section className="section-landing-value">

          <div className="landing-value-item container-medium">
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
          
          <div className="landing-value-item container-medium">
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

          <div className="landing-value-item container-medium">
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
        <section className="section-cta">
          <div className="layout3_component">
            <h2 className="text-4xl landing-heading">Ready to get started?<br/>Sign up today.</h2>
            <div className="layout3_buttons-wrapper">
              <button className="button button-primary">Join the waitlist</button>
              <button className="button button-secondary">Login</button>
            </div>
          </div>
        </section>
      </div>

      <div className="landing-divider"></div>

      <footer className="footer_component">
        <div className="footer_left-wrapper">
          <FooterLogo className="footer_logo"></FooterLogo>
          <p>©2022</p>
          <a href="/">Terms of Service</a>
        </div>
        <div className="footer_right-wrapper">
          <div className="footer_content-column">
            <p className="footer_content-heading">Features</p>
            <a href="/" className="footer_content-item">Feature</a>
            <a href="/" className="footer_content-item">Feature</a>
            <a href="/" className="footer_content-item">Feature</a>
          </div>
          <div className="footer_content-column">
            <p className="footer_content-heading">Resources</p>
            <a href="/" className="footer_content-item">Resource</a>
            <a href="/" className="footer_content-item">Resource</a>
            <a href="/" className="footer_content-item">Resource</a>
          </div>
          <div className="footer_content-column">
            <p className="footer_content-heading">Company</p>
            <a href="/" className="footer_content-item">Company</a>
            <a href="/" className="footer_content-item">Company</a>
            <a href="/" className="footer_content-item">Company</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Landing