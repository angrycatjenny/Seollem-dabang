import React from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import Image1 from '../../assets/mainImg/png/남성1.png';
import Image2 from '../../assets/mainImg/png/남성2.png';
import Image3 from '../../assets/mainImg/png/남성3.png';
import Image4 from '../../assets/mainImg/png/남성4.png';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import Button from '@material-ui/core/Button';
import './OtherRecommend.css';
const tileData = [
    {
        img: Image1,
        title: 'Image',
        author: 'author'
    },
    {
        img: Image2,
        title: 'Image',
        author: 'author'
    },
    {
        img: Image3,
        title: 'Image',
        author: 'author'
    },
    {
        img: Image4,
        title: 'Image',
        author: 'author'
    },
]

const OtherRecommend = () => { 
    return (
        <div className="other-root">
        <GridList cellHeight={200} className="other-gridlist">
          {tileData.map((tile) => (
            <GridListTile key={tile.img} className="other-gridlist-item">
                <Button>
              <img src={tile.img} alt={tile.title} className="other-imgsize" />
                </Button>
              <GridListTileBar
                title={tile.title}
                subtitle={<span>by: {tile.author}</span>}
                actionIcon={
                  <IconButton aria-label={`info about ${tile.title}`} className="other-icon">
                      <RecordVoiceOverIcon color="secondary"/>
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


// 요청 생성 후 음석 재생 및 유저정보 변수에 추가해야 함..

// import React from 'react';
// import './OtherRecommend.css';
// import GridList from '@material-ui/core/GridList';
// import OtherRecommendItem from './OtherRecommendItem.js';
// import { useCookies } from 'react-cookie';
// import axios from 'axios';

// const [gender, setGender] = React.useState();

// const [tileData, setTileData] = React.useState()
// const [cookies] = useCookies(['accessToken']);

// const axiosConfig = {
//   headers: { token: cookies.accessToken } 
// }

// const getData = () => {
//   axios.get(`/profile/data`,axiosConfig)
//   .then((response) => {
//     setTileData(response.data)
//     setGender(response.gender)
//   })
//   .catch((err) => {
//     console.log(err)
//     })
// }
// React.useEffect(()=>{
//   getData()
// })

// const OtherRecommend = () => {
//   return (
//     <div className="other-root">
//       <GridList cellHeight={200} className="other-gridlist">
//         {tileData.map((tile,index) => (
//           <OtherRecommendItem key={index} profile={tile} gender2={gender}/>
//         ))}
//       </GridList>
//     </div>
//   );
// };

// export default OtherRecommend;