import React from 'react';
import KeywordRecommend from '../../components/recommend/KeywordRecommend';
import OtherRecommend from '../../components/recommend/OtherRecommend';

const MainPage = () => {
  return (
    <div>
      <h1>메인 페이지</h1>
      <KeywordRecommend />
      <OtherRecommend />
    </div>
  );
};

export default MainPage;