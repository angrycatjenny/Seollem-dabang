import React from 'react';
import { useCookies } from 'react-cookie';
import { useHistory } from "react-router-dom";
import FooterPic2 from '../../assets/footer/FooterPic2.png';
import FooterFlower1 from '../../assets/footer/FooterFlower1.png';
import FooterFlower2 from '../../assets/footer/FooterFlower2.png';
import FooterLamp from '../../assets/footer/FooterLamp.png';
import FooterPic1 from '../../assets/footer/FooterPic1.png';
import './FooterComp.css';

const FooterComp = () => {
  const history = useHistory();

  const [ cookies, setCookie, removeCookie ] = useCookies(['accessToken']);
  const [ ucookies, setUcookie, removeUcookie ] = useCookies(['user']);

  const logout = e => {
    removeCookie('accessToken');
    removeUcookie('user');
    history.push('/')
    alert('로그아웃 되었습니다.')
  }

  return (
    <div className="fixed-bottom">
      <img className="footer-lamp" src={FooterLamp} />
      <img className="footer-flower1" src={FooterFlower1} />
      <div className="footer-left"></div>
      <div className="footer-right"></div>
      <img className="footer-pic1" src={FooterPic1} />
      <div className="footer-logout d-flex flex-column">
        
        <div className="ml-1" 
        onClick={logout}>
          <button className="logout-button" >로그아웃</button>
        </div>

        <div className="d-flex">
          <img className="footer-pic2" src={FooterPic2} />
          <img className="footer-flower2" src={FooterFlower2} />
        </div>
      </div>
      <div className="footer-inner"></div>
    </div>
  );
};

export default FooterComp;