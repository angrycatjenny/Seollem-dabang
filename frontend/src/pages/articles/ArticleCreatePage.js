import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HeaderComp from '../../components/base/HeaderComp';
import axios from 'axios';

//로그인 여부에 따른 글쓰기 허용은 나중에
const ArticleCreatePage = () => {
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
      </>
    );
  };
  
  export default ArticleCreatePage;