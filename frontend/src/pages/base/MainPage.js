import React from 'react';
import KeywordRecommend from '../../components/recommend/KeywordRecommend';
import OtherRecommend from '../../components/recommend/OtherRecommend';
import { useCookies } from 'react-cookie';
import FooterComp from '../../components/base/FooterComp';

const MainPage = () => {
  const [cookies, setCookie] = useCookies(['accessToken']);
  return (
    <div>
      <KeywordRecommend />
      <OtherRecommend />
      <FooterComp />
    </div>
  );
};

export default MainPage;