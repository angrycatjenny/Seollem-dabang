import React from 'react';
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

const {key, profile, gender2} = props;

const [profieImg,setImg] = React.useState();

if (gender2 === 0){
    if (key === 0){
        setImg(menImage1)
    }else if (key === 1){
        setImg(menImage2)
    }else  if (key === 2){
        setImg(menImage3)
    }else if (key === 3){
        setImg(menImage4)
    }
}else if(gender2 === 1){
    if (key === 0){
        setImg(womenImage1)
    }else if (key === 1){
        setImg(womenImage2)
    }else  if (key === 2){
        setImg(womenImage3)
    }else if (key === 3){
        setImg(womenImage4)
    }
}

const OtherRecommendItem = () => {
    return (
        <div>
            <GridListTile className="other-gridlist-item">
            <Button>
              <img src={profieImg} alt={profile.name} className="other-imgsize" />
            </Button>
            <GridListTileBar
              title={profile.name}
              subtitle={<span>{profile.region} and {profile.age}세</span>}
              actionIcon={
                <IconButton aria-label={`info about ${profile.name}`} className="other-icon">
                  <RecordVoiceOverIcon color="secondary" />
                </IconButton>
              }
            />
          </GridListTile>
        </div>
    );
};

export default OtherRecommendItem;