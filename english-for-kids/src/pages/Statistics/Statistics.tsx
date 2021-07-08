import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useTypeSelector from '../../hooks/useTypeSelector';
import { ICard } from '../../models/ICard';
import ICardStats from '../../models/ICardStats';
import { CARDS_URL } from '../../shared/constants';
import './statistics.scss';
import StatsTable from './table';

const Statistics: React.FC = () => {
  const { cardCategories } = useTypeSelector((state) => state.categories);

  const keys = Object.keys(localStorage);
  const [cardStatsArr, setCardStatsArr] = useState<ICardStats[]>(
    keys.reduce<ICardStats[]>((acc, key) => {
      const word: ICardStats = JSON.parse(localStorage.getItem(key) || '');
      acc.push(word);
      return acc;
    }, [])
  );
  const resetStats = () => {
    setCardStatsArr((prev) =>
      prev.map<ICardStats>((_, index) => {
        const currStats = JSON.parse(localStorage.getItem(keys[index]) || '');
        const newStats: ICardStats = { ...currStats, correctClicks: 0, clicks: 0, wrongClicks: 0, correctPersent: 0 };
        localStorage.setItem(keys[index], JSON.stringify(newStats));
        return newStats;
      })
    );
  };

  const diffCategory: ICardStats[] = cardStatsArr
    .sort((a, b) => (a.wrongClicks > b.wrongClicks ? -1 : 1))
    .filter((card) => card.wrongClicks !== 0);

  let cards: (ICard | undefined)[] = diffCategory.map((word) =>
    cardCategories
      .find((category) => category.categoryName === word.category)
      ?.cards.find((card) => card.translation === word.translation)
  );
  cards = cards.length < 9 ? cards : cards.slice(0, 8);
  console.log(cards);

  return (
    <div className="stats">
      <div className="container">
        <div className="stats__btns">
          <button className="btn btn-reset stats__btn" onClick={resetStats}>
            reset
          </button>
          <Link className="btn btn-train stats__btn" to={{ pathname: CARDS_URL, state: cards }}>
            train difficult
          </Link>
        </div>
        <StatsTable cardStatsArr={cardStatsArr} />
      </div>
    </div>
  );
};

export default Statistics;
