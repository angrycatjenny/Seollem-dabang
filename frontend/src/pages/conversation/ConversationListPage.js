import React, { useState, useEffect } from 'react';

import ConversationPic1 from '../../assets/conversation/ConversationPic1.png';

// Axios
import axios from 'axios';

// Cookie
import { useCookies } from 'react-cookie';

// CSS
import './ConversationListPage.css';

import { Link } from 'react-router-dom';


const ConversationListPage = () => {

  const [ conversations, setConversations ] = useState(null);

  const [ cookies, setCookie ] = useCookies(['accessToken']);
  const [ ucookies, setUcookie ] = useCookies(['user']);
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
          '/api/conversation/list', config
        );
        setConversations(response.data)
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
  if (!conversations) {
    return null;
  };

  return (
    <div className="container conversation-template">
      <div className="row">
        {conversations.map((conversation, index) => (
          <div className="col-4">
            {ucookies.user == conversation.examiner.id ? 
              <Link className="text-decoration-none" to={'/conversation/' + conversation.conversationId}>
              <div button key={index} className="d-flex flex-column align-items-center">
                <img className="conversation-img text-decoration-none" src={ConversationPic1} />
                <h5 className="text-decoration-none text-dark">{conversation.examinee.nickname}님과의 대화</h5>
                <h6 className="text-decoration-none text-dark">#{conversation.examinee.location} #{conversation.examinee.age}세</h6>
              </div>
            </Link> : null}
            {ucookies.user == conversation.examinee.id ? 
              <Link className="text-decoration-none" to={'/conversation/' + conversation.conversationId}>
              <div button key={index} className="d-flex flex-column align-items-center">
                <img className="conversation-img text-decoration-none" src={ConversationPic1} />
                <h5 className="text-decoration-none text-dark">{conversation.examiner.nickname}님과의 대화</h5>
                <h6 className="text-decoration-none text-dark">#{conversation.examiner.location} #{conversation.examiner.age}세</h6>
              </div>
            </Link> : null}
          </div>
        ))}
      </div>
    </div>
  )
};

export default ConversationListPage;