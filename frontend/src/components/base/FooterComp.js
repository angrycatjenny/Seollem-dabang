import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import AssignmentRoundedIcon from '@material-ui/icons/AssignmentRounded';
import { useHistory } from "react-router-dom";
import { useRouteMatch } from 'react-router-dom';
import './FooterComp.css';
import axios from 'axios';
import { withCookies  } from 'react-cookie';

export default function FooterComp() {
  let [value, setValue] = React.useState();
  let [userId, setUserId] = React.useState();
  const history = useHistory();
  const match = useRouteMatch();
  if (match.path ==='/main'){
    value = 0
  }else if (match.path==='/question'||match.path==='/question/create'||match.path==='/question/update'){
    value = 1
  }else if (match.path==='/conversation'||match.path==='/conversation/detail'||match.path==='/conversation'){
    value = 2
  }else if (match.path==='/user/:id' || match.path==='/user/:id/update'){
    value = 3
  }
  const axiosConfig = {
    headers: { token: withCookies('access-token') } 
  }
  const getUserId = () => {
    axios.get(`/user`,axiosConfig)
    .then((response) => {
      setUserId(response.id)
    })
    .catch((err) => {
      console.log(err)
      })
  }
    // 현재 유저 정보 가져오기
  React.useEffect(()=>{
    getUserId()
  })

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
      <BottomNavigationAction onClick={() => history.push('/conversation')} label="채팅"  icon={<FavoriteIcon />} />
      <BottomNavigationAction onClick={() => history.push(`/user/${userId}`)} label="내정보"  icon={<PersonRoundedIcon />} />
    </BottomNavigation>
  );
}
