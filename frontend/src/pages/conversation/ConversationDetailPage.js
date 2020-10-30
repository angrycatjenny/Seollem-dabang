import React, { useState, useEffect }  from 'react';

// Axios
import axios from 'axios';

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
  }, []);

  const sendMessageA = e => {
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
      <h1>대화 디테일</h1>
      <button onClick={sendMessageA}>등록A</button>
    </div>
  )
};

export default ConversationDetailPage;