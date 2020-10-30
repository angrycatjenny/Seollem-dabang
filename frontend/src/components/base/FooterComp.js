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
import { useCookies } from 'react-cookie';

export default function FooterComp() {
  let [value, setValue] = React.useState();
  const [cookies, setCookie] = useCookies(['accessToken']);
  const history = useHistory();
  const match = useRouteMatch();
  if (match.path ==='/main'){
    value = 0
  }else if (match.path==='/question'||match.path==='/question/create'||match.path==='/question/update'){
    value = 1
  }else if (match.path==='/conversation'||match.path==='/conversation/:conversationId'){
    value = 2
  }else if (match.path==='/profile' || match.path==='/myprofile/update'|| match.path==='/yourprofile/:userId'){
    value = 3
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
      <BottomNavigationAction onClick={() => history.push('/conversation')} label="채팅"  icon={<FavoriteIcon />} />
      <BottomNavigationAction onClick={() => history.push(`/profile`)} label="내정보"  icon={<PersonRoundedIcon />} />
    </BottomNavigation>
  );
}
