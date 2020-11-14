import React, { useEffect, useState } from 'react';
import { useUserMediaFromContext } from "@vardius/react-user-media";
import Room from "./Room";
import { useCookies } from 'react-cookie';
import axios from 'axios';
// import { useReactMediaRecorder } from "react-media-recorder";
import { useHistory } from "react-router-dom";
import useMediaRecorder from '@wmik/use-media-recorder';

const CallPage = ({ match }) => {
  const [ cookies, setCookie ] = useCookies(['accessToken']);
  const { stream, error } = useUserMediaFromContext();
  const [ user, setUser ] = useState('');
  const history = useHistory();

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

   let {
    status,
    mediaBlob,
    stopRecording,
    startRecording,
  } = useMediaRecorder({
    blobOptions: { type: 'video/mp4' },
    mediaStreamConstraints: { audio: true, video: true }
  });

  const goResult = () => {
    console.log(mediaBlob)
    // axios.post('/', config)
    //   .then((response) => {

    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   })
  }

  return (
    <div className="container-fluid container">
      {!mediaBlob && 
        <div>
          {status == 'idle' && 
          <button onClick={startRecording}>시작하기</button>
          }
          {status == 'recording' && 
            <div>
              <button onClick={stopRecording}>종료하기</button>
              <Room name={match.params.conversationId} username={user} stream={stream} />
            </div>
          }
        </div>
      }
      {mediaBlob && 
        <div>
          {status == 'stopped' &&
            <div>
              <button onClick={goResult}>결과보기</button>
            </div>
          }
        </div>
      }
    </div>
  )
}

export default CallPage;