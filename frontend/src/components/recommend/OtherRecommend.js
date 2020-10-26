import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: 500,
      height: 450,
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
  }));

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
    const classes = useStyles();
    return (
        <div className={classes.root}>
        <GridList cellHeight={180} className={classes.gridList}>
          {tileData.map((tile) => (
            <GridListTile key={tile.img}>
                <Button>
              <img src={tile.img} alt={tile.title} />
                </Button>
              <GridListTileBar
                title={tile.title}
                subtitle={<span>by: {tile.author}</span>}
                actionIcon={
                  <IconButton aria-label={`info about ${tile.title}`} className={classes.icon}>
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