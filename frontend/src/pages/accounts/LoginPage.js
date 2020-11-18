import React, { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import './LoginPage.scss';

const LoginPage = () => {
  const history = useHistory();
  const [ cookies, setCookie ] = useCookies([ 'accessToken' ]);
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  
  const setEmailInfo = e => {
    setEmail(e.target.value)
  };
  const setPasswordInfo = e => {
    setPassword(e.target.value)
  };
  const sendLoginData = e => {
    e.preventDefault()
    const loginData = { email, password }
    axios.post('/api/login', loginData)
      .then((response) => {
        setCookie('accessToken', response.data.accessToken)
        history.push('/main')
        alert('로그인이 되었습니다.')
      })
      .catch((error) => {
        console.log(error)
        alert('로그인 정보를 확인해주세요.')
      })
  };

  return (
    <div className="login-template">
      <div className="login-box">
        <h4 className="login-title">설 렘 다 방</h4>
        <form onSubmit={sendLoginData} className="login-form">
          <input className="login-inputs" placeholder="이메일" email={email} onChange={setEmailInfo} />
          <input type="password" className="login-inputs" placeholder="비밀번호" password={password} onChange={setPasswordInfo} />
          <div className="login-footer">
            <small className="login-footer-title">아직 회원이 아니신가요?</small>
            <Link to="/signup" className="login-footer-link">회원가입</Link>
          </div>
          <button  className="login-button" type="submit">로그인</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;