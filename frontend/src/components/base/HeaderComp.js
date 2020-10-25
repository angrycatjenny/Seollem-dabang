import React from 'react';
import './HeaderComp.css';
import ProfileImage from '../../assets/profile/profile-image.png';
import { useCookies } from 'react-cookie';

const HeaderComp = () => {
  const [ cookies, setCookie, removeCookie ] = useCookies(['access-token']);
  
  const logout = e => {
    console.log('쿠키삭제')
    removeCookie('access-token');
  }

  return (
    <div className="navbar">
      <div>
        <img className="profile-image" src={ProfileImage} />
        <small>이한솔</small>
      </div>
      <button onClick={logout}>로그아웃</button>
    </div>
  );
}

export default HeaderComp;