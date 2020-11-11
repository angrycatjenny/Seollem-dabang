import React, { useState } from 'react';

// Axios
import axios from 'axios';

// CSS
import './SignupPage.css';

// Audio Record
import { ReactMic } from 'react-mic';

// Audio Player
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

// Material-UI
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';

// Images
import RecordStart from '../../assets/signup/RecordStart.png';
import RecordStop from '../../assets/signup/RecordStop.png';
import RecordDelete from '../../assets/signup/RecordDelete.png';

// History
import { useHistory } from "react-router-dom";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return [
    '기본 정보',
    '사진 입력',
    '목소리 녹음',
  ];
}

const locations = [
  '서울',
  '경기',
  '인천',
  '강원',
  '대전',
  '세종',
  '충남',
  '충북',
  '부산',
  '울산',
  '경남',
  '경북',
  '대구',
  '전남',
  '전북',
  '제주',
  '광주',
];

const genders = [
  "남자",
  "여자",
];

const SignupPage = () => {
  const history = useHistory();
  const year = new Date();

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
  const [ objectURL, setObjectURL ] = useState('');
  const [ imagePush, setImagePush] = useState(false)

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };
  const checkHandle = (k) =>{
    if(k===1){
      if(nickname && email && password && passwordconfirm && location && gender && age){
        if(password === passwordconfirm){
          handleNext()
        }else {
          alert('비밀번호가 일치 하지 않습니다.')
        }
      } else{
        alert('기본 정보를 입력해주세요.')
      }
    }else if(k===2){
      if(image){
        handleNext()
      }else {
        alert('사진을 등록 해 주세요.')
      }
    }
  }
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const setEmailText = e => {
    setEmail(e.target.value);
  };
  const setPasswordText = e => {
    setPassword(e.target.value);
  };
  const setPasswordconfirmText = e => {
    setPasswordconfirm(e.target.value);
  };
  const setNicknameText = e => {
    setNickname(e.target.value);
  };
  const setGenderText = e => {
    if (e.target.value === "남자") {
      setGender('0')
    } else {
      setGender('1')
    }
  };
  const setAgeText = e => {
    setAge(
      (year.getFullYear()
      - (e.target.value[0]
      + e.target.value[1]
      + e.target.value[2]
      + e.target.value[3])
      + 1).toString());
  };
  const setLocationText = e => {
    setLocation(e.target.value);
  };
  const setImageText = e => {
    setImagePush(true)
    setImage(e.target.files[0]);
    setObjectURL (URL.createObjectURL(e.target.files[0]))
  };

  const startRecording = () => {
    setRecord(true);
  };
  const stopRecording = () => {
    setRecord(false)
  };
  const onStop = (recordedBlob) => {
    setVoice(recordedBlob.blob);
    setVoiceurl(recordedBlob.blobURL);
  };
  const removeRecord = () => {
    setVoice('');
    setVoiceurl('');
  };

  const sendSignupData = e => {
    e.preventDefault();
    if (voice) {
      const signupData = new FormData();
      
      const imageFileName = Date.now();
      const voiceFileName = Date.now();

      signupData.append('email', email);
      signupData.append('password', password);
      signupData.append('nickname', nickname);
      signupData.append('gender', gender);
      signupData.append('age', age);
      signupData.append('location', location);
      signupData.append('image', image, 'image' + imageFileName);
      signupData.append('voice', voice, 'voice'+ voiceFileName);

      console.log(signupData, '회원가입 정보')
      axios.post('/signup', signupData)
        .then((res) => {
          if(res.data.message === "This picture has no face!"){
            alert("사진에서 얼굴을 찾을 수 없습니다.")
          }else if(res.data.message === "Email is already exist!"){
            alert("이미 가입 정보가 있는 이메일 입니다.")
          }else if(res.data.message === "User registered successfully"){
            alert('회원가입이 완료되었습니다.')
            history.push('/login')
          }
        })
        .catch(err => {
          console.log(err)
        })    
        } else {
      alert('목소리 녹음을 해주세요.')
    }
  };

  return (
    <div className="signup-template d-flex flex-column align-items-center">
      <div className={classes.root}>
        <Stepper activeStep={activeStep} className="w-50 m-auto">
          {steps.map((label) => {
            const stepProps = {};
            const labelProps = {};
            return (
              <Step
                key={label}
                {...stepProps} 
              >
                <StepLabel
                 {...labelProps}
                >
                  <small className="signup-font">{label}</small>
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>

        <div className="signup-form">
          {activeStep === 0 && (
            <div className="d-flex flex-column align-items-center">
              <h3 className="signup-logo">기본정보</h3>
              <Input
                className="w-50"
                placeholder="닉네임"
                nickname={nickname}
                onChange={setNicknameText}
              />
              <Input
                className="w-50"
                placeholder="이메일"
                email={email}
                onChange={setEmailText}
              />
              <Input
                className="w-50"
                type="password"
                placeholder="비밀번호"
                password={password}
                onChange={setPasswordText}
              />
              <Input
                className="w-50"
                type="password"
                placeholder="비밀번호 확인"
                passwordconfirm={passwordconfirm}
                onChange={setPasswordconfirmText}
              />
            
              <FormControl 
                className="w-50"
              >
                <InputLabel id="demo-mutiple-name-label">지역</InputLabel>
                <Select
                  labelId="demo-mutiple-name-label"
                  id="demo-mutiple-name"
                  value={location}
                  onChange={setLocationText}
                  input={<Input />}
                  MenuProps={MenuProps}
                >
                  {locations.map((location) => (
                    <MenuItem key={location} value={location}>
                      {location}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl 
                className="w-50"
              >
                <InputLabel id="demo-mutiple-name-label1">성별</InputLabel>
                <Select
                  labelId="demo-mutiple-name-label1"
                  id="demo-mutiple-name1"
                  value={gender === '1' ? '여자' : gender === '0' && "남자"}
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

              <FormControl 
                className="w-50 mt-3"
              >
                <TextField
                  id="date"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  age={age}
                  onChange={setAgeText}
                />
              </FormControl>

              <div className="signup-footer">
                <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                  뒤로
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={()=>checkHandle(1)}
                  className={classes.button}
                >
                  다음
                </Button>
              </div>
            </div>
          )}
          {activeStep === 1 && (
            <div className="d-flex flex-column align-items-center">
              <h3 className="signup-logo">사진 입력</h3>
              <Input
                className="w-50 mb-3"
                type="file"
                onChange={setImageText}
              />
              {imagePush &&
                <img src={objectURL} alt={objectURL} className="signup-img" />
              }
              <div className="signup-footer">
                <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                  뒤로
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={()=>checkHandle(2)}
                  className={classes.button}
                >
                  다음
                </Button>
              </div>
            </div>
          )}
          {activeStep === 2 && (
            <div className="d-flex flex-column align-items-center">
              <h3 className="signup-logo">목소리 녹음</h3>
              {!voice && (
                  <div className="d-flex flex-column align-items-center">
                  <ReactMic
                    record={record}
                    className="sound-wave w-50"
                    onStop={onStop}
                    strokeColor="white"
                    backgroundColor="lightpink" />
                  <div>
                    {!record && (
                      <button className="record-button" onClick={startRecording} type="button"><img className="record-img mr-2" src={RecordStart} />녹음시작</button>
                    )}
                    {record && (
                      <button className="record-button" onClick={stopRecording} type="button"><img className="record-img mr-2" src={RecordStop} />녹음종료</button>
                    )}
                  </div>
                </div>
              )}

              {voice && (
                  <div className="d-flex flex-column align-items-center">
                  <AudioPlayer
                    src={voiceurl}
                    showJumpControls={false}
                    customVolumeControls={[]}
                    customAdditionalControls={[]}
                    style={{
                      width: '300px'
                    }}
                  />
                  <button 
                    onClick={removeRecord}
                    type="button"
                    className="record-button"
                  >
                    <img className="record-img mr-2" src={RecordDelete} />다시녹음
                  </button>
                </div>
              )}
              <div className="signup-footer">
                <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                  뒤로
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={sendSignupData}
                  className={classes.button}
                >
                  완료
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignupPage;