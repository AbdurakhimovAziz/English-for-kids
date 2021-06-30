import * as React from 'react';
import { useLocation } from 'react-router-dom';
import useTypeSelector from '../../hooks/useTypeSelector';

const Cards: React.FC = () => {
  const { cardCategories } = useTypeSelector((state) => state.categories);
  const params = useLocation();
  const currentCategory = cardCategories.find((category) => category.categoryName === params.state);

  return (
    <div className="cards">
      <h1>Cards</h1>
      <p>{currentCategory?.categoryName}</p>
      <div className="cards__row">
        {currentCategory?.cards.map((card, index) => (
          <div className="card" key={index}>
            <div className="card__front" style={{ backgroundImage: `url(./public/${card.image})` }}>
              <div className="card__title title--black">{card.word}</div>
            </div>
            <div className="card__back" style={{ backgroundImage: `url(./public/${card.image})` }}>
              <div className="card__title title--black">{card.translation}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;
