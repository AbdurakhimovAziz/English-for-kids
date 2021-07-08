import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import useTypeSelector from '../../../hooks/useTypeSelector';
import { ICard } from '../../../models/ICard';
import { CARDS_URL } from '../../../shared/constants';
import MenuItem from './menu-item';
import './menu.scss';

const SideNav: React.FC<{ className: string }> = ({ className }) => {
  const { cardCategories } = useTypeSelector((state) => state.categories);
  const params = useLocation();

  return (
    <nav id="sideNav" className={`menu bg-info ${className}`}>
      <ul className="menu__list">
        <MenuItem>
          <NavLink to="/" className={`menu__link `} activeClassName="active" exact data-hover="Main">
            Main
          </NavLink>
        </MenuItem>
        {cardCategories.map((category, index) => (
          <MenuItem key={index + 1}>
            <NavLink
              to={{ pathname: CARDS_URL, state: category.cards }}
              className={`menu__link `}
              activeClassName="active"
              isActive={() => (params.state ? (params.state as ICard[])[0].word === category.cards[0].word : false)}
              exact
              data-hover={category.categoryName}
            >
              {category.categoryName}
            </NavLink>
          </MenuItem>
        ))}
        <MenuItem>
          <NavLink to="/statistics" className="menu__link" activeClassName="active" data-hover="Statistics">
            Statistics
          </NavLink>
        </MenuItem>
      </ul>
    </nav>
  );
};

export default SideNav;
