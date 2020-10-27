import React, { useState, useEffect }  from 'react';

// Axios
import axios from 'axios';

// Header
import HeaderComp from '../../components/base/HeaderComp';

// Footer
import FooterComp from '../../components/base/FooterComp';

// CSS
import './ConversationDetailPage.css';

// Cookie
import { useCookies } from 'react-cookie';

const ConversationDetailPage = ({ match }) => {
  const [ conversation, setConversation ] = useState('');
  const [ examinees, setExaminees ] = useState([]);
  const [ examers, setExamers ] = useState([]);
  const [ cookies, setCookie ] = useCookies(['accessToken']);

  const config = {
    headers: {
      'Authorization': 'Bearer ' + cookies.accessToken
    }
  }
  useEffect(() => {
    axios.get(`/conversation/${match.params.conversationId}`, config)
      .then((response) => {
        if (response.data) {
          setExaminees(response.data);
        } else {
          setExamers(response.data);
        };
      })
      .catch((error) => {
        console.log(error);
      });
  });

  const sendMessage = e => {
    axios.post(`/conversation/${match.params.conversationId}`, conversation, config)
    .then (
      setConversation('')
    )
    .catch((error) => {
      console.log(error);
    })
  }
  return (
    <div>
      <HeaderComp />
      <h1>대화 디테일</h1>
      <button onClick={sendMessage}>등록</button>
      <FooterComp />
    </div>
  )
};

export default ConversationDetailPage;