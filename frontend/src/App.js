import React from 'react';

// Router
import { Route } from 'react-router-dom';

// Accounts
import LoginPage from './pages/accounts/LoginPage';
import SignupPage from './pages/accounts/SignupPage';

const App = () => {
  return (
    <>
      {/* Accounts */}
      <Route component={LoginPage} path="/login" />
      <Route component={SignupPage} path="/signup" />
    </>
  );
};

export default App;
