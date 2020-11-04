import React from 'react';

/// Axios
import axios from 'axios';

// React Router Dom
import { Link } from 'react-router-dom';

// History
import { useHistory } from "react-router-dom";

// CSS
import './PostListPage.css';
// Footer
import FooterComp from '../../components/base/FooterComp';

const PostListPage = () => {
  return (
    <div>
      <h1>게시물 목록 페이지</h1>
      <FooterComp/>
    </div>
  )
}

export default PostListPage;