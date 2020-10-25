import React from 'react';
import './HeaderComp.css';
import ProfileImage from '../../assets/profile/profile-image.png';
import { useCookies } from 'react-cookie';
import { useHistory } from "react-router-dom";

const HeaderComp = () => {
  const history = useHistory();

  const [ cookies, setCookie, removeCookie ] = useCookies(['accessToken']);

  const logout = e => {
    console.log('쿠키삭제')
    removeCookie('accessToken');
    history.push('/')
  }

  return (
    <div className="navbar">
      <div>
        <img className="profile-image" src={ProfileImage} />
        <small>{cookies.accessToken}</small>
      </div>
      <button onClick={logout}>로그아웃</button>
    </div>
  );
}

export default HeaderComp;