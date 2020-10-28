import React, { useState, useEffect } from 'react';

// Axios
import axios from 'axios';

// CSS
import './MyProfilePage.css';

// Cookie
import { useCookies } from 'react-cookie';

const MyProfilePage = () => {
  const [ cookies, setCookie ] = useCookies(['accessToken']);

  const [ email, setEmail ] = useState('');
  const [ gender, setGender ] = useState('');
  const [ image, setImage ] = useState('');
  const [ nickname, setNickname ] = useState('');
  const [ voice, setVoice ] = useState('');
  const [ location, setLocation ] = useState('');
  const [ age, setAge ] = useState('');

  const config = {
    headers: {
      'Authorization': 'Bearer ' + cookies.accessToken
    }
  }
  useEffect(() => {
    axios.get('/my-profile', config)
      .then((response) => {
        setEmail(response.data.email)
        setGender(response.data.gender)
        setImage(response.data.image)
        setNickname(response.data.nickname)
        setVoice(response.data.voice)
        setLocation(response.data.location)
        setAge(response.data.age)
      })
      .catch((error) => {
        console.log(error);
      })
  }, [])

  return (
    <div>
      <p>이메일: {email}</p>
      <p>성별: {gender}</p>
      <p>이미지: {image}</p>
      <p>닉네임: {nickname}</p>
      <p>목소리: {voice}</p>
      <p>지역: {location}</p>
      <p>나이: {age}</p>
    </div>
  )
};

export default MyProfilePage;