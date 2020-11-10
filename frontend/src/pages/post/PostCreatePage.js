import React, { useState } from 'react';

/// Axios
import axios from 'axios';

// History
import { useHistory } from "react-router-dom";

// CSS
import './PostCreatePage.css';

// Material-UI
import Input from '@material-ui/core/Input';

// Audio Record
import { ReactMic } from 'react-mic';

// Audio Player
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

// Cookie
import { useCookies } from 'react-cookie';

// Footer
import FooterComp from '../../components/base/FooterComp';

const PostCreatePage = () => {
  const history = useHistory();
  const [ cookies, setCookie ] = useCookies(['accessToken']);
  const [ url, setUrl ] = useState('');
  const [ image, setImage ] = useState('');
  const [ record, setRecord ] = useState(false);
  const [ voice, setVoice ] = useState('');
  const [ voiceurl, setVoiceurl ] = useState('');

  const setImageText = e => {
    setImage(e.target.files[0]);
    setUrl(URL.createObjectURL(e.target.files[0]))
  };
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
      'Authorization': 'Bearer ' + cookies.accessToken
    }
  }
  const sendPostData = () => {
    const postData = new FormData();

    const imageFileName = Date.now();
    const voiceFileName = Date.now();

    postData.append('voice', voice, 'voice'+ voiceFileName);
    postData.append('image', image, 'image' + imageFileName);
    axios.post('/post', postData, config)
      .then(() => {
        console.log(postData)
        history.push('/post/list')
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
      <h1>게시물 등록 페이지</h1>

      <h3>사진</h3>
      <img className="post-image" src={url} />
      <Input
        className="signup-input"
        type="file"
        onChange={setImageText}
      />

      <h3>음성</h3>
      {!voice && (
        <div>
          <ReactMic
            record={record}
            className="sound-wave w-100"
            mimeType="audio/mp3"
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
      <button onClick={sendPostData}>등록하기</button>
      <FooterComp/>
    </div>
  )
}

export default PostCreatePage;