import React from 'react';
import './KeywordRecommend.css';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { useCookies } from 'react-cookie';
import axios from 'axios';
import defaltimg from "../../assets/mainImg/png/heartback.png"
import exam from "../../assets/mainImg/png/exam.png"
import handheart from "../../assets/mainImg/png/pngegg.png"
import { Link } from 'react-router-dom';


function MyVerticallyCenteredModal(props) {
    const history = useHistory();
    return (
        <Modal
            key={props.data.id}
            {...props}
            size="sm"
            aria-labelledby={props.data.id}
            centered
            className={props.data.id}
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

function MyVerticallyCenteredModal2(props) {
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
                    <div>
                        <Link onClick={() => history.push('/question/create')} className="text-decoration-none" >이상형 레시피 만들기</Link>
                    </div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5> 이상형 레시피를 만들어</h5>
                <h5> 같은 성향의 이성을 추천 받으세요</h5>
                <img src={exam} alt="exam" className="modal-img1" />
            </Modal.Body>
            <Modal.Footer>
                <button onClick={props.onHide} className="modal-button">close</button>
            </Modal.Footer>
        </Modal>
    );
}

const KeywordRecommend = () => {
    const [exam, setExam] = React.useState(0)
    const [modalShow, setModalShow] = React.useState(false);
    const history = useHistory();
    const [tileData, setTileData] = React.useState()
    const [cookies] = useCookies(['accessToken']);

    const axiosConfig = {
        headers: { 'Authorization': 'Bearer ' + cookies.accessToken }
    }

    React.useEffect(() => {
        axios.get(`/recommend-user-by-keyword`, axiosConfig)
            .then((response) => {
                console.log('keyword', response)
                setTileData(response.data.userList)
                setExam(response.data.isExam)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
    if (exam === 1) {
        if (tileData.userList === 'undefine') {
            return (
                <h1> 맞춤 추천 검색 중 입니다.</h1>
            )
        }
    } else {
        return (
            <div className="nonkeyword">
                <div className="item">
                    <div className="polaroid">
                        <div className="caption">레시피 기반 추천</div>
                        <div onClick={() => setModalShow(true)}>
                            <Button>
                                <img src={defaltimg} alt='img' className="wrapper-img2" />
                            </Button>
                            <div className="caption">
                                <div className="back"></div>
                                <div className="heart"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <MyVerticallyCenteredModal2
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
            </div>
        )
    }
    return (
        <div>
            {tileData.map((userdata) => (
                <div className="item" key={userdata.id}>
                    <div className="polaroid">
                        <div className="caption">레시피 기반 추천</div>
                        <Button onClick={() => history.push(`/answer/${userdata.id}`)}>
                            <img src={userdata.imageDownloadUri} alt={userdata.nickname} className="wrapper-img" />
                        </Button>
                        <div className="caption">{userdata.nickname}/{userdata.location}/{userdata.age}세 </div>
                        <audio src={userdata.voiceDownloadUri} controls className="modal-img1" />
                    </div>
                </div>
            ))}
        </div>
    );
};
export default KeywordRecommend;