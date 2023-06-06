import React from 'react';
import ReactLoader from 'react-loader-spinner';
import './loader.scss';

const Loader: React.FC = () => {
  return (
    <div className="loader">
      <ReactLoader type="ThreeDots" color="#ff4e50" />
    </div>
  );
};

export default Loader;
