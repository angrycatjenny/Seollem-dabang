import React, { useEffect, useState } from 'react';
import { useUserMediaFromContext } from "@vardius/react-user-media";
import Room from "./Room";
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import useMediaRecorder from '@wmik/use-media-recorder';
import { Link } from 'react-router-dom';
import './CallPage.css';

const CallPage = ({ match }) => {
  const [ cookies, setCookie ] = useCookies(['accessToken']);
  const { stream, error } = useUserMediaFromContext();
  const [ user, setUser ] = useState('');
  const history = useHistory();
  const [ angry, setAngry ] = useState('');
  const [ disgusted, setDisgusted ] = useState('');
  const [ fearful, setFearful ] = useState('');
  const [ happy, setHappy ] = useState('');
  const [ neutral, setNeutral ] = useState('');
  const [ sad, setSad ] = useState('');
  const [ feedback, setFeedback ] = useState('');
 
  const config = {
    headers: {
      'Authorization': 'Bearer ' + cookies.accessToken
    }
  }
  useEffect(() => {
    axios.get('/api/my-profile', config)
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
    const callFile = new FormData();
    const videoName = Date.now();

    callFile.append('video', mediaBlob, 'voice'+ videoName);
    
    axios.post(`/conversation/end/${match.params.conversationId}`, callFile, config)
      .then((response) => {
        console.log(response.data)
        setAngry(response.data.Angry)
        setDisgusted(response.data.Disgusted)
        setFearful(response.data.Fearful)
        setHappy(response.data.Happy)
        setNeutral(response.data.Neutral)
        setSad(response.data.Sad)
        if (response.data.Happy > response.data.Disgusted) {
          setFeedback('분위기가 아주 좋은데요? 호감을 표현해도 되겠어요!')
        } else if (response.data.Happy = response.data.Disgusted) {
          setFeedback('분위기가 나쁘지 않아요! 더욱 적극적으로 다가가 보세요!')
        } else if (response.data.Happy < response.data.Disgusted) {
          setFeedback('아직은 때가 아닌가봐요,,, 조금 조심스럽게 다가가 보세요!')
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }

  return (
    <div className="container-fluid call-template">
      {!mediaBlob && 
        <div className="d-flex justify-content-center start-part">
          {status == 'idle' && 
          <div className="d-flex flex-column align-items-center">
            <h3>준비 되셨나요?</h3>
            <button className="start-button" onClick={startRecording}>시작하기</button>
          </div>
          }
          {status == 'recording' && 
            <div className="container">
              <Room name={match.params.conversationId} username={user} stream={stream} />
              <button className="end-button" onClick={stopRecording}>종료하기</button>
            </div>
          }
        </div>
      }
      {mediaBlob && 
        <div>
          {status == 'stopped' &&
            <div>
              {!feedback &&
                <div>
                  <button onClick={goResult}>결과보기</button>
                </div>
              }
              {feedback &&
                <div>
                  <h3>{feedback}</h3>
                  <Link to='/main'>나가기</Link>
                </div>
              }
            </div>
          }
        </div>
      }
    </div>
  )
}

export default CallPage;