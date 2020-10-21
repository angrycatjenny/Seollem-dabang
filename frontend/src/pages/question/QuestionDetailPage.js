import React, { useState, useEffect } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import HeaderComp from '../../components/base/HeaderComp';
import FooterComp from '../../components/base/FooterComp';

// import axios from 'axios';

//로그인 여부에 따른 글쓰기 허용은 나중에
const QuestionDetailPage = () => {
    // const [exam, setExam] = useState([]);
    const [isExam, setIsExam] = useState(false);

    // useEffect(() => {
    //     axios.get('/exam/')
    //     .then((res) => {
    //         console.log(res,'옴?')
    //         setExam(res.data);
    //         if (res.data) {
    //            setIsExam(true)
    //      }
    //     })
    //     .catch((error) => console.log(error));
    //   }, []);

    // const { questions } = questions;

    return (
      <>
        <HeaderComp />
        
        {isExam ? (
          <>
            <Link to="/exam/update"><button>시험지 수정</button></Link>
            <button>시험지 삭제</button>
            {/* {questions.map((question) => {
              return (
                <>
                <h4>{question.title}</h4>
                <h5>{question.content}</h5>
                </>
                )
              })} */}
          </>
        ) : (
          <Link to="/question/create"><button>시험지+</button></Link>
        )}
        <FooterComp/>
        {/* 푸터에 홈버튼 있으니까 필요x */}
        {/* <Link to="/"><button>홈으로</button></Link> */}
      </>
    );
  };
  export default QuestionDetailPage;