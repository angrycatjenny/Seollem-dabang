import React, { useState } from 'react';

// Axios
import axios from 'axios';

// CSS
import './MyProfileUpdatePage.css';

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
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

// History
// import { useHistory } from "react-router-dom";
// Cookies
import { useCookies } from 'react-cookie';

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

const MyProfileUpdatePage = () => {
  const classes = useStyles();
  const [cookies] = useCookies(['accessToken']);
  const axiosConfig = {
    headers: { 'Authorization': 'Bearer ' + cookies.accessToken }
}
  const [ nickname, setNickname ] = useState('');
  const [ location, setLocation ] = useState('');
  const [ image, setImage ] = useState('');
  const [ imagePush, setImagePush] = useState(false)
  const [ record, setRecord ] = useState(false);
  const [ voice, setVoice ] = useState('');
  const [ voicePush, setVoicePush] = useState(false)
  const [ voiceurl, setVoiceurl ] = useState('');

  React.useEffect(() => {
    axios.get(`/my-profile`, axiosConfig)
        .then((response) => {
            console.log(response.data)
            setNickname(response.data.nickname)
            setLocation(response.data.location)
            setImage(response.data.image)
            setRecord(true)
            setVoice(response.data.voice)
        })
        .catch((err) => {
            console.log(err)
        })
}, [])

  const setNicknameText = e => {
    setNickname(e.target.value);
  };
  const setLocationText = e => {
    setLocation(e.target.value);
  };
  const setImageText = e => {
    setImagePush(true)
    setImage(e.target.files[0]);
  };

  const startRecording = () => {
    setRecord(true);
  };
  const stopRecording = () => {
    setRecord(false)
  };
  const onStop = (recordedBlob) => {
    setVoicePush(true)
    setVoice(recordedBlob.blob);
    setVoiceurl(recordedBlob.blobURL);
  };
  const removeRecord = () => {
    setVoice('');
    setVoiceurl('');
  };

  const sendUpdateData = e => {
    e.preventDefault();
      const UpdateData = new FormData();
      const imageFileName = Date.now();
      const voiceFileName = Date.now();
      UpdateData.append('nickname', nickname);
      UpdateData.append('location', location);
      if (voicePush){
        UpdateData.append('image', image, 'image' + imageFileName);
      }
      if (voicePush){
        UpdateData.append('voice', voice, 'voice'+ voiceFileName);
      }
      console.log(UpdateData, '회원수정 정보')
      axios.put('/my-profile', UpdateData, axiosConfig)
        .then(() => {
          alert('회원정보 수정완료 되었습니다.')
        })
        .catch((error) => console.log(error))
  };
  return (
    <div>
      <div className={classes.root}>
        <div className="Update-form">
            <div>
              <h3 className="Update-logo">기본정보 수정</h3>
              <Input
                className="Update-input"
                placeholder="닉네임"
                value={nickname}
                onChange={setNicknameText}
              />
              <FormControl className="Update-input">
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
            </div>
            <div>
              <h3 className="Update-logo">프로필 사진 변경</h3>
              <InputLabel className="mt-3">프로필 사진</InputLabel>
              <Input
                className="Update-input"
                type="file"
                onChange={setImageText}
              />

            </div>
            <div>
              <h3 className="Update-logo">목소리 변경</h3>
              {!voice && (
                <div>
                  <InputLabel className="mt-3">음성 녹음</InputLabel>
                  <ReactMic
                    record={record}
                    className="sound-wave w-100"
                    onStop={onStop}
                    strokeColor="black"
                    backgroundColor="lightgray" />
                  <div>
                    <button onClick={startRecording} type="button">녹음시작</button>
                    <button onClick={stopRecording} type="button">녹음종료</button>
                  </div>
                </div>
              )}

              {voice && (
                <div>
                  <AudioPlayer
                    src={voiceurl}
                    showJumpControls={false}
                    customVolumeControls={[]}
                    customAdditionalControls={[]}
                  />
                  <button 
                    onClick={removeRecord}
                    type="button"
                  >
                    다시녹음
                  </button>
                </div>
              )}
              <div className="Update-footer">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={sendUpdateData}
                  className={classes.button}
                >
                  완료
                </Button>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfileUpdatePage;