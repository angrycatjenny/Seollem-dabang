import React, { useState, useEffect } from 'react';

// Axios
import axios from 'axios';

// CSS
import './AnswerCreatePage.css';

// History
import { useHistory } from "react-router-dom";

// Header
import HeaderComp from '../../components/base/HeaderComp';

// Footer
import FooterComp from '../../components/base/FooterComp';

const AnswerCreatePage = () => {
  const [ questions, setQuestions ] = useState([]);
  const [ answers, setAnswers ] = useState([]);
  const history = useHistory();
  
  useEffect(() => {
    axios.get('/')
  })

  const sendAnswers = e => {
    axios.post('/')
    .then(
      history.push('/result')
    )
    .catch()
  }

  return (
    <div>
      <HeaderComp />
      <h1>답변 등록</h1>
      <button onClick={sendAnswers}>제출하기</button>
      <FooterComp />
    </div>
  )
};

export default AnswerCreatePage;