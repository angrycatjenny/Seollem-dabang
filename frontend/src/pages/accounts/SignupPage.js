import React, { useState } from 'react';
import HeaderComp from '../../components/base/HeaderComp';
import axios from 'axios';

const SignupPage = ({ history }) => {
  // 기본 정보
  const [ username, setUsername ] = useState('');             // 이름
  const [ email, setEmail ] = useState('');                   // 이메일
  const [ password1, setPassword1 ] = useState('');           // 비밀번호1
  const [ password2, setPassword2 ] = useState('');           // 비밀번호2

  // 추가 정보
  const [ image, setImage ] = useState('');                   // 프로필 사진
  const [ nickname, setNickname ] = useState('');             // 닉네임
  const [ university, setUniversity ] = useState('');         // 학교
  const [ major, setMajor] = useState('');                    // 전공
  const [ job, setJob ] = useState('');                       // 직업
  const [ work, setWork ] = useState('');                     // 직장
  const [ birth, setBirth ] = useState('');                   // 생년월일
  const [ height, setHeight ] = useState('');                 // 키
  const [ weight, setWeight ] = useState('');                 // 체형
  const [ personality, setPersonality ] = useState('');       // 성격
  const [ bloodType, setBloodType ] = useState('');           // 혈액형
  const [ smoking, setSmoking ] = useState('');               // 흡연여부
  const [ religion, setReligion ] = useState('');             // 종교

  // 기본 정보
  const setUsernameText = e => {setUsername(e.target.value)};       // 이름
  const setEmailText = e => {setEmail(e.target.value)};             // 이메일
  const setPasswordText1 = e => {setPassword1(e.target.value)};     // 비밀번호1
  const setPasswordText2 = e => {setPassword2(e.target.value)};     // 비밀번호2

  // 추가 정보
  const setImageText = e => {setImage(e.target.value)};             // 프로필 사진
  const setNicknameText = e => {setNickname(e.target.value)};       // 닉네임
  const setUniversityText = e => {setUniversity(e.target.value)};   // 학교
  const setMajorText = e => {setMajor(e.target.value)};             // 전공
  const setJobText = e => {setJob(e.target.value)};                 // 직업
  const setWorkText = e => {setWork(e.target.value)};               // 직장
  const setBirthText = e => {setBirth(e.target.value)};             // 생년월일
  const setHeightText = e => {setHeight(e.target.value)};           // 키
  const setWeightText = e => {setWeight(e.target.value)};           // 체형
  const setPersonalityText = e => {setPersonality(e.target.value)}; // 성격
  const setBloodTypeText = e => {setBloodType(e.target.value)};     // 혈액형
  const setSmokingText = e => {setSmoking(e.target.value)};         // 흡연여부
  const setReligionText = e => {setReligion(e.target.value)};       // 종교

  const sendSignupData = e => {
    e.preventDefault();
    const signupData = {username, email, password1, password2};
    console.log(signupData, '회원가입 정보')
    axios.post('/rest-auth/signup/', signupData)
      .then(() => {
        console.log('회원가입 성공')
        history.push('/login')
      })
      .catch((error) => console.log(error))
  };

  return (
    <div>
      <HeaderComp />
      <h1>회원가입</h1>
      <div className="w-25">
        <form onSubmit={sendSignupData} className="d-flex flex-column">

          {/* 기본정보 */}
          <input placeholder="이름" username={username} onChange={setUsernameText} />
          <input placeholder="이메일" email={email} onChange={setEmailText} />
          <input placeholder="비밀번호" password1={password1} onChange={setPasswordText1} />
          <input placeholder="비밀번호" password2={password2} onChange={setPasswordText2} />

          {/* 추가정보 */}
          <input placeholder="프로필 사진" image={image} onChange={setImageText} />
          <input placeholder="닉네임" nickname={nickname} onChange={setNicknameText} />
          <input placeholder="학교" university={university} onChange={setUniversityText} />
          <input placeholder="전공" major={major} onChange={setMajorText} />
          <input placeholder="직업" job={job} onChange={setJobText} />
          <input placeholder="직장" work={work} onChange={setWorkText} />
          <input placeholder="생년월일" birth={birth} onChange={setBirthText} />
          <input placeholder="키" height={height} onChange={setHeightText} />
          <input placeholder="체형" weight={weight} onChange={setWeightText} />
          <input placeholder="성격" personality={personality} onChange={setPersonalityText} />
          <input placeholder="혈액형" bloodType={bloodType} onChange={setBloodTypeText} />
          <input placeholder="흡연여부" smoking={smoking} onChange={setSmokingText} />
          <input placeholder="종교" religion={religion} onChange={setReligionText} />
          <button type="submit">회원가입</button>
        </form>
      </div>
      <small>이미 회원이신가요?</small>
      <a href="/login">로그인</a>
    </div>
  );
};

export default SignupPage;