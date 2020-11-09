import React, { useState, useEffect } from 'react';

/// Axios
import axios from 'axios';

// React Router Dom
import { Link } from 'react-router-dom';

// CSS
import './PostListPage.css';

// Cookie
import { useCookies } from 'react-cookie';

// Audio Player
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const PostListPage = () => {
  const [ posts, setPosts ] = useState('');
  const [ cookies, setCookie ] = useCookies(['accessToken']);
  const [ loading, setLoading ] = useState(false);
  
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
          '/post', config
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
        <h1>게시물 목록 페이지</h1>
        <Link to="/post/create">글쓰기</Link>
      </div>
    );
  };

  return (
    <div>
      <h1>게시물 목록 페이지</h1>
      <Link to="/post/create">글쓰기</Link>
      {posts.map((post, index) => (
        <div key={index}>
          <img className="post-list-image" src={'http://localhost:8080/image/' + post.image} />
          <AudioPlayer
            key={index}
            src={'http://localhost:8080/voice/' + post.voice}
            showJumpControls={false}
            customVolumeControls={[]}
            customAdditionalControls={[]}
          />
        </div>
      ))}
    </div>
  )
}

export default PostListPage;