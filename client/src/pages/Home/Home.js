import React, { useState } from 'react';
import './Home.css';
import { Bounce } from '@stahl.luke/react-reveal';
import { Link } from 'react-scroll';
import Particles from 'react-tsparticles';
import Typewriter from 'typewriter-effect';
// import Navbar from '../navbar/Navbar'
import config from '../../config';
import profile from '../../images/logo3.svg';
import linkedin from '../../images/enter.png';
import leaf from '../../images/leaf3.gif';
import cutleaf from '../../images/cutleaf.gif';

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
            안녕하세요 <span className="name">devtree</span> 입니다.
            <span className="wave-emoji" role="img" aria-label="waving hand">
              👋
            </span>
          </h1>
          <h1 className="greeting-text">
            <Typewriter
              options={{
                strings: [
                  '멘토링을 통해 더 나아가 보세요!',
                  '스터디와 프로젝트를 통해 성장을 이룩하세요!'
                ],
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
      <div style={{ backgroundColor: 'rgb(226, 253, 220)' }}>
        <img
          className="imgs"
          style={{ marginLeft: '18px', display: '-ms-grid' }}
          src={leaf}
          alt="Linkedin Logo"
        />
      </div>
      {/* <div style={{ backgroundColor: 'rgb(242, 255, 239)' }}>
        <img
          className="imgs"
          style={{ marginLeft: '18px', display: '-ms-grid' }}
          src={leaf}
          alt="Linkedin Logo"
        />
        <img className="imgs" style={{ marginLeft: '80%' }} src={leaf} alt="Linkedin Logo" />
      </div> */}
    </div>
  );
};

export default Home;
