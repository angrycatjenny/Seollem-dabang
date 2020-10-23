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

// Answer
import AnswerListPage from './pages/answer/AnswerListPage';
import AnswerCreatePage from './pages/answer/AnswerCreatePage';

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
      <Route component={ProfilePage} exact path="/profile/:userId" />
      <Route component={ProfileUpdatePage} path="/profile/:userId/update" />

      {/* Question */}
      <Route component={QuestionDetailPage} exact path="/question" />
      <Route component={QuestionCreatePage} path="/question/create" />
      <Route component={QuestionUpdatePage} path="/question/:questionId/update" />

      {/* Answer */}
      <Route component={AnswerListPage} exact path="/answer" />
      <Route component={AnswerCreatePage} path="/answer/create" />

      {/* Conversation */}
      <Route component={ConversationListPage} exact path="/conversation" /> 
      <Route component={ConversationCreatePage} path="/conversation/create" />
      <Route component={ConversationDetail} path="/conversation/:conversationId" />
    </>
  );
};

export default App;
