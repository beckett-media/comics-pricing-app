import "./Landing.scss"
import hero from '../../assets/comics-landing-image--min.jpeg';

const Landing = () => {
  return (
    <div className="page-wrapper page-landing bg-landing-purple-dark text-xl">

      <nav className="nav_component">
        <div className="nav_content-wrapper z-10">
            <img className="nav_logo" src="" alt="Beckett logo"></img>
            <button className="button button-primary">Login</button>
        </div>
      </nav>

      <div className="main-wrapper">

        <section className="section-landing-header overflow-hidden">
          <div className="landing-header_component relative">
            <div className="landing-header_background-wrapper absolute w-full h-full">
              <div className="landing-header_overlay w-full h-full bg-landing-purple-overlay-300 z-10 absolute"></div>
              <img src={hero} alt="person looking up at the stars" className="landing-header_background object-cover object-center"></img>
            </div>
            <div className="landing-header_content-wrapper relative z-10">
              <h1 className="text-5xl landing-heading">Comprehensive comic book pricing at your fingertips </h1>
              <p>Browse pricing data on millions of comic books available to find your favorite titles all in one place.</p>
              <button className="button button-primary">Join the Waitlist</button>
            </div>
          </div>
        </section>

        <div className="landing-content-wrapper bg-gradient-to-b from-landing-purple-start via-landing-purple-dark to-landing-purple-stop">
        <section className="section-landing-titles flex justify-center">
          <div className="container-large flex flex-col content-center w-full">
            <div className="layout1_component flex flex-col content-center ">
              <h2 className="text-3xl landing-heading text-center mb-20">Browse Millions of Titles</h2>
              <div className="titles_component"></div>
              <div className="indicator-dots_component"></div>
            </div>
          </div>
        </section>

        <div className="w-100 h-px mx-20">
          <div className="page-divider_componen w-full bg-primary-button-start h-full"></div>
        </div>

        <section className="section-landing-value">
          <div className="layout2_component">
            <img className="layout2_image" src="" alt="" />
            <div className="layout2_content-wrapper">
              <h3 className="text-3xl landing-heading">Search Comics</h3>
              <p>Explore our extensive library of comic book titles to learn more about pricing, listings, and valuation.</p>
            </div>
          </div>
          <div className="layout3_component">
            <img className="layout3_image" src="" alt="" />
            <div className="layout3_content-wrapper">
              <h3 className="text-3xl landing-heading">Compare Market Sales</h3>
              <p>Access Beckett’s pricing expertise as you compare your favorite titles, view pricing history, and see prices for related comics.</p>
            </div>
          </div>
          <div className="layout2_component">
            <img className="layout2_image" src="" alt="" />
            <div className="layout2_content-wrapper">
              <h3 className="text-3xl landing-heading">Purchase and Enjoy</h3>
              <p>Discover listings for your favorite comics and be empowered to make an informed comic purchase.</p>
            </div>
          </div>
        </section>
        </div>

        <section className="section-cta">
          <div className="layout4_component">
            <h2 className="text-4xl landing-heading">Ready to get started?<br/>Sign up today.</h2>
            <div className="layout4_buttons-wrapper">
              <button className="button button-primary">Join the waitlist</button>
              <button className="button button-secondary">Login</button>
            </div>
          </div>
        </section>

      </div>

      <div className="landing-divider"></div>

      <footer className="footer_component">
        <div className="footer_left-wrapper">
          <img src="" alt="Becket logo" className="footer_logo" />
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