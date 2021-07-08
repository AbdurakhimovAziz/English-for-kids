import React, { useState } from 'react';
import ICardStats from '../../models/ICardStats';
import { CardStatsProps } from '../../shared/constants';

const StatsTable: React.FC<{ cardStatsArr: ICardStats[] }> = ({ cardStatsArr }) => {
  const [sortBy, setSortBy] = useState<CardStatsProps>(CardStatsProps.category);
  const [sortOrder, setSortOrder] = useState('');

  const clickHandler = (e: React.MouseEvent, str: CardStatsProps) => {
    const el = e.target as HTMLElement;
    const order = el.dataset.order || '';
    if (!order || order === 'desc') {
      el.dataset.order = 'asc';
      setSortOrder('asc');
      setSortBy(str);
      return;
    }
    if (order === 'asc') {
      el.dataset.order = 'desc';
      setSortOrder('desc');
    }

    setSortBy(str);
  };

  return (
    <div className="stats-table__container">
      <table className="stats-table">
        <thead>
          <tr>
            <th>№</th>
            <th onClick={(e) => clickHandler(e, CardStatsProps.word)}>Word</th>
            <th onClick={(e) => clickHandler(e, CardStatsProps.translation)}>Translation</th>
            <th onClick={(e) => clickHandler(e, CardStatsProps.category)}>Category</th>
            <th onClick={(e) => clickHandler(e, CardStatsProps.clicks)}>Clicks</th>
            <th onClick={(e) => clickHandler(e, CardStatsProps.correctClicks)}>Correct clicks</th>
            <th onClick={(e) => clickHandler(e, CardStatsProps.wrongClicks)}>Wrong clicks</th>
            <th onClick={(e) => clickHandler(e, CardStatsProps.correctPersent)}>correct (%)</th>
          </tr>
        </thead>
        <tbody>
          {cardStatsArr
            .sort((a, b) => {
              if (sortOrder === 'desc') return a[sortBy] < b[sortBy] ? 1 : -1;
              return a[sortBy] > b[sortBy] ? 1 : -1;
            })
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
                  <td>{card.correctPersent}%</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default StatsTable;
