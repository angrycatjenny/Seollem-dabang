import React from 'react';
import HeaderComp from '../../components/base/HeaderComp';
import FooterComp from '../../components/base/FooterComp';
import KeywordRecommend from '../../components/recommend/KeywordRecommend';
import OtherRecommend from '../../components/recommend/OtherRecommend';

const MainPage = () => {
  return (
    <div>
      <HeaderComp />
      <h1>메인 페이지</h1>
      <KeywordRecommend />
      <OtherRecommend />
      <FooterComp />
    </div>
  );
};

export default MainPage;