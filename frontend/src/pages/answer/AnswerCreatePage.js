import React, { useState, useEffect } from 'react';

// Axios
import axios from 'axios';

// CSS
import './AnswerCreatePage.css';

// History
import { useHistory } from "react-router-dom";

// Cookie
import { useCookies } from 'react-cookie';

const AnswerCreatePage = () => {
  const [ questions, setQuestions ] = useState([]);
  const [ answers, setAnswers ] = useState([]);
  const history = useHistory();
  const [ cookies, setCookie ] = useCookies(['accessToken']);
  
  const config = {
    headers: {
      'Authorization': 'Bearer ' + cookies.accessToken
    }
  }
  useEffect(() => {
    console.log(cookies.accessToken)
    console.log('질문 리스트 주세요')
    axios.get('/question/list', config)
      .then((response) => {
        console.log(response)
      })
  }, []);

  const sendAnswers = e => {
    axios.post('/')
    .then(
      history.push('/result')
    )
    .catch()
  }

  return (
    <div>
      <h1>답변 등록</h1>
      <button onClick={sendAnswers}>제출하기</button>
    </div>
  )
};

export default AnswerCreatePage;