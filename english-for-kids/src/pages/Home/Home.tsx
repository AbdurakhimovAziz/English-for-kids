import * as React from 'react';
import { NavLink } from 'react-router-dom';
import useTypeSelector from '../../hooks/useTypeSelector';
import { CARDS_URL } from '../../shared/constants';

const Home: React.FC = () => {
  const { cardCategories } = useTypeSelector((state) => state.categories);

  return (
    <div className="categories">
      <h1>Categories</h1>
      <p>
        {cardCategories.map((cat, index) => (
          <NavLink style={{ display: 'block' }} to={{ pathname: CARDS_URL, state: cat.category }} key={index}>
            {cat.category}
          </NavLink>
        ))}
      </p>
    </div>
  );
};

export default Home;
