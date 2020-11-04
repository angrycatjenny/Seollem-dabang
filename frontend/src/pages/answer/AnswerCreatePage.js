import React, { useState, useEffect } from 'react';

// Axios
import axios from 'axios';

// CSS
import './AnswerCreatePage.css';

// History
import { useHistory } from "react-router-dom";

// Cookie
import { useCookies } from 'react-cookie';

const AnswerCreatePage = ({ match }) => {
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
          '/question/list/' + `${match.params.userId}`, config
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
    setQuestions(questions);
  };
  const selectedNo = (index) => {
    questions[index].answer = 0
    console.log(questions);
    setQuestions(questions);
  };

  const sendAnswers = () => {
    const answerList = [];
    for (var i = 0; i <= questions.length; i++) {
      if (questions[i]) {
        if (questions[i].answer === 1) {
          answerList.push(1)
        } else if (questions[i].answer === 0) {
          answerList.push(0)
        }
      }
    }
    const examiner = match.params.userId
    const sendAnswerData = { examiner, answerList}
    axios.post('/answer', sendAnswerData, config)
      .then(() => {
        console.log('디비보자');
        history.push('/result')
      })
    console.log(sendAnswerData)
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