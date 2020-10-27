import React from 'react';

// CSS
import './AnswerResultPage.css';

// Header
import HeaderComp from '../../components/base/HeaderComp';

// Footer
import FooterComp from '../../components/base/FooterComp';

const AnswerResultPage = () => {
  return (
    <div>
      <HeaderComp />
      <h1>답변 결과</h1>
      <FooterComp />
    </div>
  )
};

export default AnswerResultPage;