import React from 'react';
import { NavLink } from 'react-router-dom';
import useActions from '../../../hooks/useActions';

interface Props {
  children: string;
  link: string;
}

const MenuItem: React.FC<Props> = ({ children, link }) => {
  const { closeMenu } = useActions();

  return (
    <li className="menu__list-item">
      <NavLink
        activeClassName="active"
        exact
        to={{ pathname: link, state: children }}
        className="menu__link"
        onClick={closeMenu}
      >
        {children}
      </NavLink>
    </li>
  );
};

export default MenuItem;
