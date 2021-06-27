import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Cards from '../../pages/Cards/Cards';
import Home from '../../pages/Home/Home';
import Header from '../header/header';

export const App = (): JSX.Element => {
  return (
    <Router>
      <Header />
      <main>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/cards">
            <Cards />
          </Route>
        </Switch>
      </main>
    </Router>
  );
};
