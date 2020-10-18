import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import HeaderLogo from '../../assets/logos/header-logo.png'
import styled from 'styled-components';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

const HeaderLogoImg = styled.img`
  width: 14%;
  margin-right: 3%;
`;

const appBarStyled = {
  background: 'black'
};

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" style={appBarStyled}>
        <Toolbar>
          <HeaderLogoImg src={HeaderLogo} />
          <Typography variant="h6" className={classes.title}>
            프로젝트 이름
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}