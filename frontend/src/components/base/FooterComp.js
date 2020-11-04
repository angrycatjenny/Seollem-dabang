import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
// import FavoriteIcon from '@material-ui/icons/Favorite';
import SmsIcon from '@material-ui/icons/Sms';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import AssignmentRoundedIcon from '@material-ui/icons/AssignmentRounded';
import { useHistory } from "react-router-dom";
import { useRouteMatch } from 'react-router-dom';
import './FooterComp.css';

export default function FooterComp() {
  let [value, setValue] = React.useState();
  const history = useHistory();
  const match = useRouteMatch();
  if (match.path ==='/main'){
    value = 0
  }else if (match.path==='/question'||match.path==='/question/create'||match.path==='/question/update'){
    value = 1
  }else if (match.path==='/conversation'||match.path==='/conversation/:conversationId'){
    value = 2
  }else if (match.path==='/post/create' || match.path==='/post/list'|| match.path==='/post/update/:postId'){
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
      <BottomNavigationAction onClick={() => history.push('/question')} label="시험지" icon={<AssignmentRoundedIcon />} />
      <BottomNavigationAction onClick={() => history.push('/conversation')} label="채팅"  icon={<SmsIcon />} />
      <BottomNavigationAction onClick={() => history.push(`/post/list`)} label="피드"  icon={<RecordVoiceOverIcon />} />
    </BottomNavigation>
  );
}
