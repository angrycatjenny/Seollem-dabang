import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// Router
import { BrowserRouter } from 'react-router-dom';

// Call
import { EventDispatcher } from "peer-data";
import { PeerDataProvider } from "react-peer-data";
import { UserMediaProvider } from "@vardius/react-user-media";
import "./theme/scss/styles.scss";

const dispatcher = new EventDispatcher();
const iceServers = [
  {
    url: "stun:stun.1.google.com:19302",
    // url: "stun:74.125.142.127:19302",
  },
  {
    urls: "turn:turn.bistri.com:80",
    credential: "homeo",
    username: "homeo",
  },
];

ReactDOM.render(
  <PeerDataProvider
    servers={{ iceServers }}
    constraints={{ ordered: true }}
    signaling={{
      dispatcher: dispatcher,
      url:
        process.env.NODE_ENV !== "production" ? "http://localhost:3001" : null,
    }}
  >
    <UserMediaProvider constraints={{ audio: true, video: true }}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserMediaProvider>
  </PeerDataProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
