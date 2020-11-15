import React from 'react';
import Carousel from 'nuka-carousel';
import './KeywordRecommend.css';
import ChevronRightRoundedIcon from '@material-ui/icons/ChevronRightRounded';
import ChevronLeftRoundedIcon from '@material-ui/icons/ChevronLeftRounded';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import AudioPlayer from 'react-modular-audio-player';

import ManImage5 from '../../assets/mainImg/png/남성5.png';
import ManImage6 from '../../assets/mainImg/png/남성6.png';
import ManImage7 from '../../assets/mainImg/png/남성7.png';
import ManImage8 from '../../assets/mainImg/png/남성8.png';

import womenImage5 from '../../assets/mainImg/png/여성5.png';
import womenImage6 from '../../assets/mainImg/png/여성6.png';
import womenImage7 from '../../assets/mainImg/png/여성7.png';
import womenImage8 from '../../assets/mainImg/png/여성8.png';
import { useHistory } from "react-router-dom";
import { useCookies } from 'react-cookie';
import axios from 'axios';

const KeywordRecommend = () => {
    const menImgData = [ManImage5, ManImage6, ManImage7, ManImage8]
    const womenImgData = [womenImage5, womenImage6, womenImage7, womenImage8]
    const [exam, setExam] = React.useState(0)
    const [gender, setGender] = React.useState();
    const history = useHistory();

    const [tileData, setTileData] = React.useState()
    const [cookies] = useCookies(['accessToken']);

    const axiosConfig = {
        headers: { 'Authorization': 'Bearer ' + cookies.accessToken }
    }

    React.useEffect(() => {
        axios.get(`/api/recommend-user-by-keyword`, axiosConfig)
            .then((response) => {
                console.log('keyword', response)
                setTileData(response.data.userList)
                setGender(response.data.gender)
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
        } else {
            if (gender === 0) {
                for (let i = 0; i < tileData.length; i++) {
                    tileData[i].img = womenImgData[i]
                }
            } else {
                for (let i = 0; i < tileData.length; i++) {
                    tileData[i].img = menImgData[i]
                }
            }
        }
    } else {
        return (
            <Button variant="contained" color="primary" onClick={() => history.push('/question/create')}>
                시험지를 만들어 주세요.
            </Button>
        )
    }

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

    return (
        <Carousel
            renderCenterLeftControls={({ previousSlide }) => (
                <ChevronLeftRoundedIcon onClick={previousSlide} />
            )}
            renderCenterRightControls={({ nextSlide }) => (
                <ChevronRightRoundedIcon onClick={nextSlide} />
            )}
            className="carusel-outline"
        >
            {tileData.map((tile) => (
                <div key={tile.img} className="keyword-root">
                    <GridList cellHeight={300} className="keyword-gridlist">
                        <GridListTile key={tile.img} className="keyword-gridlist-item">
                            <Button onClick={() => history.push(`/answer/${tile.id}`)}>
                                <img src={tile.imageDownloadUri} alt={tile.nickname} className="keyword-imgsize" />
                            </Button>
                            <GridListTileBar
                                title={tile.name}
                                subtitle={<span>{tile.location}, {tile.age}세</span>}
                                actionIcon={
                                    <IconButton className="keyword-icon">
                                        <AudioPlayer
                                            audioFiles={[
                                                {
                                                    src: `${tile.voiceDownloadUri}`,
                                                    title: "voiceDownloadUri",
                                                }
                                            ]}
                                            rearrange={rearrangedPlayer}
                                            playerWidth="50px"
                                            iconSize="50px"
                                        />                                        </IconButton>
                                }
                            />
                        </GridListTile>
                    </GridList>
                </div>

            ))}
        </Carousel>
    );
};
export default KeywordRecommend;