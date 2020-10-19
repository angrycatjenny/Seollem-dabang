import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HeaderComp from '../../components/base/HeaderComp';
import FooterComp from '../../components/base/FooterComp';
import axios from 'axios';

//로그인 여부에 따른 시험지 작성 허용
//데이터 변수 하나 설정하고 조건부 렌더링
//null이면 질문 개수 설정, !null이면 질문create
const ExamCreatePage = () => {
    const [ title, setTitle ] = useState('');
    const [ content, setContent ] = useState('');

    const onChangeTitle = (e) => {
        setTitle(e.target.value);
      }
      const onChangeContent = (e) => {
        setContent(e.target.value);
      };
    
      const sendArticleData = (e) => {
        e.preventDefault()
        const ArticleData = {title, content}
        axios.post('/article/', ArticleData)
          .then(() => {
              setTitle('');
              setContent('');
              //list page로 가게 하기.
          })
          .catch((error) => console.log(error))
      }; 
  
    return (
      <>
        <HeaderComp />
        <div>
            <form onSubmit={sendArticleData}>
                <input placeholder="제목" value={title} onChange={onChangeTitle} />
                <input placeholder="내용" value={content} onChange={onChangeContent} />
                <button type="submit">완료</button>
            </form>
            <Link to="/"><button>취소</button></Link>
        </div>
        <FooterComp />
      </>
    );
  };
  
  export default ExamCreatePage;