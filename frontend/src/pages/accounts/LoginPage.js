import React, { useState } from 'react';

const LoginPage = () => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const setEmailText = e => {
    setEmail(e.target.value);
  };
  const setPasswordText = e => {
    setPassword(e.target.value);
  };
  const saveLoginData = e => {
    e.preventDefault();
    console.log(email, password, '로그인 정보')
  }

  return (
    <div>
      <h1>로그인</h1>
      <div className="w-25">
        <form onSubmit={saveLoginData} className="d-flex flex-column">
          <input placeholder="이메일" email={email} onChange={setEmailText} />
          <input placeholder="비밀번호" password={password} onChange={setPasswordText} />
          <button type="submit">로그인</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;