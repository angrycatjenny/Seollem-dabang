import React from 'react';

// Bootstrap
import 'bootstrap/dist/css/bootstrap.css'

// Router
import { Route } from 'react-router-dom';

// base
import MainPage from './pages/base/MainPage';

// Accounts
import LoginPage from './pages/accounts/LoginPage';
import SignupPage from './pages/accounts/SignupPage';

const App = () => {
  return (
    <>
      {/* base */}
      <Route component={MainPage} path="/" />

      {/* Accounts */}
      <Route component={LoginPage} path="/login" />
      <Route component={SignupPage} path="/signup" />
    </>
  );
};

export default App;
