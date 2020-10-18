import React from 'react';
import { useState } from React;
import { Link } from 'react-router-dom';
import HeaderComp from '../../components/base/HeaderComp';
import axios from 'axios';

//로그인 여부에 따른 글쓰기 허용은 나중에
const ArticleListPage = () => {
    const [articleList, setArticleList] = useState([]);

    componentDidMount(){
        axios.get('/articles/')
        .then((response) => {
            console.log(response,'옴?')
            setArticleList(response.data);
        })
        .catch((error) => console.log(error));
    }

    const { articles } = articleList;

    return (
      <>
        <HeaderComp />
        {articles.map((article) => {
            return (
                <>
                <h4>{article.title}</h4>
                <h5>{article.content}</h5>
                </>
            )
        })}
        <Link to="/"><button>홈으로</button></Link>
        <Link to="/"><button>글쓰기</button></Link>
      </>
    );
  };
  //글쓰기로 가는 주소 수정 필요. 
  export default ArticleListPage;