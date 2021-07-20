import React, { useEffect } from 'react';
import { Switch, Route, useLocation, Redirect } from 'react-router-dom';
import useActions from '../../hooks/useActions';
import useTypeSelector from '../../hooks/useTypeSelector';
import ICardStats from '../../models/ICardStats';
import AdminCategories from '../../pages/admin/categories/admin-categories';
import Words from '../../pages/admin/words/words';
import Cards from '../../pages/Cards/Cards';
import Home from '../../pages/Home/Home';
import Statistics from '../../pages/Statistics/Statistics';
import AdminHeader from '../adminHeader/adminHeader';
import Footer from '../footer/footer';
import Header from '../header/header';

export const App = (): JSX.Element => {
  const { fetchCards, stopGame, closeMenu } = useActions();
  const { gameStarted } = useTypeSelector((state) => state.game);
  const { token } = useTypeSelector((state) => state.global);
  const { cardCategories } = useTypeSelector((state) => state.categories);
  const location = useLocation();

  useEffect(() => {
    fetchCards();
  }, []);

  useEffect(() => {
    if (gameStarted) stopGame();
    closeMenu();
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
          wrongClicks: 0,
          correctPersent: 0
        };
        const key = `${card.word}-${card.translation}`;
        if (!localStorage.getItem(key)) localStorage.setItem(key, JSON.stringify(cardStats));
      });
    });
  }, [cardCategories]);

  if (token) {
    return (
      <>
        <AdminHeader />
        <main className="main">
          <div className="container">
            <Switch>
              <Route path="/" exact>
                <AdminCategories />
              </Route>
              <Route path="/:category/words">
                <Words />
              </Route>
              <Redirect to="/" />
            </Switch>
          </div>
        </main>
      </>
    );
  }

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
          <Route path="/statistics">
            <Statistics />
          </Route>
          <Redirect to="/" />
        </Switch>
      </main>
      <Footer />
    </>
  );
};
