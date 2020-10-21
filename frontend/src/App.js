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

// Question
import QuestionDetailPage from './pages/question/QuestionDetailPage';
import QuestionCreatePage from './pages/question/QuestionCreatePage';

const App = () => {
  return (
    <>
      {/* Base */}
      <Route component={HomePage} exact path="/" />
      <Route component={MainPage} path="/main" />

      {/* Accounts */}
      <Route component={LoginPage} path="/login" />
      <Route component={SignupPage} path="/signup" />

      {/* Question */}
      <Route component={QuestionDetailPage} path="/question" />
      <Route component={QuestionCreatePage} path="/question/create" />
    </>
  );
};

export default App;
