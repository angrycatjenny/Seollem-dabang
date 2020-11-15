import React from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import './OtherRecommend.css';
import AudioPlayer from 'react-modular-audio-player';

import menImage1 from '../../assets/mainImg/png/남성1.png';
import menImage2 from '../../assets/mainImg/png/남성2.png';
import menImage3 from '../../assets/mainImg/png/남성3.png';
import menImage4 from '../../assets/mainImg/png/남성4.png';

import womenImage1 from '../../assets/mainImg/png/여성1.png';
import womenImage2 from '../../assets/mainImg/png/여성2.png';
import womenImage3 from '../../assets/mainImg/png/여성3.png';
import womenImage4 from '../../assets/mainImg/png/여성4.png';
import { useHistory } from "react-router-dom";
import { useCookies } from 'react-cookie';
import axios from 'axios';

const OtherRecommend = () => {
  const menImgData = [menImage1, menImage2, menImage3, menImage4]
  const womenImgData = [womenImage1, womenImage2, womenImage3, womenImage4]
  const history = useHistory();

  const [gender, setGender] = React.useState();
  const [loading, setLoading] = React.useState(false)

  const [tileData, setTileData] = React.useState()
  const [tileData2, setTileData2] = React.useState([])
  const [cookies] = useCookies(['accessToken']);

  const axiosConfig = {
    headers: { 'Authorization': 'Bearer ' + cookies.accessToken }
  }

  const getData = () => {
    axios.get(`/api/recommend-user-by-profile`, axiosConfig)
      .then((response) => {
        console.log('other', response)
        setTileData(response.data)
        setGender(response.data[0].gender)
        setLoading(true)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  React.useEffect(() => {
    getData()
  }, [])

let tileData3 = []

  if (loading) {
  for (let i = 0; i<2; i++){
    tileData3.push(tileData[i])
  }
  console.log('push네여ㅕㅕ',tileData3)
    if (gender === 0) {
      for (let i = 0; i < tileData.length; i++) {
        tileData[i].img = menImgData[i]
      }
    } else {
      for (let i = 0; i < tileData.length; i++) {
        tileData[i].img = womenImgData[i]
      }
    }
  } else {
    return (
      <h3>서비스 준비 중 입니다.</h3>
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
console.log(456789)
  return (
    <div className="other-root">
      <GridList cellHeight={200} className="other-gridlist">
        {tileData3.map((tile) => (
          <GridListTile key={tile.img} className="other-gridlist-item">
            <Button onClick={() => history.push(`/answer/${tile.id}`)}>
              <img src={tile.img} alt={tile.nickname} className="other-imgsize" />
            </Button>
            <GridListTileBar
              title={tile.name}
              subtitle={<span>{tile.location}, {tile.age}세</span>}
              actionIcon={
                <IconButton className="other-icon">
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
                  />                
                  </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};

export default OtherRecommend;