import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import HomeLogo from '../../assets/logos/home-logo.png'

const HomeTemplate = styled.div`
  margin-top: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HomePage = () => {
  return (
    <HomeTemplate>
      <img src={HomeLogo} className="w-25"/>
      <h1 className="mt-3">프로젝트 이름</h1>
      <small>프로젝트 소개</small>
      <div className="d-flex flex-column w-75 mt-5">
        <a href="/login" className="btn btn-primary">로그인</a>
        <a href="/signup" className="btn btn-secondary mt-2">회원가입</a>
      </div>
    </HomeTemplate>
  );
};

export default HomePage;