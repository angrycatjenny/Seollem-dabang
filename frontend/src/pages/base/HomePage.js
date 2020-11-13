import React from 'react';
import ReactFullpage from '@fullpage/react-fullpage';
import HomeSection1 from '../../assets/home/HomeSection1.JPG';
import HomeSection2 from '../../assets/home/HomeSection2.png';
import HomeSection3 from '../../assets/home/HomeSection3.png';
import HomeSection4 from '../../assets/home/HomeSection4.png';
import HomeSection5 from '../../assets/home/HomeSection5.png';
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
            <div><Link to="/login" className="home-link text-decoration-none">시작하기</Link></div>
            <img className="home-scroll-down" src={ScrollDown} />
          </div>
          <div className="section home-section2">
            <div className="home-padding d-flex justify-content-between m-auto">
              <div className="">
                <img className="home-section2-image" src={HomeSection2} />
                <img className="home-scroll-down" src={ScrollDown} />
              </div>
              <div className="home-margin">
                <h1 className="home-h1">시작</h1>
                <h5>좋은 사람 있으면 소개시켜줘</h5>
                <h5>진심으로 나만을 사랑할 수 있는 </h5>
                <h5>성숙하고 성실한 사람이라면 좋겠어</h5>
                <small>조이의 [좋은 사람 있으면 소개시켜줘] 中에서...</small>
              </div>
            </div>
          </div>
          <div className="section home-section3">
            <div className="home-padding d-flex justify-content-between m-auto">
              <div className="">
                <img className="home-section3-image" src={HomeSection3} />
                <img className="home-scroll-down" src={ScrollDown} />
              </div>
              <div className="home-margin">
                <h1 className="home-h1">만남</h1>
                <h5>처음 알았다고 했어.</h5>
                <h5>부와 명예의 가치가 사랑의 가치보다</h5>
                <h5>한참 아래쪽에 있다는 걸...</h5>
                <small>드라마 [멜로가 체질] 中에서...</small>
              </div>
            </div>
          </div>
          <div className="section home-section4">
            <div className="home-padding d-flex justify-content-between m-auto">
              <div className="">
                <img className="home-section4-image" src={HomeSection4} />
                <img className="home-scroll-down" src={ScrollDown} />
              </div>
              <div className="home-margin">
                <h1 className="home-h1">관심</h1>
                <h5>내가 그의 이름을 불러주었을 때,</h5>
                <h5>그는 나에게로 와서 꽃이 되었다.</h5>
                <small>김춘수의 [꽃] 中에서...</small>
              </div>
            </div>
          </div>
          <div className="section home-section5">
            <div className="home-padding d-flex justify-content-between m-auto">
              <div className="">
                <img className="home-section5-image" src={HomeSection5} />
                <img className="home-scroll-down" src={ScrollDown} />
              </div>
              <div className="home-margin">
                <h1 className="home-h1">호감</h1>
                <h5>되게 신기해...</h5>
                <h5>언제 봤다고 오래 본 사람처럼... 편해...</h5>
                <small>영화 [뷰티 인사이드] 中에서...</small>
              </div>
            </div>
          </div>
        </ReactFullpage.Wrapper>
      );
    }}
  />
);

export default HomePage;