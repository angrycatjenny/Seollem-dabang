import React from 'react';
import KeywordRecommend from '../../components/recommend/KeywordRecommend';
import OtherRecommend from '../../components/recommend/OtherRecommend';

const MainPage = () => {
  return (
    <div>
      <KeywordRecommend />
      <OtherRecommend />
    </div>
  );
};

export default MainPage;