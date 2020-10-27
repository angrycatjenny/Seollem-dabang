import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeaderComp from '../../components/base/HeaderComp';
import FooterComp from '../../components/base/FooterComp';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const QuestionListPage = () => {
  const [isExam, setIsExam] = useState(false);
  const [ questionList, setQuestionList ] = useState({
      questions:[],
  });
  const {questions} = questionList;
  const [cookies, setCookie] = useCookies(['accessToken']);
  const config = {
    headers: { 'Authorization':'Bearer '+ cookies.accessToken } 
  }
  const getQuestions = () => {
      axios.get(`/question`,config)
      .then((response) => {
        if(response.data){
          console.log(response,'질문들 옴?')
          setQuestionList({
            questions: response.data
          })
          setIsExam(true)
        }
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
        {isExam ? (
          <>
            {questions.map((question) => {
              return (
                <>
                <h4>{question}</h4>
                <button>시험지 수정</button>
                <button>시험지 삭제</button>
                </>
                )
              })}
          </>
        ) : (
          <Link to="/question/create"><button>시험지+</button></Link>
        )}
      <FooterComp />
    </>
  );
  };
  
  export default QuestionListPage;