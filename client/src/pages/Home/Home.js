import React, { useState } from 'react';
import './Home.css';
import Fade from 'react-reveal/Fade';
import { Bounce } from 'react-reveal';
import { Link } from 'react-scroll';
import Particles from 'react-particles-js';
import Typewriter from 'typewriter-effect';
// import Navbar from '../navbar/Navbar'
import config from '../../config';
import profile from '../../images/logo3.svg';
import linkedin from '../../images/logos/enter.png';

const Home = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <div className="home-wrapper">
      <div className="home">
        <Particles className="particles" params={config.particles} />
        <div className={`greeting${!imageLoaded ? ' hide' : ''}`}>
          {/* <Fade bottom distance="40px"> */}
          <img
            className="profile"
            alt="default"
            src={profile}
            onLoad={() => setImageLoaded(true)}
          />
          <h1 className="greeting-text">
            Hi, I'm <span className="name">DevTree</span>.{' '}
            <span className="wave-emoji" role="img" aria-label="waving hand">
              👋
            </span>
          </h1>
          <h1 className="greeting-text">
            <Typewriter
              options={{
                strings: ['환영합니다! devtree입니다.', 'I Like Mentoring'],
                autoStart: true,
                loop: true,
                deleteSpeed: 10,
                cursor: '<',
                delay: 100
              }}
            />
          </h1>
          <Bounce cascade>
            <div className="links">
              <a href="/Mainpage/app" rel="noopener noreferrer">
                <img className="imgs" src={linkedin} alt="Linkedin Logo" width="200px" />
              </a>
            </div>
          </Bounce>
          {/* <div className="scroll-down">
            <Link
              activeClass="active"
              to="about"
              spy={true}
              smooth={true}
              offset={-63}
              duration={500}
            >
              <ArrowDropDownCircleIcon
                fontSize="large"
                style={{ pointerEvents: 'fill', cursor: 'pointer' }}
              />
            </Link>
          </div> */}
          {/* </Fade> */}
        </div>
      </div>
      {/* <div style={{ backgroundColor: 'black', height: '60px' }}>하하</div> */}
    </div>
  );
};

export default Home;
