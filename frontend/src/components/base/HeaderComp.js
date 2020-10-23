import React from 'react';
import './HeaderComp.css';
import ProfileImage from '../../assets/profile/profile-image.png';

const HeaderComp = () => {
  return (
    <div className="navbar">
      <div>
        <img className="profile-image" src={ProfileImage} />
        <small>이한솔</small>
      </div>
      <small>로그아웃</small>
    </div>
  );
}

export default HeaderComp;