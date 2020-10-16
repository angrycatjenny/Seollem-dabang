import React, { useState } from 'react';
import axios from '../../../node_modules/axios/index';

const SignupPage = () => {
  const [ username, setUsername ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password1, setPassword1 ] = useState('');
  const [ password2, setPassword2 ] = useState('');

  const setUsernameText = e => {
    setUsername(e.target.value);
  };
  const setEmailText = e => {
    setEmail(e.target.value);
  };
  const setPasswordText1 = e => {
    setPassword1(e.target.value);
  };
  const setPasswordText2 = e => {
    setPassword2(e.target.value);
  };

  const sendSignupData = e => {
    e.preventDefault();
    const signupData = {username, email, password1, password2};
    console.log(signupData, '회원가입 정보')
    axios.post('/rest-auth/signup/', signupData)
      .then(console.log('회원가입 성공'))
      .catch((error) => console.log(error))
  };

  return (
    <div>
      <h1>회원가입</h1>
      <div className="w-25">
        <form onSubmit={sendSignupData} className="d-flex flex-column">
          <input placeholder="이름" username={username} onChange={setUsernameText} />
          <input placeholder="이메일" email={email} onChange={setEmailText} />
          <input placeholder="비밀번호" password1={password1} onChange={setPasswordText1} />
          <input placeholder="비밀번호" password2={password2} onChange={setPasswordText2} />
          <button type="submit">회원가입</button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;