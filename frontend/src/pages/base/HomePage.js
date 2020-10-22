import React from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="home-template">
      <div className="neon">설레임</div>
      <div className="flux">방정식</div>
      <div className="buttons">
        <Link className="btn btn-light home-login-button" to="/login">로그인</Link>
        <Link className="btn btn-light home-signup-button" to="/signup">회원가입</Link>
      </div>
    </div>
  );
};

export default HomePage;