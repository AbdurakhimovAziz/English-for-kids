import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import useActions from '../../hooks/useActions';
import Cards from '../../pages/Cards/Cards';
import Home from '../../pages/Home/Home';
import Header from '../header/header';

export const App = (): JSX.Element => {
  const { fetchCards } = useActions();
  useEffect(() => {
    fetchCards();
  }, []);

  return (
    <Router>
      <Header />
      <main className="main">
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
