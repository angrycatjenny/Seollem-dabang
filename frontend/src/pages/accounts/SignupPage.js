import React, { useState } from 'react';
import HeaderComp from '../../components/base/HeaderComp';
import axios from 'axios';
import './signupPage.css';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { ReactMic } from 'react-mic';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import TextField from '@material-ui/core/TextField';

const locations = [ '서울', '경기', '인천', '강원', '대전', '세종', '충남', '충북', '부산', '울산', '경남', '경북', '대구', '전남', '전북', '제주', '광주' ];
const genders = [ '남자', '여자' ]

const SignupPage = ({ history }) => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ passwordconfirm, setPasswordconfirm ] = useState('');
  const [ nickname, setNickname ] = useState('');
  const [ gender, setGender ] = useState('');
  const [ age, setAge ] = useState('');
  const [ location, setLocation ] = useState('');
  const [ image, setImage ] = useState('');
  const [ record, setRecord ] = useState(false);
  const [ voice, setVoice ] = useState('');
  const [ voiceurl, setVoiceurl ] = useState('');

  const setEmailText = e => {setEmail(e.target.value)};
  const setPasswordText = e => {setPassword(e.target.value)};
  const setPasswordconfirmText = e => {setPasswordconfirm(e.target.value)};
  const setNicknameText = e => {setNickname(e.target.value)};
  const setGenderText = e => {setGender(e.target.value)};
  const setAgeText = e => {setAge(e.target.value)};
  const setLocationText = e => {setLocation(e.target.value)};
  const setImageText = e => {setImage(e.target.value)};
  const startRecording = () => {setRecord(true)};
  const stopRecording = () => {setRecord(false)};

  const onStop = (recordedBlob) => {
    console.log(recordedBlob)
    setVoice(recordedBlob.blob)
    setVoiceurl(recordedBlob.blobURL)
  }

  const sendSignupData = e => {
    e.preventDefault();
    
    if (password === passwordconfirm) {
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
      <h1 className="signup-logo">회원가입</h1>
      <form onSubmit={sendSignupData} className="signup-form">
        <input className="signup-input" placeholder="이메일" email={email} onChange={setEmailText} />
        <input className="signup-input" placeholder="비밀번호" password={password} onChange={setPasswordText} />
        <input className="signup-input" placeholder="비밀번호 확인" passwordconfirm={passwordconfirm} onChange={setPasswordconfirmText} />
        <input className="signup-input" placeholder="닉네임" nickname={nickname} onChange={setNicknameText} />

        <FormControl>
          <InputLabel id="demo-mutiple-name-label1">성별</InputLabel>
          <Select
            labelId="demo-mutiple-name-label1"
            id="demo-mutiple-name1"
            value={gender}
            onChange={setGenderText}
            input={<Input />}
          >
            {genders.map((gender) => (
              <MenuItem key={gender} value={gender}>
                {gender}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <TextField
            id="date"
            label="생년월일"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            age={age}
            onChange={setAgeText}
          />
        </FormControl>

        <FormControl>
          <InputLabel id="demo-mutiple-name-label">지역</InputLabel>
          <Select
            labelId="demo-mutiple-name-label"
            id="demo-mutiple-name"
            value={location}
            onChange={setLocationText}
            input={<Input />}
          >
            {locations.map((location) => (
              <MenuItem key={location} value={location}>
                {location}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Input
          className="signup-input"
          placeholder="프로필 사진"
          type="file"
          onChange={setImageText}
        />

        <div>
          <ReactMic
            record={record}
            className="sound-wave w-100"
            onStop={onStop}
            strokeColor="black"
            backgroundColor="white" />
          <div>
            <button onClick={startRecording} type="button">녹음시작</button>
            <button onClick={stopRecording} type="button">녹음종료</button>
          </div>
        </div>

        <AudioPlayer
          src={voiceurl}
          showJumpControls={false}
          customVolumeControls={[]}
          customAdditionalControls={[]}
        />
  
        <div className="signup-footer">
          <small>이미 회원이신가요?</small>
          <a href="/login">로그인</a>
        </div>
        <button className="signup-button" type="submit">회원가입</button>
      </form>
    </div>
  );
};

export default SignupPage;