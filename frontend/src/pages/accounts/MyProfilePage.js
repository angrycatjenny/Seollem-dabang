import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";

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
    axios.get('/my-profile', config)
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
    <div className="profile-form">
      <p>닉네임: {nickname}</p>
      <p>이메일: {email}</p>
      <p>지역: {location}</p>
      <p>나이: {age}</p>
      <img src={objectURL} alt={objectURL} className="profile-img"/>
      <AudioPlayer
        src={voiceurl}
        showJumpControls={false}
        customVolumeControls={[]}
        customAdditionalControls={[]}
      />      
      <Button variant="contained" color="primary" onClick={() => history.push('/myprofile/update')} className="profile-button">
        개인정보수정
      </Button>
    </div>
  )
};

export default MyProfilePage;