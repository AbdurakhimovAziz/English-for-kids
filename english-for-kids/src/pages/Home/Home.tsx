import * as React from 'react';
import { NavLink } from 'react-router-dom';
import useTypeSelector from '../../hooks/useTypeSelector';
import { CARDS_URL } from '../../shared/constants';
import './home.scss';

const Home: React.FC = () => {
  const { cardCategories } = useTypeSelector((state) => state.categories);

  return (
    <>
      <div className="container">
        <h1>Categories</h1>
        <div className="categories cards__row">
          {cardCategories.map((category, index) => (
            <NavLink
              className="categories__card card"
              to={{ pathname: CARDS_URL, state: category.categoryName }}
              key={index}
            >
              <div className="categories__card-img">
                <img src={`./public/${category.cards[0].image}`} />
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
