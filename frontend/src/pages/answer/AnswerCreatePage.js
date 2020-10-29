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

  const [ questions, setQuestions ] = useState(null);
  const [ loading, setLoading ] = useState(false);

  const config = {
    headers: {
      'Authorization': 'Bearer ' + cookies.accessToken
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          '/question/list', config
        );
        setQuestions(response.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const selectedYes = (index) => {
    questions[index].answer = 1
    console.log(questions);
  };
  const selectedNo = (index) => {
    questions[index].answer = 0
    console.log(questions);
  };

  const sendAnswers = () => {

  };

  if (loading) {
    return <h1>대기 중...</h1>;
  };
  if (!questions) {
    return null;
  };

  return (
    <div>
      <h1>답변 등록</h1>
      {questions.map((question, index) => (
        <div key={index}>
          <h1>{question.content}</h1>
          <button onClick={() => selectedYes(index)}>YES</button>
          <button onClick={() => selectedNo(index)}>NO</button>
        </div>
      ))}
      <button onClick={sendAnswers}>제출하기</button>
    </div>
  )
};

export default AnswerCreatePage;