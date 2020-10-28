// import React from 'react';
// import GridList from '@material-ui/core/GridList';
// import GridListTile from '@material-ui/core/GridListTile';
// import GridListTileBar from '@material-ui/core/GridListTileBar';
// import IconButton from '@material-ui/core/IconButton';
// import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
// import Button from '@material-ui/core/Button';
// import menImage1 from '../../assets/mainImg/png/남성1.png';
// import menImage2 from '../../assets/mainImg/png/남성2.png';
// import menImage3 from '../../assets/mainImg/png/남성3.png';
// import menImage4 from '../../assets/mainImg/png/남성4.png';
// import './OtherRecommend.css';

// const OtherRecommend = () => {
//   const imgData = [menImage1, menImage2, menImage3, menImage4]
//   const tileData = [
//     {
//       title: 'Image',
//       author: 'author'
//     },
//     {
//       title: 'Image',
//       author: 'author'
//     },
//     {
//       title: 'Image',
//       author: 'author'
//     },
//     {
//       title: 'Image',
//       author: 'author'
//     },
//   ]
//   for (let i = 0; i < tileData.length; i++) {
//     tileData[i].img = imgData[i]
//   }
//   return (
//     <div className="other-root">
//       <GridList cellHeight={200} className="other-gridlist">
//         {tileData.map((tile) => (
//           <GridListTile key={tile.img} className="other-gridlist-item">
//             <Button>
//               <img src={tile.img} alt={tile.title} className="other-imgsize" />
//             </Button>
//             <GridListTileBar
//               title={tile.title}
//               subtitle={<span>by: {tile.author}</span>}
//               actionIcon={
//                 <IconButton aria-label={`info about ${tile.title}`} className="other-icon">
//                   <RecordVoiceOverIcon color="secondary" />
//                 </IconButton>
//               }
//             />
//           </GridListTile>
//         ))}
//       </GridList>
//     </div>
//   );
// };

// export default OtherRecommend;


// 요청 생성 후 음석 재생 및 유저정보 변수에 추가해야 함..

import React from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import Button from '@material-ui/core/Button';
import './OtherRecommend.css';

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
  const [cookies] = useCookies(['accessToken']);

  const axiosConfig = {
    headers: { 'Authorization':'Bearer '+ cookies.accessToken } 
  }

  const getData = () => {
    axios.get(`/recommend-user-by-profile`, axiosConfig)
      .then((response) => {
        console.log('other',response)
        setTileData(response.data)
        setGender(response.data.gender)
        setLoading(true)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  React.useEffect(() => {
    getData()
  },[])

  if (loading){
    if (gender === 0) {
        for (let i = 0; i < tileData.length; i++) {
            tileData[i].img = menImgData[i]
        }
    } else {
        for (let i = 0; i < tileData.length; i++) {
            tileData[i].img = womenImgData[i]
        }
    }
}else{
    return(
        <h1>대기 중...</h1>
    )
}

if(!tileData){
    return null
}


  return (
    <div className="other-root">
      <GridList cellHeight={200} className="other-gridlist">
        {tileData.map((tile) => (
          <GridListTile key={tile.img} className="other-gridlist-item">
            <Button onClick={() => history.push('/question/create')}>
              <img src={tile.img} alt={tile.nickname} className="other-imgsize" />
            </Button>
            <GridListTileBar
              title={tile.name}
              subtitle={<span>{tile.location}, {tile.age}세</span>}
              actionIcon={
                <IconButton className="other-icon">
                  <RecordVoiceOverIcon color="secondary" />
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