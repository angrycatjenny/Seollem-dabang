import React, { useState, useEffect } from 'react';

// Axios
import axios from 'axios';

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

// CSS
import './ConversationListPage.css';

import { Link } from 'react-router-dom';

//Footer
import FooterComp from '../../components/base/FooterComp';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const ConversationListPage = () => {
  const classes = useStyles();

  const [ conversations, setConversations ] = useState(null);

  const [ cookies, setCookie ] = useCookies(['accessToken']);
  const [ loading, setLoading ] = useState(false);

  const config = {
    headers: {
      'Authorization': 'Bearer ' + cookies.accessToken
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          '/api/conversation/list', config
        );
        setConversations(response.data)
        console.log(response.data)
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return <h1>대기 중...</h1>;
  };
  if (!conversations) {
    return null;
  };

  return (
    <div>
      <div className={classes.root}>
        <List component="nav" aria-label="main mailbox folders">
          {conversations.map((conversation, index) => (
            <Link to={'/conversation/' + conversation.conversationId}>
            <ListItem button key={index}>
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary={'상대이름: ' + conversation.examiner.nickname}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      내 이름: {conversation.examinee.nickname}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            </Link>
          ))}
        </List>
      </div>
    </div>
  )
};

export default ConversationListPage;