import React, { useState, useEffect } from 'react';

// Axios
import axios from 'axios';

// Header
import HeaderComp from '../../components/base/HeaderComp';

// Footer
import FooterComp from '../../components/base/FooterComp';

// Material-UI
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

// Cookie
import { useCookies } from 'react-cookie';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const ConversationListPage = () => {
  const classes = useStyles();

  const [ conversations, setConversations ] = useState([]);

  const [ cookies, setCookie ] = useCookies(['accessToken']);

  const config = {
    headers: {
      'Authorization': 'Bearer ' + cookies.accessToken
    }
  }
  useEffect(() => {
    axios.get('/conversation', config)
    .then((response) => {
      console.log(response.data)
      setConversations(response.data)
    })
  }, [])

  return (
    <div>
      <HeaderComp />
      <div className={classes.root}>
        <List component="nav" aria-label="main mailbox folders">
          <ListItem button>
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary="사람이름"
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    대화내용
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
        </List>
      </div>
      <FooterComp />    
    </div>
  )
};

export default ConversationListPage;