import * as React from 'react';
import { useLocation } from 'react-router-dom';
import useTypeSelector from '../../hooks/useTypeSelector';

const Cards: React.FC = () => {
  const { cardCategories } = useTypeSelector((state) => state.cards);
  const params = useLocation();
  const currentCategory = cardCategories.find((category) => category.category === params.state);
  const cards = currentCategory?.cards.map((card) => card.word);

  return (
    <div className="cards">
      <h1>Cards</h1>
      <p>{currentCategory?.category}</p>
      <p>{cards?.join(' ')}</p>
    </div>
  );
};

export default Cards;
