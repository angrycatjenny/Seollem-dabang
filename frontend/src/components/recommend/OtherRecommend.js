import React from 'react';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import './OtherRecommend.css';
import { useHistory } from "react-router-dom";
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { Link } from 'react-router-dom';
import handheart from "../../assets/mainImg/png/pngegg.png"

function MyVerticallyCenteredModal(props) {
  const history = useHistory();
  return (
    <Modal
    {...props}
    size="sm"
    aria-labelledby={props.data.id}
    centered
>
    <Modal.Header closeButton>
        <Modal.Title id={props.data.id}>
            <div>
                <Link onClick={() => history.push(`/answer/${props.data.id}`)}>'{props.data.nickname}'님 레시피 보기</Link>
            </div>
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <h4>지역 : {props.data.location}</h4>
        <h4>나이 : {props.data.age} 세</h4>
        <img src={handheart} alt="exam" className="modal-img1" />
        <audio src={props.data.voiceDownloadUri} controls className="modal-img1" />
    </Modal.Body>
    <Modal.Footer>
        <button onClick={props.onHide} className="modal-button">닫기</button>
    </Modal.Footer>
</Modal>
  );
}

const OtherRecommend = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [loading, setLoading] = React.useState(false)
  const [tileData, setTileData] = React.useState()
  const [cookies] = useCookies(['accessToken']);
  const history = useHistory();

  const axiosConfig = {
    headers: { 'Authorization': 'Bearer ' + cookies.accessToken }
  }

  const getData = () => {
    axios.get(`/api/recommend-user-by-profile`, axiosConfig)
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
            <Button onClick={() => history.push(`/answer/${data.id}`)}>
              <img src={data.imageDownloadUri} alt={data.nickname} className="wrapper-img" />
            </Button>
            <div className="caption">{data.nickname}/{data.location}/{data.age}세</div>
            <audio src={data.voiceDownloadUri} controls className="modal-img1" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default OtherRecommend;
