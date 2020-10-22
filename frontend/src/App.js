import React from 'react';

// Bootstrap
import 'bootstrap/dist/css/bootstrap.css'

// Router
import { Route } from 'react-router-dom';

// base
import MainPage from './pages/base/MainPage';
import HomePage from './pages/base/HomePage';

// Accounts
import LoginPage from './pages/accounts/LoginPage';
import SignupPage from './pages/accounts/SignupPage';
import ProfilePage from './pages/accounts/ProfilePage';
import ProfileUpdatePage from './pages/accounts/ProfileUpdatePage';

// Question
import QuestionDetailPage from './pages/question/QuestionDetailPage';
import QuestionCreatePage from './pages/question/QuestionCreatePage';
import QuestionUpdatePage from './pages/question/QuestionUpdatePage';

// Conversation
import ConversationCreatePage from './pages/conversation/ConversationCreatePage';
import ConversationDetail from './pages/conversation/ConversationDetail';
import ConversationListPage from './pages/conversation/ConversationListPage';

const App = () => {
  return (
    <>
      {/* Base */}
      <Route component={HomePage} exact path="/" />
      <Route component={MainPage} path="/main" />

      {/* Accounts */}
      <Route component={LoginPage} path="/login" />
      <Route component={SignupPage} path="/signup" />
      <Route component={ProfilePage} exact path="/:userId" />
      <Route component={ProfileUpdatePage} path="/:userId/update" />

      {/* Question */}
      <Route component={QuestionDetailPage} exact path="/question" />
      <Route component={QuestionCreatePage} path="/question/create" />
      <Route component={QuestionUpdatePage} path="/question/update" />     

      {/* Conversation */}
      <Route component={ConversationCreatePage} exact path="/conversation" />
      <Route component={ConversationDetail} path="/conversation/detail" />
      <Route component={ConversationListPage} path="/conversation/list" /> 

    </>
  );
};

export default App;
