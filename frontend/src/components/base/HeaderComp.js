import React, { useState, useEffect } from 'react';

// CSS
import './HeaderComp.css';

// Cookie
import { useCookies } from 'react-cookie';

// History
import { useHistory } from "react-router-dom";

// Axios
import axios from 'axios';

// Profile(임시)
import ProfileImage from '../../assets/profile/profile-image.png';

const HeaderComp = () => {
  const history = useHistory();

  const [ cookies, setCookie, removeCookie ] = useCookies(['accessToken']);

  const [ nickname, setNickname ] = useState('');
  const [ image, setImage ] = useState('');
  
  const config = {
    headers: {
      'Authorization': 'Bearer ' + cookies.accessToken
    }
  }
  useEffect(() => {
    axios.get('/profile', config)
      .then((response) => {
        setNickname(response.data.nickname)
        setImage(response.data.image)
      })
  }, [ nickname, image ])

  const logout = e => {
    removeCookie('accessToken');
    history.push('/')
    alert('로그아웃 되었습니다.')
  }

  return (
    <div className="navbar">
      <div>
        <img className="profile-image" src={ProfileImage} />
        <small>{nickname}</small>
      </div>
      <small onClick={logout}>로그아웃</small>
    </div>
  );
}

export default HeaderComp;