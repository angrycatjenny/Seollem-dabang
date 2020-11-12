import React, { useState, useEffect }  from 'react';

// Axios
import axios from 'axios';

// CSS
import './ConversationDetailPage.css';

// Cookie
import { useCookies } from 'react-cookie';

// Audio Record
import { ReactMic } from 'react-mic';

// Audio Player
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

// History
import { useHistory } from "react-router-dom";

import ConversationPic2 from '../../assets/conversation/ConversationPic2.png';

const ConversationDetailPage = ({ match }) => {
  const history = useHistory();
  const [ cookies1, setCookie1 ] = useCookies(['accessToken']);
  const [ cookies2, setCookie2 ] = useCookies(['user']);

  const [ loading, setLoading ] = useState(false);

  const [ messages, setMessages ] = useState('');

  const [ record, setRecord ] = useState(false);
  const [ voice, setVoice ] = useState('');
  const [ voiceurl, setVoiceurl ] = useState('');

  const startRecording = () => {
    setRecord(true);
  };
  const stopRecording = () => {
    setRecord(false)
  };
  const onStop = (recordedBlob) => {
    setVoice(recordedBlob.blob);
    setVoiceurl(recordedBlob.blobURL);
  };
  const removeRecord = () => {
    setVoice('');
    setVoiceurl('');
  };

  const config = {
    headers: {
      'Authorization': 'Bearer ' + cookies1.accessToken
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `/conversation/list/${match.params.conversationId}`, config
        );
        setMessages(response.data)
        console.log(response.data)
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const sendMessage = () => {
    const conversationFile = new FormData();
      
    const conversationName = Date.now();

    conversationFile.append('voice', voice, 'voice'+ conversationName);

    axios.post(`/conversation/create/${match.params.conversationId}`, conversationFile, config)
    .then (() => {
      setVoice('')
      console.log('성공?')
      history.go()
      }
    )
    .catch((error) => {
      console.log(error);
    })
  }

  if (loading) {
    return <h1>대기 중...</h1>;
  };
  if (!messages) {
    return null;
  };

  return (
    <div className="conversation-template">
      <h1>{cookies2.user}님과의 대화</h1>
      <div className="conversation-inner">
        {messages.map((message, index) => (
          <div className="d-flex flex-column">
            {cookies2.user == message.user.id ? 
              <AudioPlayer
              className="align-self-end"
                key={index}
                src={'http://localhost:8080/voice/' + message.voice}
                showJumpControls={false}
                customVolumeControls={[]}
                customAdditionalControls={[]}
                style={{
                  width: '300px'
                }}
              /> : 
              <AudioPlayer
                className="align-self-start"
                key={index}
                src={'http://localhost:8080/voice/' + message.voice}
                showJumpControls={false}
                customVolumeControls={[]}
                customAdditionalControls={[]}
                style={{
                  width: '300px'
                }}
              />
            }

          </div>
          )
        )}
      </div>
      <img className="conversation-image" src={ConversationPic2} />






      <h1>녹음 하기</h1>
      {!voice && (
        <div>
          <ReactMic
            record={record}
            mimeType="audio/mp3"
            className="sound-wave w-100"
            onStop={onStop}
            strokeColor="black"
            backgroundColor="lightgray" />
          <div>
            <button onClick={startRecording} type="button">녹음시작</button>
            <button onClick={stopRecording} type="button">녹음종료</button>
          </div>
        </div>
      )}

      {voice && (
        <div>
          <AudioPlayer
            src={voiceurl}
            showJumpControls={false}
            customVolumeControls={[]}
            customAdditionalControls={[]}
          />
          <button 
            onClick={removeRecord}
            type="button"
          >
            다시녹음
          </button>
        </div>
      )}
      <button onClick={sendMessage}>등록</button>
    </div>
  )
};

export default ConversationDetailPage;