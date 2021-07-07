import React, { useState } from 'react';
import ICardStats from '../../models/ICardStats';
import './statistics.scss';
import StatsTable from './table';

const Statistics: React.FC = () => {
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
        const newStats: ICardStats = { ...currStats, correctClicks: 0, clicks: 0, wrongClicks: 0, error: 0 };
        localStorage.setItem(keys[index], JSON.stringify(newStats));
        return newStats;
      })
    );
  };

  return (
    <div className="stats">
      <div className="container">
        <div className="stats__btns">
          <button className="btn btn-reset stats__btn" onClick={resetStats}>
            reset
          </button>
          <button className="btn btn-train stats__btn">train difficult</button>
        </div>
        <StatsTable cardStatsArr={cardStatsArr} />
      </div>
    </div>
  );
};

export default Statistics;
