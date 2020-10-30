import React, { useState, useEffect } from 'react';

// CSS
import './AnswerResultPage.css';

// Axios
import axios from 'axios';

// Cookie
import { useCookies } from 'react-cookie';

const AnswerResultPage = () => {
  const [ cookies, setCookie ] = useCookies(['accessToken']);
  const [ loading, setLoading ] = useState(false);

  const [ answer, setAnswer ] = useState('');

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
          '/result', config
        );
        setAnswer(response.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>답변 결과</h1>
      <div>
        <h1>합격입니다.</h1>
        <button>채팅하기</button>
        <button>나가기</button>
      </div>
      <div>
        <h1>불합격입니다.</h1>
        <button>나가기</button>
      </div>   
    </div>
  )
};

export default AnswerResultPage;