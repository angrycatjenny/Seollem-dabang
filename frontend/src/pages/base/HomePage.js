import React from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="home-template">
      <div class="sign">
        <span class="fast-flicker">설</span>레임<span class="flicker">방</span>정식
      </div>
      <div className="buttons">
        <Link className="btn btn-light home-login-button" to="/login">로그인</Link>
        <Link className="btn btn-light home-signup-button" to="/signup">회원가입</Link>
      </div>
    </div>
  );
};

export default HomePage;