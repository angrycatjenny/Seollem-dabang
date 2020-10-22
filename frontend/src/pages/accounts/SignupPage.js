import React, { useState } from 'react';
import HeaderComp from '../../components/base/HeaderComp';
import axios from 'axios';

const SignupPage = ({ history }) => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ passwordConf, setPasswordConf ] = useState('');
  const [ nickname, setNickname ] = useState('');
  const [ gender, setGender ] = useState('');
  const [ age, setAge ] = useState('');
  const [ location, setLocation ] = useState('');
  const [ image, setImage ] = useState('');
  const [ voice, setVoice ] = useState('');

  const setEmailText = e => {setEmail(e.target.value)};
  const setPasswordText = e => {setPassword(e.target.value)};
  const setPasswordConfText = e => {setPasswordConf(e.target.value)};
  const setNicknameText = e => {setNickname(e.target.value)};
  const setGenderText = e => {setGender(e.target.value)};
  const setAgeText = e => {setAge(e.target.value)};
  const setLocationText = e => {setLocation(e.target.value)};
  const setImageText = e => {setImage(e.target.value)};
  const setVoiceText = e => {setVoice(e.target.value)};

  const sendSignupData = e => {
    e.preventDefault();
    if (password === passwordConf) {
      const signupData = { email, password, nickname, gender, age, location, image, voice };
      console.log(signupData, '회원가입 정보')
      axios.post('/signup/', signupData)
        .then(() => {
          console.log('회원가입 성공')
          history.push('/login')
        })
        .catch((error) => console.log(error))
    } else {
      alert('비밀번호를 확인하세요.')
    }
  };

  return (
    <div>
      <HeaderComp />
      <h1>회원가입</h1>
      <div className="w-25">
        <form onSubmit={sendSignupData} className="d-flex flex-column">
          <input placeholder="이메일" email={email} onChange={setEmailText} />
          <input placeholder="비밀번호" password={password} onChange={setPasswordText} />
          <input placeholder="비밀번호 확인" passwordConf={passwordConf} onChange={setPasswordConfText} />
          <input placeholder="닉네임" nickname={nickname} onChange={setNicknameText} />
          <input placeholder="성별" gender={gender} onChange={setGenderText} />
          <input placeholder="나이" age={age} onChange={setAgeText} />
          <input placeholder="지역" location={location} onChange={setLocationText} />
          <input placeholder="프로필 사진" image={image} onChange={setImageText} />
          <input placeholder="사용자 소개 음성" voice={voice} onChange={setVoiceText} />
          <button type="submit">회원가입</button>
        </form>
      </div>
      <small>이미 회원이신가요?</small>
      <a href="/login">로그인</a>
    </div>
  );
};

export default SignupPage;