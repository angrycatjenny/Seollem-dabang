import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HeaderComp from '../../components/base/HeaderComp';
import FooterComp from '../../components/base/FooterComp';
import axios from 'axios';

//로그인 여부에 따른 시험지 작성 허용
//데이터 변수 하나 설정하고 조건부 렌더링
//null이면 질문 개수 설정, !null이면 질문create
const ExamCreatePage = () => {
  const [ cnt, setCnt ] = useState(0);
  const [ isChecked, setIsChecked ] = useState(false);
  const [ title, setTitle ] = useState('');
  const [ content, setContent ] = useState('');

    const onChangeTitle = (e) => {
        setTitle(e.target.value);
      }
    const onChangeContent = (e) => {
      setContent(e.target.value);
    };
    const onChangeCnt = (e) => {
      setCnt(e.target.value);
    }
    
    const sendExamData = (e) => {
      e.preventDefault()
      const ExamData = {title, content}
      axios.post('/exam/', ExamData)
        .then(() => {
            setTitle('');
            setContent('');
            //list page로 가게 하기.
        })
        .catch((error) => console.log(error))
    }; 

    const goNext = (e) => {
      e.preventDefault()
      if(cnt<5){
        alert('질문 개수는 최소 5개 이상이어야 합니다!')
      }else{
        setIsChecked(true);
      }
    }
  
    return (
      <>
        <HeaderComp />
        <div>

        {isChecked ? (
          <>
            <form onSubmit={sendExamData}>
                <input placeholder="제목" value={title} onChange={onChangeTitle} />
                <input placeholder="내용" value={content} onChange={onChangeContent} />
                <button type="submit">완료</button>
            </form>
            <Link to="/exam"><button>취소</button></Link>
          </>
        ) : (
          <form onSubmit={goNext}>
                <input type="number" value={cnt} onChange={onChangeCnt} />
                <button type="submit">다음</button>
          </form>
        )}
        </div>
        <FooterComp />
      </>
    );
  };
  
  export default ExamCreatePage;