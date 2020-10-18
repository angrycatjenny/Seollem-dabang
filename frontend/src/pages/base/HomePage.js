import React from 'react';

const HomePage = () => {
  return (
    <div>
      <h1>홈 페이지</h1>
      <div className="d-flex flex-column w-75">
        <a href="/login" className="btn btn-primary">로그인</a>
        <a href="/signup" className="btn btn-secondary">회원가입</a>
      </div>
    </div>
  );
};

export default HomePage;