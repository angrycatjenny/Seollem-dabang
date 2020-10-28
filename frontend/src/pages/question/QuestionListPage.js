import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
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
    console.log(config,'헤더')
      axios.get(`/question/list`,config)
      .then((response) => {
        if(response.data.length>0){
          console.log(response,'질문들 옴?')
          setQuestionList({
            questions: response.data
          })
          setIsExam(true)
        }else{
          console.log('시험지 없뜜')
          setIsExam(false)
        }
      })
      .catch((err) => {
        console.log(err)
        })
    }

  useEffect(()=>{
    getQuestions()
  },[])
  
  return (
    <>
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
    </>
  );
  };
  
  export default QuestionListPage;