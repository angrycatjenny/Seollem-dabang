import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Tape1 from '../../assets/profile/Tape1.png';
import Tape2 from '../../assets/profile/Tape2.png';

// Axios
import axios from 'axios';

// CSS
import './MyProfilePage.css';

// Cookie
import { useCookies } from 'react-cookie';

// Audio Player
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const MyProfilePage = () => {
  const [cookies, setCookie] = useCookies(['accessToken']);
  const [email, setEmail] = useState('');
  const [objectURL, setObjectURL] = useState('');
  const [nickname, setNickname] = useState('');
  const [voiceurl, setVoiceurl] = useState('');
  const [location, setLocation] = useState('');
  const [age, setAge] = useState('');
  const history = useHistory();

  const config = {
    headers: {
      'Authorization': 'Bearer ' + cookies.accessToken
    }
  }
  useEffect(() => {
    axios.get('/api/my-profile', config)
      .then((response) => {
        setEmail(response.data.email)
        setObjectURL(response.data.imageDownloadUri)
        setNickname(response.data.nickname)
        setVoiceurl(response.data.voiceDownloadUri)
        setLocation(response.data.location)
        setAge(response.data.age)
      })
      .catch((error) => {
        console.log(error);
      })
  }, [])

  return (
    <div className="my-profile-template">
      <img className="profile-tape" src={Tape1} />
      <div className="d-flex">
        <img src={objectURL} alt={objectURL} className="profile-img"/>
        <div className="mt-4 ml-5">      
          <h5>기본정보</h5>
          <h6>닉네임: {nickname}</h6>
          <h6>이메일: {email}</h6>
          <h6>지역: {location}</h6>
          <h6>나이: {age}</h6>
        </div>
      </div>

      <h5 className="mt-5">음성소개</h5>
      <AudioPlayer
        src={voiceurl}
        showJumpControls={false}
        customVolumeControls={[]}
        customAdditionalControls={[]}
      />      
      <button variant="contained" color="primary" onClick={() => history.push('/myprofile/update')} className="profile-button">
        개인정보수정
      </button>
    </div>
  )
};

export default MyProfilePage;