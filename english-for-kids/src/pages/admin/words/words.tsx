import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Word from '../../../components/word/word';
import { ICard } from '../../../models/ICard';
import './words.scss';

const Words: React.FC = () => {
  const params = useParams();
  const location = useLocation();
  const cards = location.state as ICard[];
  console.log(params);

  return (
    <div className="words">
      {cards.map((card, index) => {
        return <Word word={card} key={index} />;
      })}
    </div>
  );
};

export default Words;
