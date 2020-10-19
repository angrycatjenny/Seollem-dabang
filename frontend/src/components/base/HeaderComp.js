import React from 'react';
import HeaderLogo from '../../assets/logos/header-logo.png'
import { Navbar } from 'react-bootstrap';

const HeaderComp = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#">
        <img
          alt=""
          src={HeaderLogo}
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{' '}
        프로젝트 이름
      </Navbar.Brand>
    </Navbar>
  );
}

export default HeaderComp;