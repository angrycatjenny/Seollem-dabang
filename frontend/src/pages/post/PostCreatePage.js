import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import './PostCreatePage.css';
import Input from '@material-ui/core/Input';
import { ReactMic } from 'react-mic';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { useCookies } from 'react-cookie';
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
    axios.post('/api/post', postData, config)
      .then(() => {
        console.log(postData)
        history.push('/post/list')
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div style={{display:"flex", justifyContent:"center", marginTop:"25px"}}>
      <div className="post-create-box">
        <div className="post-photo-box">
          <h3>사진</h3>
          <img className="post-image" src={url} />
          <Input
            className="signup-input"
            type="file"
            onChange={setImageText}
          />
        </div>
        
        <div className="post-audio-box">
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
              <div className="post-audio-btn">
                <button className="post-audio-start" onClick={startRecording}
                 type="button">녹음시작</button>
                <button className="post-audio-stop" onClick={stopRecording} 
                type="button">녹음종료</button>
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
              <div style={{display:"flex", justifyContent:"center"}}>
                <button
                className="post-audio-start" 
                style={{marginTop:"10px"}}
                  onClick={removeRecord}
                  type="button"
                >
                  다시녹음
                </button>
              </div>
            </div>
          )}
        </div>
        <div style={{display:"flex", justifyContent:"center"}}>
          <button className="post-create-btn" onClick={sendPostData}>등록하기</button>
        </div>
      </div>
    </div>
  )
}

export default PostCreatePage;