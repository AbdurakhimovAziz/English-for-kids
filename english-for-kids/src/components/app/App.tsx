import React, { useEffect } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import useActions from '../../hooks/useActions';
import useTypeSelector from '../../hooks/useTypeSelector';
import Cards from '../../pages/Cards/Cards';
import Home from '../../pages/Home/Home';
import Header from '../header/header';

export const App = (): JSX.Element => {
  const { fetchCards, stopGame } = useActions();
  const { gameStarted } = useTypeSelector((state) => state.game);
  const location = useLocation();

  useEffect(() => {
    fetchCards();
  }, []);

  useEffect(() => {
    if (gameStarted) stopGame();
  }, [location]);

  return (
    <>
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
    </>
  );
};
