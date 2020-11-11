import React from 'react';
import KeywordRecommend from '../../components/recommend/KeywordRecommend';
import OtherRecommend from '../../components/recommend/OtherRecommend';
import { useCookies } from 'react-cookie';
import FooterComp from '../../components/base/FooterComp';
import HTMLFlipBook from "react-pageflip";
import './MainPage.css';

const MainPage = () => {
  const [cookies, setCookie] = useCookies(['accessToken']);
  return (
    <div>
      <div className="book">
        <HTMLFlipBook
          width={550} height={600}
          showCover={true}
        >
          <div className="bookpage1"></div>
          <div className="bookpage2">Page 2</div>
          <div className="bookpage3">Page 3</div>
          <div className="bookpage4">Page 4</div>
          <div className="bookpage5">Page 5</div>
          <div className="bookpage6"></div>

        </HTMLFlipBook>
      </div>
      
      <KeywordRecommend />
      <OtherRecommend />
      <FooterComp />
    </div>
  );
};

export default MainPage;