import React from 'react';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-template">
      <div className="neon">설레임</div>
      <div className="flux">방정식</div>
      <div className="buttons">
        <a href="/login"><button className="login-button">로그인</button></a>
        <a href="/signup"><button className="signup-button">회원가입</button></a>
      </div>
    </div>
  );
};

export default HomePage;