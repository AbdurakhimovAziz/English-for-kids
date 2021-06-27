import React from 'react';
import useTypeSelector from '../../../hooks/useTypeSelector';
import MenuItem from './menu-item';
import './menu.scss';

const SideNav: React.FC<{ className: string }> = ({ className }) => {
  const { cardCategories } = useTypeSelector((state) => state.cards);

  return (
    <nav id="sideNav" className={`menu bg-info ${className}`}>
      <ul className="menu__list">
        <MenuItem link="/">Main</MenuItem>
        {cardCategories &&
          cardCategories.map((category, index) => (
            <MenuItem link="/cards" key={index}>
              {category.category}
            </MenuItem>
          ))}
      </ul>
    </nav>
  );
};

export default SideNav;
