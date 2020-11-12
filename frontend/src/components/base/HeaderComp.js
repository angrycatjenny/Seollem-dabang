import React from 'react';
import { Link } from 'react-router-dom';
import './HeaderComp.css';

const HeaderComp = () => {
  return (
    <div>
      <div className="header-top">
        <Link to="/main" style={{color:"black", textDecoration:"none"}}>
          <h2 className="text-center pt-3">설 렘 다 방</h2>
        </Link>
      </div>
      <div className="header-top-under"></div>
      <div style={{display:"flex", justifyContent:"center"}}>
        <div class='box'>
          <div className="light-box" style={{display:'flex', flexDirection:'column', alignItems:"center",}}>
            <div class='bulb-wire bulb-one'>
              <div className="bulb-light"><i class="far fa-lightbulb"></i></div>
              <div class='bulb-glow'></div>
            </div>
            <Link to="/profile" style={{color:"black", textDecoration:"none"}}> 
              <div style={{marginTop:"25px",}} className="hide-menu">
                내 정보
              </div>
            </Link>
          </div> 
          <div style={{display:'flex', flexDirection:'column', alignItems:"center", }}>
            <div class='bulb-wire bulb-two'>
              <div className="bulb-light"><i class="far fa-lightbulb"></i></div>
              <div class='bulb-glow'></div>
            </div>
            <div style={{marginTop:"25px"}} >
              <Link to="/question" style={{color:"black", textDecoration:"none"}}>나만의 레시피</Link>
            </div>
          </div>
          <div style={{display:'flex', flexDirection:'column', alignItems:"center", }}>
            <div class='bulb-wire bulb-two'>
              <div className="bulb-light"><i class="far fa-lightbulb"></i></div>
              <div class='bulb-glow'></div>
            </div>
            <div style={{marginTop:"25px"}}>
              <Link to="/conversation" style={{color:"black", textDecoration:"none"}}>대화 목록</Link>
            </div>
          </div>
          <div style={{display:'flex', flexDirection:'column', alignItems:"center"}}>
            <div class='bulb-wire bulb-one'>
              <div className="bulb-light"><i class="far fa-lightbulb"></i></div>
              <div class='bulb-glow'></div>
            </div>
            <div style={{marginTop:"25px"}}>
              <Link to="/post/list" style={{color:"black", textDecoration:"none"}}>피드</Link>
            </div>
          </div>
        </div>        
      </div>
    </div>
  );
}

export default HeaderComp;