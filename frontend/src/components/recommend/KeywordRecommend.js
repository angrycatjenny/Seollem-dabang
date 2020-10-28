import React from 'react';
import Carousel from 'nuka-carousel';
import './KeywordRecommend.css';
import ChevronRightRoundedIcon from '@material-ui/icons/ChevronRightRounded';
import ChevronLeftRoundedIcon from '@material-ui/icons/ChevronLeftRounded';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import Button from '@material-ui/core/Button';

import ManImage5 from '../../assets/mainImg/png/남성5.png';
import ManImage6 from '../../assets/mainImg/png/남성6.png';
import ManImage7 from '../../assets/mainImg/png/남성7.png';
import ManImage8 from '../../assets/mainImg/png/남성8.png';

import womenImage5 from '../../assets/mainImg/png/여성5.png';
import womenImage6 from '../../assets/mainImg/png/여성6.png';
import womenImage7 from '../../assets/mainImg/png/여성7.png';
import womenImage8 from '../../assets/mainImg/png/여성8.png';

const imgData = [ManImage5, ManImage6, ManImage7, ManImage8]
const tileData = [
    {
        title: 'Image',
        author: 'author'
    },
    {
        title: 'Image',
        author: 'author'
    },
    {
        title: 'Image',
        author: 'author'
    },
    {
        title: 'Image',
        author: 'author'
    },
]
for (let i = 0; i < tileData.length; i++) {
    tileData[i].img = imgData[i]
}
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
            {tileData.map((tile) => (
                <div className="keyword-root">
                    <GridList cellHeight={300} className="keyword-gridlist">
                        <GridListTile key={tile.img} className="keyword-gridlist-item">
                            <Button>
                                <img src={tile.img} alt="img" className="keyword-imgsize"/>
                            </Button>
                            <GridListTileBar
                                title='title'
                                subtitle='by'
                                actionIcon={
                                    <IconButton className="keyword-icon">
                                        <RecordVoiceOverIcon color="secondary" />
                                    </IconButton>
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

// import React from 'react';
// import Carousel from 'nuka-carousel';
// import './KeywordRecommend.css';
// import ChevronRightRoundedIcon from '@material-ui/icons/ChevronRightRounded';
// import ChevronLeftRoundedIcon from '@material-ui/icons/ChevronLeftRounded';
// import GridList from '@material-ui/core/GridList';
// import GridListTile from '@material-ui/core/GridListTile';
// import GridListTileBar from '@material-ui/core/GridListTileBar';
// import IconButton from '@material-ui/core/IconButton';
// import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
// import Button from '@material-ui/core/Button';

// import ManImage5 from '../../assets/mainImg/png/남성5.png';
// import ManImage6 from '../../assets/mainImg/png/남성6.png';
// import ManImage7 from '../../assets/mainImg/png/남성7.png';
// import ManImage8 from '../../assets/mainImg/png/남성8.png';

// import womenImage5 from '../../assets/mainImg/png/여성5.png';
// import womenImage6 from '../../assets/mainImg/png/여성6.png';
// import womenImage7 from '../../assets/mainImg/png/여성7.png';
// import womenImage8 from '../../assets/mainImg/png/여성8.png';
// import { useCookies } from 'react-cookie';
// import axios from 'axios';

// const menImgData = [ManImage5, ManImage6, ManImage7, ManImage8]
// const womenImgData = [womenImage5, womenImage6, womenImage7, womenImage8]

// const [gender, setGender] = React.useState();

// const [tileData, setTileData] = React.useState()
// const [cookies] = useCookies(['accessToken']);

// const axiosConfig = {
//     headers: { token: cookies.accessToken }
// }

// const getData = () => {
//     axios.get(`/profile/data`, axiosConfig)
//         .then((response) => {
//             setTileData(response.data)
//             setGender(response.gender)
//         })
//         .catch((err) => {
//             console.log(err)
//         })
// }
// React.useEffect(() => {
//     getData()
// })
// if (gender === 0) {
//     for (let i = 0; i < tileData.length; i++) {
//         tileData[i].img = menImgData[i]
//     }
// } else {
//     for (let i = 0; i < tileData.length; i++) {
//         tileData[i].img = womenImgData[i]
//     }
// }

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
//             {tileData.map((tile) => (
//                 <GridList cellHeight={300}>
//                     <GridListTile>
//                         <Button>
//                             <img src={tile.img} alt="img" />
//                         </Button>
//                         <GridListTileBar
//                             title={tile.name}
//                             subtitle={<span>{tile.region} and {tile.age}세</span>}
//                             actionIcon={
//                                 <IconButton>
//                                     <RecordVoiceOverIcon color="secondary" />
//                                 </IconButton>
//                             }
//                         />
//                     </GridListTile>
//                 </GridList>

//             ))}
//         </Carousel>
//     );
// };
// export default KeywordRecommend;