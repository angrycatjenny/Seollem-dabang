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
import MyProfilePage from './pages/accounts/MyProfilePage';
import MyProfileUpdatePage from './pages/accounts/MyProfileUpdatePage';
import YourProfilePage from './pages/accounts/YourProfilePage';

// Question
import QuestionListPage from './pages/question/QuestionListPage'; 
import QuestionCreatePage from './pages/question/QuestionCreatePage';

// Answer
import AnswerCreatePage from './pages/answer/AnswerCreatePage';
import AnswerResultPage from './pages/answer/AnswerResultPage';

// Conversation
import ConversationListPage from './pages/conversation/ConversationListPage';
import ConversationDetailPage from './pages/conversation/ConversationDetailPage';

const App = () => {
  return (
    <>
      {/* Base */}
      <Route component={HomePage} exact path="/" />
      <Route component={MainPage} path="/main" />

      {/* Accounts */}
      <Route component={LoginPage} path="/login" />
      <Route component={SignupPage} path="/signup" />
      <Route component={MyProfilePage} exact path="/profile/" />
      <Route component={MyProfileUpdatePage} path="/myprofile/update" />
      <Route component={YourProfilePage} exact path="/yourprofile/:userId" />

      {/* Question */}
      <Route component={QuestionListPage} exact path="/question" />
      <Route component={QuestionCreatePage} path="/question/create" />

      {/* Answer */}
      <Route component={AnswerCreatePage} path="/answer" />
      <Route component={AnswerResultPage} path="/result" />

      {/* Conversation */}
      <Route component={ConversationListPage} exact path="/conversation" /> 
      <Route component={ConversationDetailPage} path="/conversation/:conversationId" />
    </>
  );
};

export default App;
