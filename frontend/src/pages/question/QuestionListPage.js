import React, { useState,useEffect } from 'react';
// import { Link } from 'react-router-dom';
import HeaderComp from '../../components/base/HeaderComp';
import FooterComp from '../../components/base/FooterComp';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const QuestionListPage = () => {
  const [ questionList, setQuestionList ] = useState({
      questions:[],
  });
  const {questions} = questionList;
  const [cookies, setCookie] = useCookies(['accessToken']);
  const config = {
    header: { token: cookies.accessToken } 
  }
  const getQuestions = () => {
      axios.get(`/question`,config)
      .then((response) => {
        console.log(response,'질문들 옴?')
        setQuestionList({
          questions: response.data
        })
      })
      .catch((err) => {
        console.log(err)
        })
    }

  useEffect(()=>{
    getQuestions()
  })
  
  return (
    <>
      <HeaderComp/>
        {questions.map((question) => (
                {question}
              ))}
      <FooterComp />
    </>
  );
  };
  
  export default QuestionListPage;