import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import useActions from '../../hooks/useActions';
import './adminHeader.scss';

const AdminHeader: React.FC = () => {
  const location = useLocation();
  const { setToken } = useActions();
  const logoutHandler = () => {
    setToken({ token: '' });
  };
  return (
    <header className="admin-header">
      <div className="container">
        <div className="admin-header__body">
          <nav className="admin-header__nav">
            <NavLink to="/" activeClassName="active" exact className="admin-header__link">
              Categories
            </NavLink>
            <NavLink
              to=""
              activeClassName="active"
              className="admin-header__link"
              style={{ pointerEvents: 'none' }}
              isActive={() => location.pathname.includes('/words')}
            >
              Words
            </NavLink>
          </nav>
          <button onClick={logoutHandler}>Logout</button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
