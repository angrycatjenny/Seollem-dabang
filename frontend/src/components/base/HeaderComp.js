import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import './HeaderComp.css';

const HeaderComp = () => {
  const [ cookies, setCookie ] = useCookies(['accessToken']);
  const [ ucookies, setUcookie ] = useCookies(['user']);

  const config = {
    headers: {
      'Authorization': 'Bearer ' + cookies.accessToken
    }
  }
  useEffect(() => {
    axios.get('/my-profile', config)
      .then((response) => {
        setUcookie('user', response.data.id)
      })
      .catch((error) => {
        console.log(error);
      })
  }, [])

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
          <Link to="/profile" style={{color:"black", textDecoration:"none"}}> 
            <div className="light-box" style={{display:'flex', flexDirection:'column', alignItems:"center",}}>
              <div class='bulb-wire bulb-one'>
                <div className="bulb-light"><i class="far fa-lightbulb"></i></div>
                <div class='bulb-glow'></div>
              </div>
                <div style={{marginTop:"25px",}} className="hide-menu">
                  내 정보
                </div>
            </div> 
          </Link>
          <Link to="/question" style={{color:"black", textDecoration:"none"}}>
            <div style={{display:'flex', flexDirection:'column', alignItems:"center", }}>
              <div class='bulb-wire bulb-two'>
                <div className="bulb-light"><i class="far fa-lightbulb"></i></div>
                <div class='bulb-glow'></div>
              </div>
              <div style={{marginTop:"25px"}} >
                  나만의 레시피
              </div>
            </div>
          </Link>

          <Link to="/conversation" style={{color:"black", textDecoration:"none"}}>
            <div style={{display:'flex', flexDirection:'column', alignItems:"center", }}>
              <div class='bulb-wire bulb-two'>
                <div className="bulb-light"><i class="far fa-lightbulb"></i></div>
                <div class='bulb-glow'></div>
              </div>
              <div style={{marginTop:"25px"}}>
                  대화 목록
              </div>
            </div>
          </Link>

          <Link to="/post/list" style={{color:"black", textDecoration:"none"}}>
            <div style={{display:'flex', flexDirection:'column', alignItems:"center"}}>
              <div class='bulb-wire bulb-one'>
                <div className="bulb-light"><i class="far fa-lightbulb"></i></div>
                <div class='bulb-glow'></div>
              </div>
              <div style={{marginTop:"25px"}}>
                  피드
              </div>
            </div>
          </Link>

        </div>        
      </div>
    </div>
  );
}

export default HeaderComp;