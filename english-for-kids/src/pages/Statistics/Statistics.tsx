import React from 'react';
import ICardStats from '../../models/ICardStats';
import './statistics.scss';
import StatsTable from './table';

const Statistics: React.FC = () => {
  const keys = Object.keys(localStorage);
  const cardStatsArr: ICardStats[] = keys.reduce<ICardStats[]>((acc, key) => {
    const word: ICardStats = JSON.parse(localStorage.getItem(key) || '');
    acc.push(word);
    return acc;
  }, []);

  return (
    <div className="statistics">
      <div className="container">
        <button>reset</button>
        <button>train difficult</button>
        <StatsTable cardStatsArr={cardStatsArr} />
      </div>
    </div>
  );
};

export default Statistics;
