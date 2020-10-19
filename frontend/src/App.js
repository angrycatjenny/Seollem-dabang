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

// Exam
import ExamDetailPage from './pages/exam/ExamDetailPage';
import ExamCreatePage from './pages/exam/ExamCreatePage';

const App = () => {
  return (
    <>
      {/* base */}
      <Route component={HomePage} exact path="/" />
      <Route component={MainPage} path="/main" />

      {/* Accounts */}
      <Route component={LoginPage} path="/login" />
      <Route component={SignupPage} path="/signup" />

      {/* exam */}
      <Route component={ExamDetailPage} path="/exam" />
      <Route component={ExamCreatePage} path="/exam/create" />
    </>
  );
};

export default App;
