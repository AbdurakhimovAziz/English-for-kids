import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import useActions from '../../../hooks/useActions';

interface Props {
  children: string;
  link: string;
}

const MenuItem: React.FC<Props> = ({ children, link }) => {
  const { closeMenu } = useActions();
  const params = useLocation();

  return (
    <li className="menu__list-item">
      <NavLink
        to={{ pathname: link, state: children }}
        className={`menu__link `}
        onClick={closeMenu}
        activeClassName="active"
        isActive={() => params.state === children}
      >
        {children}
      </NavLink>
    </li>
  );
};

export default MenuItem;
