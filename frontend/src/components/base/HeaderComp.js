import React from 'react';
import { Link } from 'react-router-dom';
import './HeaderComp.css';

const HeaderComp = () => {
  return (
    <div className="container">
      <div className="header-top">
        <Link to="/main" style={{color:"black", textDecoration:"none"}}>
          <h4 className="text-center pt-2">설 렘 다 방</h4>
        </Link>
      </div>
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
    </div>
  );
}

export default HeaderComp;