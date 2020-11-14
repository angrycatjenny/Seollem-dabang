import React from 'react';
import ReactFullpage from '@fullpage/react-fullpage';
import HomeSection1 from '../../assets/home/HomeSection1.JPG';
import HomeSection2 from '../../assets/home/HomeSection2.JPG';
import HomeSection3 from '../../assets/home/HomeSection3.JPG';
import HomeSection4 from '../../assets/home/HomeSection4.JPG';
import ScrollDown from '../../assets/home/ScrollDown.png';
import ScrollStop from '../../assets/home/ScrollStop.png';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => (
  <ReactFullpage
    licenseKey={'YOUR_KEY_HERE'}
    scrollingSpeed={1000}
    scrollHorizontally={true}
    scrollHorizontallyKey={'YOUR KEY HERE'}

    render={() => {
      return (
        <ReactFullpage.Wrapper>
          <div className="section home-section1">
            <img className="home-section1-image" src={HomeSection1} />
            <div><Link to="/api/login" className="home-link text-decoration-none">시작하기</Link></div>
            <img className="home-scroll-down" src={ScrollDown} />
          </div>
          <div className="section home-section2">
            <img className="home-section2-image" src={HomeSection2} />
            <img className="home-scroll-down" src={ScrollDown} />
          </div>
          <div className="section home-section3">
            <img className="home-section3-image" src={HomeSection3} />
            <img className="home-scroll-down" src={ScrollDown} />
          </div>
          <div className="section home-section4">
            <img className="home-section4-image" src={HomeSection4} />
            <img className="home-scroll-down" src={ScrollStop} />
          </div>
        </ReactFullpage.Wrapper>
      );
    }}
  />
);

export default HomePage;