import React, { useEffect } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import useActions from '../../hooks/useActions';
import useTypeSelector from '../../hooks/useTypeSelector';
import ICardStats from '../../models/ICardStats';
import Cards from '../../pages/Cards/Cards';
import Home from '../../pages/Home/Home';
import Header from '../header/header';

export const App = (): JSX.Element => {
  const { fetchCards, stopGame } = useActions();
  const { gameStarted } = useTypeSelector((state) => state.game);
  const { cardCategories } = useTypeSelector((state) => state.categories);
  const location = useLocation();

  useEffect(() => {
    fetchCards();
  }, []);

  useEffect(() => {
    if (gameStarted) stopGame();
  }, [location]);

  useEffect(() => {
    cardCategories.forEach((category) => {
      category.cards.forEach((card) => {
        const cardStats: ICardStats = {
          word: card.word,
          translation: card.translation,
          category: category.categoryName,
          clicks: 0,
          correctClicks: 0,
          wrongClicks: 0
        };

        localStorage.setItem(`${card.word}-${card.translation}`, JSON.stringify(cardStats));
      });
    });
  }, [cardCategories]);

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
