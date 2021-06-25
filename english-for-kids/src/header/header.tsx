import React from 'react';
import SideNav from './menu/menu';
import './header.scss';

interface HeaderProps {
  isActive: string;
  handleMenuToggle: React.MouseEventHandler;
  handleOutsideClick: React.MouseEventHandler;
}

const Header: React.FC<HeaderProps> = ({ isActive, handleMenuToggle, handleOutsideClick }) => {
  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header__body">
            <button className={`header__burger burger ${isActive}`} onClick={handleMenuToggle}>
              <span className="burger__line"></span>
            </button>
            <div className="header__toggle">
              <input type="checkbox" />
            </div>
          </div>
        </div>
      </header>
      <SideNav className={isActive} />

      <div className={`overlay ${isActive}`} onClick={handleOutsideClick}></div>
    </>
  );
};

export default Header;
