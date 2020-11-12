import React from 'react';
import KeywordRecommend from "../../components/recommend/KeywordRecommend.js"
import OtherRecommend from "../../components/recommend/OtherRecommend.js"
import './MainPage.css';

const MainPage = () => {

  return (
    <div className="wrapper-background">
      <div className="wrapper">
        <KeywordRecommend/>
        <OtherRecommend/>
      </div>
    </div>
  );
}

export default MainPage;