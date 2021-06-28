import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import useActions from '../../../hooks/useActions';
import useTypeSelector from '../../../hooks/useTypeSelector';
import { CARDS_URL } from '../../../shared/constants';
import MenuItem from './menu-item';
import './menu.scss';

const SideNav: React.FC<{ className: string }> = ({ className }) => {
  const { cardCategories } = useTypeSelector((state) => state.categories);
  const { closeMenu } = useActions();
  const params = useLocation();

  return (
    <nav id="sideNav" className={`menu bg-info ${className}`}>
      <ul className="menu__list">
        <MenuItem>
          <NavLink to="/" className={`menu__link `} onClick={closeMenu} activeClassName="active" exact>
            Main
          </NavLink>
        </MenuItem>
        {cardCategories.map((category, index) => (
          <MenuItem key={index + 1}>
            <NavLink
              to={{ pathname: CARDS_URL, state: category.category }}
              className={`menu__link `}
              onClick={closeMenu}
              activeClassName="active"
              isActive={() => params.state === category.category}
              exact
            >
              {category.category}
            </NavLink>
          </MenuItem>
        ))}
      </ul>
    </nav>
  );
};

export default SideNav;
