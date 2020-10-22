import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import AssignmentRoundedIcon from '@material-ui/icons/AssignmentRounded';
import { useHistory } from "react-router-dom";
import { useLocation } from 'react-router-dom'

import './FooterComp.css';

export default function FooterComp() {
  let [value, setValue] = React.useState(0);
  const history = useHistory();
  const location = useLocation();
  console.log(location.pathname)
  if (location.pathname ==='/main'){
    value = 0
  }else if (location.pathname==='/question'){
    value = 1
  }else if (location.pathname==='/question'){
    value = 1
  }else if (location.pathname==='/question'){
    value = 1
  }
  
  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className="navbar-footer"
    >
      <BottomNavigationAction onClick={() => history.push('/main')} label="홈"  icon={<HomeRoundedIcon />} />
      <BottomNavigationAction onClick={() => history.push('/question')} label="모의고사" icon={<AssignmentRoundedIcon />} />
      <BottomNavigationAction onClick={() => history.push('/main')} label="채팅"  icon={<FavoriteIcon />} />
      <BottomNavigationAction onClick={() => history.push('/main')} label="내정보"  icon={<PersonRoundedIcon />} />
    </BottomNavigation>
  );
}
