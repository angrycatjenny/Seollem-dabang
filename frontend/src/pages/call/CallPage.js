import React, { useEffect, useState } from 'react';
import { useUserMediaFromContext } from "@vardius/react-user-media";
import Room from "./Room";
import { useCookies } from 'react-cookie';
import axios from 'axios';

const CallPage = ({ match }) => {
  const [ cookies, setCookie ] = useCookies(['accessToken']);
  const { stream, error } = useUserMediaFromContext();
  const [ user, setUser ] = useState('');

  const config = {
    headers: {
      'Authorization': 'Bearer ' + cookies.accessToken
    }
  }
  useEffect(() => {
    axios.get('/my-profile', config)
      .then((response) => {
        setUser(response.data.nickname);
      })
      .catch((error) => {
        console.log(error);
      })
  }, [])

  return (
    <div className="container-fluid container">
      <Room name={match.params.conversationId} username={user} stream={stream} />
    </div>
  )
}

export default CallPage;