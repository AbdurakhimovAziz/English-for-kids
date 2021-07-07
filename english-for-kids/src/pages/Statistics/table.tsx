import React, { useState } from 'react';
import ICardStats from '../../models/ICardStats';
import { CardStatsProps } from '../../shared/constants';

const StatsTable: React.FC<{ cardStatsArr: ICardStats[] }> = ({ cardStatsArr }) => {
  const [sortBy, setSortBy] = useState<CardStatsProps>(CardStatsProps.category);

  return (
    <div className="stats-table__container">
      <table className="stats-table">
        <thead>
          <tr>
            <th>№</th>
            <th onClick={() => setSortBy(CardStatsProps.word)}>Word</th>
            <th onClick={() => setSortBy(CardStatsProps.translation)}>Translation</th>
            <th onClick={() => setSortBy(CardStatsProps.category)}>Category</th>
            <th onClick={() => setSortBy(CardStatsProps.clicks)}>Clicks</th>
            <th onClick={() => setSortBy(CardStatsProps.correctClicks)}>Correct clicks</th>
            <th onClick={() => setSortBy(CardStatsProps.wrongClicks)}>Wrong clicks</th>
            <th onClick={() => setSortBy(CardStatsProps.error)}>error (%)</th>
          </tr>
        </thead>
        <tbody>
          {cardStatsArr
            .sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1))
            .map((card, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{card.word}</td>
                  <td>{card.translation}</td>
                  <td>{card.category}</td>
                  <td>{card.clicks}</td>
                  <td>{card.correctClicks}</td>
                  <td>{card.wrongClicks}</td>
                  <td>{card.error}%</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default StatsTable;
