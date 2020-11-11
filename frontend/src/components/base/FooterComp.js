import React from 'react';
import './FooterComp.css';
import FooterPost from '../../assets/footer/FooterPost.png';
import FooterFlower1 from '../../assets/footer/FooterFlower1.png';
import FooterFlower2 from '../../assets/footer/FooterFlower2.png';
import FooterLamp from '../../assets/footer/FooterLamp.png';

// Cookie
import { useCookies } from 'react-cookie';

// History
import { useHistory } from "react-router-dom";

export default function FooterComp() {
  const history = useHistory();

  const [cookies, setCookie, removeCookie] = useCookies(['accessToken']);

  const logout = e => {
    removeCookie('accessToken');
    history.push('/')
    alert('로그아웃 되었습니다.')
  }

  return (
    <div className="fixed-bottom">
      <img className="footer-lamp" src={FooterLamp} />
      <img className="footer-flower1" src={FooterFlower1} />
      <div className="footer-logout d-flex flex-column">
        <small className="ml-2 logout-button" onClick={logout}>로그아웃</small>
        <div className="d-flex">
        <img className="footer-post" src={FooterPost} />
        <img className="footer-flower2" src={FooterFlower2} />
        </div>
      </div>
      <div className="footer-inner"></div>
    </div>
  );
}
