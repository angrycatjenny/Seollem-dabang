import React from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import Button from '@material-ui/core/Button';
import './KeywordRecommend.css';

import ManImage5 from '../../assets/mainImg/png/남성5.png';
import ManImage6 from '../../assets/mainImg/png/남성6.png';
import ManImage7 from '../../assets/mainImg/png/남성7.png';
import ManImage8 from '../../assets/mainImg/png/남성8.png';

import womenImage5 from '../../assets/mainImg/png/여성5.png';
import womenImage6 from '../../assets/mainImg/png/여성6.png';
import womenImage7 from '../../assets/mainImg/png/여성7.png';
import womenImage8 from '../../assets/mainImg/png/여성8.png';

// const {key, profile, gender2} = props;
const KeywordRecommendItem = (props) => {
    const { value, gender2 } = props;
    console.log(1234)
    const [profieImg, setImg] = React.useState();

    // if (gender2 === 0) {
    //     if (value === 0) {
    //         setImg(ManImage5)
    //     } else if (value === 1) {
    //         setImg(ManImage6)
    //     } else if (value === 2) {
    //         setImg(ManImage7)
    //     } else if (value === 3) {
    //         setImg(ManImage8)
    //     }
    // } else if (gender2 === 1) {
    //     if (value === 0) {
    //         setImg(womenImage5)
    //     } else if (value === 1) {
    //         setImg(womenImage6)
    //     } else if (value === 2) {
    //         setImg(womenImage7)
    //     } else if (value === 3) {
    //         setImg(womenImage8)
    //     }
    // }
    return (
        <div>
            <GridList cellHeight={500}>
                <GridListTile>
                    <Button>
                        <img src={profieImg} alt="img" />
                    </Button>
                    <GridListTileBar
                        title='title'
                        subtitle='by'
                        actionIcon={
                            <IconButton>
                                <RecordVoiceOverIcon color="secondary" />
                            </IconButton>
                        }
                    />
                </GridListTile>
            </GridList>
        </div>
    );
};

export default KeywordRecommendItem;