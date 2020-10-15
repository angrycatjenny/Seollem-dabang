import React, { useState } from 'react';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const setUsernameText = e => {
    setUsername(e.target.value);
  };
  const setEmailText = e => {
    setEmail(e.target.value);
  };
  const setPasswordText = e => {
    setPassword(e.target.value);
  };
  const saveSignup = e => {
    e.preventDefault();
    console.log(username, email, password, '회원가입 정보')
  };

  return (
    <div>
      <h1>회원가입</h1>
      <form onSubmit={saveSignup}>
        <input placeholder="이름" username={username} onChange={setUsernameText} />
        <input placeholder="이메일" email={email} onChange={setEmailText} />
        <input placeholder="비밀번호" password={password} onChange={setPasswordText} />
        <button type="submit">저장</button>
      </form>
    </div>
  );
};

export default SignupPage;