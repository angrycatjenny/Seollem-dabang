import React from 'react';
import { useCookies } from 'react-cookie';
import { Route, withRouter, Switch } from 'react-router-dom';
import MainPage from './pages/base/MainPage';
import HomePage from './pages/base/HomePage';
import LoginPage from './pages/accounts/LoginPage';
import SignupPage from './pages/accounts/SignupPage';
import MyProfilePage from './pages/accounts/MyProfilePage';
import MyProfileUpdatePage from './pages/accounts/MyProfileUpdatePage';
import YourProfilePage from './pages/accounts/YourProfilePage';
import QuestionCreatePage from './pages/question/QuestionCreatePage';
import QuestionListPage from './pages/question/QuestionListPage';
import QuestionDetailPage from './pages/question/QuestionDetailPage';
import AnswerCreatePage from './pages/answer/AnswerCreatePage';
import AnswerResultPage from './pages/answer/AnswerResultPage';
import ConversationListPage from './pages/conversation/ConversationListPage';
import ConversationDetailPage from './pages/conversation/ConversationDetailPage';
import HeaderComp from './components/base/HeaderComp';
import FooterComp from './components/base/FooterComp';
import PostCreatePage from './pages/post/PostCreatePage';
import PostListPage from './pages/post/PostListPage';
import PostUpdatePage from './pages/post/PostUpdatePage';
import CallPage from './pages/call/CallPage';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

const App = () => {
  const [cookies, setCookie] = useCookies(['accessToken']);

  return (
    <>
      <Switch>
        <Route component={HomePage} exact path="/" />
        <Route component={LoginPage} path="/login" />
        <Route component={SignupPage} path="/signup" />

        <div className="container app-template">
          {cookies.accessToken && <HeaderComp />}
          <Route component={MainPage} path="/main" />
          <Route component={MyProfilePage} exact path="/profile" />
          <Route component={MyProfileUpdatePage} path="/myprofile/update" />
          <Route component={YourProfilePage} path="/yourprofile/:userId" />
          <Route component={QuestionListPage} exact path="/question" />
          <Route component={QuestionCreatePage} path="/question/create" />
          <Route component={QuestionDetailPage} path="/question/detail" />
          <Route component={AnswerCreatePage} path="/answer/:userId" />
          <Route component={AnswerResultPage} path="/result" />
          <Route component={ConversationListPage} exact path="/conversation" />
          <Route component={ConversationDetailPage} path="/conversation/:conversationId" />
          <Route component={PostCreatePage} exact path="/post/create" />
          <Route component={PostListPage} path="/post/list" />
          <Route component={PostUpdatePage} path="/post/update/:postId" />
          <Route component={CallPage} path="/call/:conversationId" />
          {cookies.accessToken && <FooterComp />}
          <div className="footer-footer"></div>
        </div>
      </Switch>
    </>
  );
};

export default withRouter(App);
