import React from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom';
import ReactFullpage from '@fullpage/react-fullpage';
import HomeSection1 from '../../assets/home/HomeSection1.JPG';

const HomePage = () => (
  <ReactFullpage
    //fullpage options
    licenseKey={'YOUR_KEY_HERE'}
    scrollingSpeed={1000} /* Options here */
    scrollHorizontally={true}  /* Because we are using the extension */
    scrollHorizontallyKey={'YOUR KEY HERE'}

    render={({ state, fullpageApi }) => {
      return (
        <ReactFullpage.Wrapper>
          <div className="section home-section1">
            <img className="home-section1-image" src={HomeSection1} />
            <div><Link to="/login" className="home-link text-decoration-none">시작하기</Link></div>
          </div>
          <div className="section home-section2">
            <p>Section 2</p>
          </div>
          <div className="section home-section3">
            <p>Section 3</p>
          </div>
          <div className="section home-section4">
            <p>Section 4</p>
          </div>
        </ReactFullpage.Wrapper>
      );
    }}
  />
);
export default HomePage;
