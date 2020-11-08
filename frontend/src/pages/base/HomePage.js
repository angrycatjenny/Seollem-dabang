import React from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom';
import ReactFullpage from '@fullpage/react-fullpage';

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
          <div className="section">
            <div className="home-template">
              <div>
                <div className="neon">설레임</div>
                <div className="flux">방정식</div>
              </div>
              <div className="Buttons">
                <Link className="btn btn-light home-login-button" to="/login">로그인</Link>
                <Link className="btn btn-light home-signup-button" to="/signup">회원가입</Link>
              </div>
            </div>
            {/* <button onClick={() => fullpageApi.moveSectionDown()}>
              Click me to move down
          </button> */}
          </div>
          <div className="section">
            <p>Section 2</p>
          </div>
          <div className="section">
            <p>Section 3</p>
          </div>
          <div className="section">
            <p>Section 4</p>
          </div>
        </ReactFullpage.Wrapper>
      );
    }}
  />
);
export default HomePage;