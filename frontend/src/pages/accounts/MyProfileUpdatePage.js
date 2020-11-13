import React, { useState } from 'react';
import Tape1 from '../../assets/profile/Tape1.png';

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
import { useHistory } from "react-router-dom";
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
  mainFont: {
    fontFamily:"BMEULJIRO",
    marginBottom: "5px",
    width: "100%"
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
  const history = useHistory();
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
  const [ objectURL, setObjectURL ] = useState('');
  // const [ currentUrl, setCurrentUrl ] = useState('');

  React.useEffect(() => {
    axios.get(`/my-profile`, axiosConfig)
        .then((response) => {
            setNickname(response.data.nickname)
            setLocation(response.data.location)
            setObjectURL(response.data.imageDownloadUri)
            setVoice(response.data.voiceDownloadUri)
            setVoiceurl(response.data.voiceDownloadUri)
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
    setObjectURL (URL.createObjectURL(e.target.files[0]))
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
      if (imagePush){
        UpdateData.append('image', image, 'image' + imageFileName);
      }
      if (voicePush){
        UpdateData.append('voice', voice, 'voice'+ voiceFileName);
      }
      console.log(UpdateData, '회원수정 정보')
      axios.put('/my-profile', UpdateData, axiosConfig)
        .then((res) => {
          if(res.data.message === "Nickname is already exist!"){
            alert("이미 존재하는 닉네임입니다.")
          }else{
            alert('회원정보가 수정되었습니다.')
            history.push('/profile')
          }
        })
        .catch(err => {
          if(err.message==="Request failed with status code 400"){
          alert('사진에서 얼굴을 찾을 수 없습니다.')
          }})    };
  return (
    <div className="my-profile-template">
      <img className="profile-tape" src={Tape1} />
      
      {/* 프로필 사진 변경 */}
      <div>
        <h4 className="Update-logo">프로필 사진</h4>
        <div style={{display:"flex", justifyContent:"center"}}>
        < img src={objectURL} alt={objectURL} className="Update-img" />
        </div>
        <InputLabel className="mt-3">프로필 사진</InputLabel>
        
          <Input
            className="Update-input"
            type="file"
            onChange={setImageText}
            />
      </div>
      
      {/* 기본 정보 변경 */}
      <div className="mt-4">      
        <h4 className="Update-logo">기본 정보</h4>
          <h5>닉네임 </h5>
          <Input
            classes={{input:classes.mainFont}}
            placeholder="닉네임"
            value={nickname}
            onChange={setNicknameText}
          />
          <h5 style={{marginTop:"10px"}}>지역 </h5>
          <FormControl className="Update-input">
            {/* <InputLabel id="demo-mutiple-name-label">지역</InputLabel> */}
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
      
      {/* 목소리 변경 */}
      <div>
        <h4 className="Update-logo">목소리</h4>
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
              <Button 
                onClick={startRecording} 
                variant="contained"
                color="primary"
                className={classes.button}
              >
                녹음시작
              </Button>
              <Button 
                onClick={stopRecording} 
                variant="contained"
                color="primary"
                className={classes.button}
              >
                녹음종료
              </Button>
            </div>
          </div>
        )}
        {voice && (
          <div style={{display:"flex",flexDirection:"column", alignItems:"center"}}>
            <AudioPlayer
              src={voiceurl}
              showJumpControls={false}
              customVolumeControls={[]}
              customAdditionalControls={[]}
            />
            <Button 
              onClick={removeRecord}
              variant="contained"
              className={classes.button}
              style={{marginTop:"20px", backgroundColor:"#5e1e27", border:"none",
            outline:"none", color:"white"}}
            >
              다시녹음
            </Button>
          </div>
        )}
        <div className="Update-footer">
          <Button
            variant="contained"
            onClick={sendUpdateData}
            className={classes.button}
            style={{color:"#5e1e27", border:"3px solid rgb(219, 63, 63)", 
          backgroundColor:"transparent", 
          padding:"4px 4px", borderRadius:"6px"}}
          >
            완료
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MyProfileUpdatePage;