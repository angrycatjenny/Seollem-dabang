import React from 'react';
import { Navbar } from 'react-bootstrap';

const FooterComp = () => {
  return (
    <Navbar bg="dark" variant="dark" className="fixed-bottom">
      <Navbar.Brand href="#">
        푸터
      </Navbar.Brand>
    </Navbar>
  );
}

export default FooterComp;