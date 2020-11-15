import React, { useState, useEffect } from 'react';

/// Axios
import axios from 'axios';

// React Router Dom
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";

// CSS
import './PostListPage.css';

// Cookie
import { useCookies } from 'react-cookie';

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
            src={'http://localhost:8080/image/' + post.image} />

            <div className='post-info'>
              <h3 onClick={() => history.push(`/answer/${post.user.id}`)}
               className='post-writer'>{post.user.nickname}</h3>
              <div style={{fontSize: "20px"}}>#{post.user.location} #{post.user.age}세</div>
            </div>

            <audio className='post-audio' controls src={'http://localhost:8080/voice/' + post.voice} />
        </div>
          // <div key={index}>
          //   <div class='music-card playing'>
          //     <img className="post-list-image image" 
          //     src={'http://localhost:8080/image/' + post.image} />
          //     {/* <div className='wave'></div>
          //     <div className='wave'></div>
          //     <div className='wave'></div> */}
          //     <div className='info'>
          //       <h2 className='title'>{post.user.nickname}</h2>
          //       <div className='artist'>#{post.user.location} #{post.user.age}세</div>
          //     </div>
          //     <audio className='post-list-audio' controls src={'http://localhost:8080/voice/' + post.voice} />
          //   </div>
          // </div>
        ))}
      </div>
    </div>
  )
}

export default PostListPage;