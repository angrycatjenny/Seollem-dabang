import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import './PostListPage.css';
import { useCookies } from 'react-cookie';
import { Button } from 'react-bootstrap';
const PostListPage = () => {
  const [ posts, setPosts ] = useState('');
  const [ cookies, setCookie ] = useCookies(['accessToken']);
  const [ loading, setLoading ] = useState(false);
  const history = useHistory();
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
          '/api/post', config
        );
        setPosts(response.data)
        console.log(response.data)
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);
  
  if (loading) {
    return <h1>대기 중...</h1>;
  };
  if (!posts) {
    return (
      <div>
        <Link to="/post/create">글쓰기</Link>
      </div>
    );
  };

  return (
    <div className="ptemp" style={{marginTop:"25px", display:"flex",flexDirection:"column", alignItems:"center"}}>
      <div style={{ alignSelf:"flex-end", marginRight:"130px" }}>
          <Link className="post-create-button" 
          to="/post/create">
            글쓰기</Link>
      </div>

      <div className="post-list-box">
        {posts.map((post, index) => (
        <div className="post-box" key={index}>

            <img className="post-image" 
            src={'https://k3b103.p.ssafy.io:8080/api/image/' + post.image} />

            <div className='post-info'>
              <div className='post-button'>
                <h3 onClick={() => history.push(`/answer/${post.user.id}`)}
                className='post-writer'>{post.user.nickname}</h3>
                <Button onClick={() => history.push(`/post/update/${post.user.id}`)}>
                  수정하기
                </Button> 
              </div>
              <div style={{fontSize: "20px"}}>#{post.user.location} #{post.user.age}세</div>
            </div>

            <audio className='post-audio' controls src={'https://k3b103.p.ssafy.io:8080/api/voice/' + post.voice} />
        </div>
        ))}
      </div>
    </div>
  )
}

export default PostListPage;