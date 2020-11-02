import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useHistory } from "react-router-dom";

import './QuestionListPage.css';

const QuestionListPage = () => {
  const history = useHistory();
  const [ exam, setExam ] = useState(null);
  const [ isExam, setIsExam ] = useState(false);
  const [cookies, setCookie] = useCookies(['accessToken']);
  const config = {
    headers: { 'Authorization':'Bearer '+ cookies.accessToken } 
  }
  
  useEffect(() => {
      const fetchData = async() => {
        setIsExam(true);
        try {
          // const getQuestions = () => {
          //   axios.get(`/question/list`,config)
          //   .then((response) => {
          //     if(response.data.length>0){
          //       console.log("뭔가 있음");
          //       setExam(response.data);
          //       const exam = response.data.map((question, idx) => {
          //         return {
          //           id:question.questionId,
          //           content:question.content,
          //           answer:question.correctAnswer,
          //           user_id:question.user.id,
          //           user_nickname:question.user.nickname,
          //         };
          //       })
          //       console.log(exam,'??')
          //       setExam(exam)
          //       setIsExam(true)
          //       console.log(questions,'zzz')
          //     }else{
          //       console.log('시험지 없뜜')
          //       setIsExam(false)
          //     }
          //   })
          //   .catch((err) => {
          //     console.log(err)
          //     })
          // }
          const getExam = await axios.get(`/question/list`,config);
          if(getExam.data.length>0){
            console.log(getExam.data,'??')
            setExam(getExam.data)
            setIsExam(true)
          }else{
            setIsExam(false)
          }
        } catch(e) {
          console.log(e);
        } 
        setIsExam(false);
      };
      fetchData();
  }, []);

  if(isExam){
    return <div>대기중</div>
  }

  if(!exam){
    return (
      <div style={{display:"flex", justifyContent:"center", 
      margin:"230px 0"}}>
        <Link to="/question/create"
          className="exam-create-btn">시험지+</Link>
      </div>
    )
  }

  return (
    <div>
      {exam.map(item => (
        <h4 key={item.questionId} item={item}>{item.content}</h4>
      ))}
      <Link to="/question/detail">
        <button className="exam-update-btn">편집</button>
      </Link>
      {/* <button className="exam-delete-btn"
      onClick={delExam}>시험지 삭제</button> */}
        {/* {isExam ? (
          <>
            {questions.map((question) => {
              return (
                <div>
                
                <React.Fragment key={question.id}>
                  <h2>{question.id}번 문제</h2>
                  <h4>{question.content}</h4>
                </React.Fragment>
                    
                <button>시험지 수정</button>
                <button>시험지 삭제</button>
                </div>
                )
              })}
          </>
        ) : (
          <Link to="/question/create"><button>시험지+</button></Link>
        )} */}
    </div>
  );
  };
  
  export default QuestionListPage;