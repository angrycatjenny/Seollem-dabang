import React, { useState } from 'react';
import HeaderComp from '../../components/base/HeaderComp';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import './LoginPage.css';

const LoginPage = ({ history }) => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  
  const [cookies, setCookie] = useCookies(['accessToken']);

  const setEmailText = e => {setEmail(e.target.value)};
  const setPasswordText = e => {setPassword(e.target.value)};

  const sendLoginData = e => {
    e.preventDefault()
    const loginData = { email, password }
    console.log(loginData, '로그인 정보')
    axios.post('/login', loginData)
      .then((response) => {
        setCookie('accessToken', response.data.accessToken)
        history.push('/main')
        console.log('로그인 성공', response)
      })
      .catch((error) => console.log(error))
  };

  return (
    <div>
      <HeaderComp />
      <h1 className="login-header">로그인</h1>
      <form onSubmit={sendLoginData} className="login-form">
        <input className="login-input" placeholder="이메일" email={email} onChange={setEmailText} />
        <input type="password" className="login-input" placeholder="비밀번호" password={password} onChange={setPasswordText} />
        <div className="login-footer">
          <small>아직 회원이 아니신가요?</small>
          <a href="/signup">회원가입</a>
        </div>
        <button className="login-button" type="submit">로그인</button>
      </form>
    </div>
  );
};

export default LoginPage;