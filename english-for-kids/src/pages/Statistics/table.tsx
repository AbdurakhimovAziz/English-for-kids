import React from 'react';
import ICardStats from '../../models/ICardStats';

const StatsTable: React.FC = () => {
  const keys = Object.keys(localStorage);
  const cardStatsArr: ICardStats[] = keys.reduce<ICardStats[]>((acc, key) => {
    const word: ICardStats = JSON.parse(localStorage.getItem(key) || '');
    acc.push(word);
    return acc;
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>№</th>
          <th>Word</th>
          <th>Translation</th>
          <th>Category</th>
          <th>Clicks</th>
          <th>Correct clicks</th>
          <th>Wrong clicks</th>
          <th>%</th>
        </tr>
      </thead>
      <tbody>
        {cardStatsArr.map((card, index) => {
          const totalClicks = card.wrongClicks + card.correctClicks;
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{card.word}</td>
              <td>{card.translation}</td>
              <td>{card.category}</td>
              <td>{card.clicks}</td>
              <td>{card.correctClicks}</td>
              <td>{card.wrongClicks}</td>
              <td>{totalClicks > 0 ? +(card.correctClicks / totalClicks).toFixed(2) * 100 : 0}%</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default StatsTable;
