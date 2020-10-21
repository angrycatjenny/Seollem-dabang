import React from 'react';
import styled from 'styled-components';
import './HomePage.css';

const HomeTemplate = styled.div`
  margin-top: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HomePage = () => {
  return (
    <HomeTemplate>
      <div className="neon">설레임</div>
      <div className="flux">방정식</div>
      <div className="d-flex flex-column w-75 mt-5">
        <a href="/login" className="btn btn-primary">로그인</a>
        <a href="/signup" className="btn btn-secondary mt-2">회원가입</a>
      </div>
    </HomeTemplate>
  );
};

export default HomePage;