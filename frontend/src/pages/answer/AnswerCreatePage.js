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
  const history = useHistory();
  const [ cookies, setCookie ] = useCookies(['accessToken']);

  const [ questions, setQuestions ] = useState({
    items: [],
  });
  const { items } = questions;

  const [ answers, setAnswers ] = useState([]);

  const config = {
    headers: {
      'Authorization': 'Bearer ' + cookies.accessToken
    }
  }
  useEffect(() => {
    axios.get('/question/list', config)
      .then((response) => {
        const questionList = response.data.map((question, index) => {
          return {
            questionId: question.questionId,
            content: question.content,
          };
        });
        setQuestions({
          items: items.concat(questionList),
        });
      })
      .catch((error) => {
        console.log(error);
      });
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
      <div>
        <p>{questions.content}</p>
        <button>YES</button>
        <button>NO</button>
      </div>
      <button onClick={sendAnswers}>제출하기</button>
    </div>
  )
};

export default AnswerCreatePage;