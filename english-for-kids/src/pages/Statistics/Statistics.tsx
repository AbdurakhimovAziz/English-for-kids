import React from 'react';
import './statistics.scss';
import StatsTable from './table';

const Statistics: React.FC = () => {
  return (
    <div className="statistics">
      <div className="container">
        <button>reset</button>
        <StatsTable />
      </div>
    </div>
  );
};

export default Statistics;
