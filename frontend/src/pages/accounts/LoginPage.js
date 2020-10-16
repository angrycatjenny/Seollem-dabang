import React, { useState } from 'react';
import axios from '../../../node_modules/axios/index';

const LoginPage = () => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const setEmailText = e => {
    setEmail(e.target.value);
  };
  const setPasswordText = e => {
    setPassword(e.target.value);
  };

  const sendLoginData = e => {
    e.preventDefault();
    const loginData = [email, password]
    console.log(loginData, '로그인 정보')
    axios.post('/login', loginData)
      .then(console.log('로그인 성공'))
      .catch((error) => console.log(error))
  };

  return (
    <div>
      <h1>로그인</h1>
      <div className="w-25">
        <form onSubmit={sendLoginData} className="d-flex flex-column">
          <input placeholder="이메일" email={email} onChange={setEmailText} />
          <input placeholder="비밀번호" password={password} onChange={setPasswordText} />
          <button type="submit">로그인</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;