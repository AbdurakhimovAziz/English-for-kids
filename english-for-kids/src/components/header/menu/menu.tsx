import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import useTypeSelector from '../../../hooks/useTypeSelector';
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
          <NavLink to="/" className={`menu__link `} activeClassName="active" exact>
            Main
          </NavLink>
        </MenuItem>
        {cardCategories.map((category, index) => (
          <MenuItem key={index + 1}>
            <NavLink
              to={{ pathname: CARDS_URL, state: category.categoryName }}
              className={`menu__link `}
              activeClassName="active"
              isActive={() => params.state === category.categoryName}
              exact
            >
              {category.categoryName}
            </NavLink>
          </MenuItem>
        ))}
        <MenuItem>
          <NavLink to="/statistics" className="menu__link" activeClassName="active">
            Statistics
          </NavLink>
        </MenuItem>
      </ul>
    </nav>
  );
};

export default SideNav;
