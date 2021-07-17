import * as React from 'react';
import { NavLink } from 'react-router-dom';
import useTypeSelector from '../../hooks/useTypeSelector';
import { CARDS_URL } from '../../shared/constants';
import './home.scss';

const Home: React.FC = () => {
  const { cardCategories } = useTypeSelector((state) => state.categories);
  const { isPlayMode } = useTypeSelector((state) => state.global);

  return (
    <>
      <div className="container">
        <div className={`categories cards__row ${isPlayMode ? 'play-mode' : ''}`}>
          {cardCategories.map((category, index) => (
            <NavLink className="categories__card card" to={{ pathname: CARDS_URL, state: category.cards }} key={index}>
              <div className="categories__card-img">
                <img src={`${category.cards[0]?.image}`} />
              </div>
              <div className="categories__card-title">{category.categoryName}</div>
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
