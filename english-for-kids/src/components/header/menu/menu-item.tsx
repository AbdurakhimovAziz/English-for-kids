import React from 'react';
import { NavLink } from 'react-router-dom';

interface Props {
  children: string;
  link: string;
  // onclick: React.MouseEventHandler;
}

const MenuItem: React.FC<Props> = ({ children, link }) => {
  return (
    <li className="menu__list-item">
      <NavLink activeClassName="active" exact to={link} className="menu__link">
        {children}
      </NavLink>
    </li>
  );
};

export default MenuItem;
