import React from 'react';
import './KeywordRecommend.css';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap'; import
AudioPlayer from 'react-modular-audio-player';
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
                <h1> 서비스 준비 중 입니다.</h1>
            )
        }
    } else {
        return (
            <Button variant="contained" color="primary" onClick={() => history.push('/question/create')}>
                시험지를 만들어 주세요.
            </Button>
        )
    }
    return (
        <div>
            {tileData.map((data) => (
                <div className="item" key={data.nickname}>
                    <div className="polaroid">
                        <div className="caption">레시피 기반 추천</div>
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
export default KeywordRecommend;