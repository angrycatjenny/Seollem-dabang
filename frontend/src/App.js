import React from 'react';

// Bootstrap
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

// Router
import { Route, withRouter, Switch } from 'react-router-dom';

// Base
import MainPage from './pages/base/MainPage';
import HomePage from './pages/base/HomePage';

// Accounts
import LoginPage from './pages/accounts/LoginPage';
import SignupPage from './pages/accounts/SignupPage';
import MyProfilePage from './pages/accounts/MyProfilePage';
import MyProfileUpdatePage from './pages/accounts/MyProfileUpdatePage';
import YourProfilePage from './pages/accounts/YourProfilePage';

// Question
import QuestionCreatePage from './pages/question/QuestionCreatePage';
import QuestionListPage from './pages/question/QuestionListPage';
import QuestionDetailPage from './pages/question/QuestionDetailPage';

// Answer
import AnswerCreatePage from './pages/answer/AnswerCreatePage';
import AnswerResultPage from './pages/answer/AnswerResultPage';

// Conversation
import ConversationListPage from './pages/conversation/ConversationListPage';
import ConversationDetailPage from './pages/conversation/ConversationDetailPage';

// Header
import HeaderComp from './components/base/HeaderComp';

// PageNotFound
import PageNotFound from './pages/base/PageNotFound';

// Post
import PostCreatePage from './pages/post/PostCreatePage';
import PostListPage from './pages/post/PostListPage';
import PostUpdatePage from './pages/post/PostUpdatePage';

// Call
import CallPage from './pages/call/CallPage';

import { useCookies } from 'react-cookie';

const App = () => {
  const [cookies, setCookie] = useCookies(['accessToken']);

  return (
    <div className="container app-template">
      {/* Header */}
      {cookies.accessToken && <HeaderComp />}
      <Switch>
        {/* Base */}
        <Route component={HomePage} exact path="/" />
        <Route component={MainPage} path="/main" />

        {/* Accounts */}
        <Route component={LoginPage} path="/login" />
        <Route component={SignupPage} path="/signup" />
        <Route component={MyProfilePage} exact path="/profile" />
        <Route component={MyProfileUpdatePage} path="/myprofile/update" />
        <Route component={YourProfilePage} path="/yourprofile/:userId" />

        {/* Question */}
        <Route component={QuestionListPage} exact path="/question" />
        <Route component={QuestionCreatePage} path="/question/create" />
        <Route component={QuestionDetailPage} path="/question/detail" />

        {/* Answer */}
        <Route component={AnswerCreatePage} path="/answer/:userId" />
        <Route component={AnswerResultPage} path="/result" />

        {/* Conversation */}
        <Route component={ConversationListPage} exact path="/conversation" />
        <Route component={ConversationDetailPage} path="/conversation/:conversationId" />

        {/* Conversation */}
        <Route component={PostCreatePage} exact path="/post/create" />
        <Route component={PostListPage} path="/post/list" />
        <Route component={PostUpdatePage} path="/post/update/:postId" />
        
        {/* Call */}
        <Route component={CallPage} path="/call" />

        {/* PageNotFound */}
        <Route component={PageNotFound} path='*' />

      </Switch>
    </div>
  );
};

export default withRouter(App);
