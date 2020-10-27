import React from 'react';

// Header
import HeaderComp from '../../components/base/HeaderComp';

// Footer
import FooterComp from '../../components/base/FooterComp';

// CSS
import './ConversationDetailPage.css';

const ConversationDetailPage = () => {
  return (
    <div>
      <HeaderComp />
      <h1>대화 디테일</h1>
      <FooterComp />
    </div>
  )
};

export default ConversationDetailPage;