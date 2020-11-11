import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// CSS
import './HeaderComp.css';
// import { Button } from 'react-bootstrap';

// Cookie
import { useCookies } from 'react-cookie';

// History
import { useHistory } from "react-router-dom";

// Axios
import axios from 'axios';

// Profile(임시)
import ProfileImage from '../../assets/profile/profile-image.png';

import HeaderLogo from '../../assets/logos/HeaderLogo.png';

const HeaderComp = () => {
  const history = useHistory();

  const [cookies, setCookie, removeCookie] = useCookies(['accessToken']);

  const [nickname, setNickname] = useState('');
  const [image, setImage] = useState('');

  const config = {
    headers: {
      'Authorization': 'Bearer ' + cookies.accessToken
    }
  }
  useEffect(() => {
    axios.get('/my-profile', config)
      .then((response) => {
        setNickname(response.data.nickname)
        setImage(response.data.image)
      })
  }, [nickname, image])

  const logout = e => {
    removeCookie('accessToken');
    history.push('/')
    alert('로그아웃 되었습니다.')
  }

  const goBack = () => {
    history.goBack(1);
  }

  return (
    <React.Fragment>
      {/* <div className="navbar">
        <div>
          <i className="fas fa-chevron-left back-button" onClick={goBack}></i>
            <img onClick={() => history.push('/profile')} className="profile-image" src={ProfileImage} />
            <small onClick={() => history.push('/profile')} >{nickname}</small>
        </div>
        <small onClick={logout}>로그아웃</small>
      </div> */}
      <div className="container">
      
      <div className="header-top"></div>
      <div className="header-top-upper"></div>
      <div style={{display:"flex", justifyContent:"center"}}>
        <div class='box'>

          <div className="light-box" style={{display:'flex', flexDirection:'column', alignItems:"center",}}>
            <div class='bulb-wire bulb-one'>
              <div className="bulb-light"><i class="far fa-lightbulb"></i></div>
              <div class='bulb-glow'></div>
            </div>
            <Link to="/question" style={{color:"black", textDecoration:"none"}}> 
              <div style={{marginTop:"25px",}} className="hide-menu">
                시험지
              </div>
            </Link>
           
          </div>
            
          <div style={{display:'flex', flexDirection:'column', alignItems:"center", }}>
            <div class='bulb-wire bulb-two'>
              <div className="bulb-light"><i class="far fa-lightbulb"></i></div>
              <div class='bulb-glow'></div>
            </div>
            <div style={{marginTop:"25px"}} >
              <Link to="/conversation" style={{color:"black", textDecoration:"none"}}>채팅</Link>
            </div>
          </div>

          <div className="center-logo">
            <Link to="/main" style={{color:"black", textDecoration:"none"}}>
              <img className="header-logo" src={HeaderLogo} />
            </Link>
          </div>  

          <div style={{display:'flex', flexDirection:'column', alignItems:"center", }}>
            <div class='bulb-wire bulb-two'>
              <div className="bulb-light"><i class="far fa-lightbulb"></i></div>
              <div class='bulb-glow'></div>
            </div>
            <div style={{marginTop:"25px"}}>
              <Link to="/post/list" style={{color:"black", textDecoration:"none"}}>피드</Link>
            </div>
          </div>

          <div style={{display:'flex', flexDirection:'column', alignItems:"center"}}>
            <div class='bulb-wire bulb-one'>
              <div className="bulb-light"><i class="far fa-lightbulb"></i></div>
              <div class='bulb-glow'></div>
            </div>
            <div style={{marginTop:"25px"}}>
              <Link to="/profile" style={{color:"black", textDecoration:"none"}}>프로필</Link>
            </div>
          </div>

          </div>        
        </div>

      {/* <div className="lights">
        <div className="light-one">
          <div className="light-one-bar"></div>
          <div><i class="far fa-lightbulb"></i></div>
        </div>
        
        <div className="light-two-bar"></div>
        <div className="center-logo"></div>
        <div className="light-two-bar"></div>
        <div className="light-one-bar"></div>
      </div> */}

      {/* <div style={{display:"flex", justifyContent:"center"}}>
        <div class="light-bulbs-title ">
          <div class="header-side"></div>
          <div class="hide">시험지</div>
          <div class="header-two">채팅 </div>
          <div class="header-two">로고 </div>
          <div class="header-three">피드</div>
          <div class="header-four">마이페이지</div>
          <div class="header-side"></div>
        </div>
      </div> */}

      {/* <section class="light-bulbs">
        <div class="myDIV">
            <div class="light-bulb theme-color-one"></div>
            <div class="light-bulb theme-color-two"></div>
            <div class="light-bulb theme-color-three"></div>
            <div class="light-bulb theme-color-four"></div>
            <div class="light-bulb theme-color-five"></div>
            <div class="light-bulb theme-color-one"></div>
        </div>
      </section>
      <section class="light-bulbs-title ">
        <div class="header-side"></div>
        <div class="hide">시험지</div>
        <div class="header-two">채팅 </div>
        <div class="header-three">피드</div>
        <div class="header-four">마이페이지</div>
        <div class="header-side"></div>
      </section>

      <div class="myDIV">
        <div class="light-bulb theme-color-one"></div>
        <div class="light-bulb theme-color-two"></div>  
        <div class="light-bulb theme-color-three"></div>
        <div class="light-bulb theme-color-four"></div>
        <div class="light-bulb theme-color-five"></div>
        <div class="light-bulb theme-color-one"></div>    
      </div>
        <div class="header-one">시험지</div>
        <div class="header-two">채팅 </div>
        <div class="header-three">피드</div>
        <div class="header-four">마이페이지</div>
        <div class="header-side"></div> */}
        </div>
    </React.Fragment>
  );
}

export default HeaderComp;