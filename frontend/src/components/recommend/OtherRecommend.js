import React from 'react';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import './OtherRecommend.css';
import AudioPlayer from 'react-modular-audio-player';
import { useHistory } from "react-router-dom";
import { useCookies } from 'react-cookie';
import axios from 'axios';

let rearrangedPlayer = [
  {
    className: "adele",
    innerComponents: [
      {
        type: "play",
        style: {
          width: "100%",
          justifyContent: "center",
          filter: "invert(100%)",
          opacity: "0.4"
        }
      }
    ]
  }
];

function MyVerticallyCenteredModal(props) {
  const history = useHistory();
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.data.nickname}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>거주 지역:{props.data.location}</h4>
        <h4>나이:{props.data.age}</h4>
      </Modal.Body>
      <Modal.Footer>
        <AudioPlayer
          audioFiles={[
            {
              src: `${props.data.voiceDownloadUri}`,
              title: "voiceDownloadUri",
            }
          ]}
          rearrange={rearrangedPlayer}
          playerWidth="50px"
          iconSize="50px"
        />
        <Button onClick={() => history.push(`/answer/${props.data.id}`)}>레시피 풀기</Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

const OtherRecommend = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [loading, setLoading] = React.useState(false)
  const [tileData, setTileData] = React.useState()
  const [cookies] = useCookies(['accessToken']);

  const axiosConfig = {
    headers: { 'Authorization': 'Bearer ' + cookies.accessToken }
  }

  const getData = () => {
    axios.get(`/recommend-user-by-profile`, axiosConfig)
      .then((response) => {
        console.log('other', response)
        setTileData(response.data)
        setLoading(true)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  React.useEffect(() => {
    getData()
  }, [])


  if (!loading) {
    return (
      <h3>서비스 준비 중 입니다.</h3>
    )
  }
  return (
    <div>
      {tileData.map((data) => (
        <div className="item" key={data.nickname}>
          <div className="polaroid">
            <div className="caption">지역/나이 기반 추천</div>
            <Button onClick={() => setModalShow(true)}>
              <img src={data.imageDownloadUri} alt={data.nickname} className="wrapper-img" />
            </Button>
            <div className="caption">{data.nickname}</div>
          </div>
          <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            data={data}
          />
        </div>
      ))}
    </div>
  );
};

export default OtherRecommend;
