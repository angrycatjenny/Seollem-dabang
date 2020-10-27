import React from 'react';
import Carousel from 'nuka-carousel';
import './KeywordRecommend.css';
import ChevronRightRoundedIcon from '@material-ui/icons/ChevronRightRounded';
import ChevronLeftRoundedIcon from '@material-ui/icons/ChevronLeftRounded';
import KeywordRecommendItem from './KeywordRecommendItem.js';
const arr = [1,2,3,4];
const gender = 0
const KeywordRecommend = () => {
    return (
        <Carousel
            renderCenterLeftControls={({ previousSlide }) => (
                <ChevronLeftRoundedIcon onClick={previousSlide} />
            )}
            renderCenterRightControls={({ nextSlide }) => (
                <ChevronRightRoundedIcon onClick={nextSlide} />
            )}
            classname="carusel-outline"
        >
            {arr.map((value,index) => (
                <KeywordRecommendItem key={index} value={value} gender2={gender}/>
            ))}
        </Carousel>
    );
};
export default KeywordRecommend;

// import React from 'react';
// import Carousel from 'nuka-carousel';
// import './KeywordRecommend.css';
// import ChevronRightRoundedIcon from '@material-ui/icons/ChevronRightRounded';
// import ChevronLeftRoundedIcon from '@material-ui/icons/ChevronLeftRounded';
// import KeywordRecommendItem from './KeywordRecommendItem.js';
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

// const KeywordRecommend = () => {
//     return (
//         <Carousel
//             renderCenterLeftControls={({ previousSlide }) => (
//                 <ChevronLeftRoundedIcon onClick={previousSlide} />
//             )}
//             renderCenterRightControls={({ nextSlide }) => (
//                 <ChevronRightRoundedIcon onClick={nextSlide} />
//             )}
//             classname="carusel-outline"
//         >
//             {tileData.map((tile,index) => (
//                 <KeywordRecommendItem key={index} profile={tile} gender2={gender}/>
//             ))}
//         </Carousel>
//     );
// };
// export default KeywordRecommend;