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
import QuestionListPage from './pages/question/QuestionListPage'; 
import QuestionDetailPage from './pages/question/QuestionDetailPage';//detail 수정 필요
import QuestionCreatePage from './pages/question/QuestionCreatePage';
import QuestionUpdatePage from './pages/question/QuestionUpdatePage';

// Answer
import AnswerCreatePage from './pages/answer/AnswerCreatePage';
import AnswerResultPage from './pages/answer/AnswerResultPage';

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
      <Route component={QuestionListPage} path="/questions" />
      <Route component={QuestionDetailPage} exact path="/question" />
      <Route component={QuestionCreatePage} path="/question/create" />
      <Route component={QuestionUpdatePage} path="/question/:questionId/update" />

      {/* Answer */}
      <Route component={AnswerCreatePage} path="/answer" />
      <Route component={AnswerResultPage} path="/result" />

      {/* Conversation */}
      <Route component={ConversationListPage} exact path="/conversation" /> 
      <Route component={ConversationCreatePage} path="/conversation/create" />
      <Route component={ConversationDetail} path="/conversation/:conversationId" />
    </>
  );
};

export default App;
