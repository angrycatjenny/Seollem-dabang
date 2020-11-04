import React, { useState, useEffect } from 'react';

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

const PostCreatePage = () => {
  const [ tags, setTags ] = useState('');
  const [ image, setImage ] = useState('');
  const [ record, setRecord ] = useState(false);
  const [ voice, setVoice ] = useState('');
  const [ voiceurl, setVoiceurl ] = useState('');

  const setImageText = e => {
    setImage(e.target.files[0]);
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

  return (
    <div>
      <h1>게시물 등록 페이지</h1>

      {/* 사진 */}
      <h3>사진</h3>
      <Input
        className="signup-input"
        type="file"
        onChange={setImageText}
      />

      {/* 음성 */}
      <h3>음성</h3>
      {!voice && (
        <div>
          <ReactMic
            record={record}
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
      <h3>태그</h3>
      <div>
        <h6>태그1</h6>
        <Input />
        <button>추가</button>
      </div>
    </div>
  )
}

export default PostCreatePage;