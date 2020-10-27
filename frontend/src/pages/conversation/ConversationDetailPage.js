import React from 'react';

// Header
import HeaderComp from '../../components/base/HeaderComp';

// Footer
import FooterComp from '../../components/base/FooterComp';

// CSS
import './ConversationDetailPage.css';

// Chat
import { ThemeProvider } from '@livechat/ui-kit';

const theme = {
  vars: {
      'primary-color': '#427fe1',
      'secondary-color': '#fbfbfb',
      'tertiary-color': '#fff',
      'avatar-border-color': 'blue',
  },
  AgentBar: {
      Avatar: {
          size: '42px',
      },
      css: {
          backgroundColor: 'var(--secondary-color)',
          borderColor: 'var(--avatar-border-color)',
      }
  },
  Message: {
      css: {
          fontWeight: 'bold',
      },
  },
}

const ConversationDetailPage = () => {
  return (
    <div>
      <HeaderComp />
      <h1>대화 디테일</h1>
      <ThemeProvider>

      </ThemeProvider>
      <FooterComp />
    </div>
  )
};

export default ConversationDetailPage;