import React, { useEffect, useState } from 'react';
import { ICategory } from '../../../models/ICategory';
import MenuItem from './menu-item';
import './menu.scss';

const SideNav: React.FC<{ className: string }> = ({ className }) => {
  const [categories, setCategories] = useState<ICategory[] | null>(null);
  const getCategories = async () => {
    const response = await fetch('./public/cards.json');
    const data: ICategory[] = await response.json();
    setCategories(data);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <nav id="sideNav" className={`menu bg-info ${className}`}>
      <ul className="menu__list">
        <MenuItem link="/">Main</MenuItem>
        {categories &&
          categories.map((category, index) => (
            <MenuItem link="/cards" key={index}>
              {category.category}
            </MenuItem>
          ))}
      </ul>
    </nav>
  );
};

export default SideNav;
