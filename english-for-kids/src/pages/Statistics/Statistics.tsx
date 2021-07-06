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
  // const cardStatsArr: ICardStats[] =
  const resetStats = () => {
    setCardStatsArr((prev) =>
      prev.map<ICardStats>((_, index) => {
        const currStats = JSON.parse(localStorage.getItem(keys[index]) || '');
        const newStats = { ...currStats, correctClicks: 0, clicks: 0, wrongClicks: 0 };
        localStorage.setItem(keys[index], JSON.stringify(newStats));
        return newStats;
      })
    );
  };

  return (
    <div className="statistics">
      <div className="container">
        <button onClick={resetStats}>reset</button>
        <button>train difficult</button>
        <StatsTable cardStatsArr={cardStatsArr} />
      </div>
    </div>
  );
};

export default Statistics;
