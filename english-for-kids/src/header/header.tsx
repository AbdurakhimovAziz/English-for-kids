import React, { useState } from 'react';
import SideNav from './menu/menu';
import './header.scss';

const Header: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const clickHandler: React.MouseEventHandler = (e) => {
    setShowMenu((prev) => !prev);
    // document.addEventListener()
  };
  const handleOutsideClick: React.MouseEventHandler = (e): void => {
    if ((e.target as HTMLElement).closest('.overlay')) setShowMenu(false);
  };

  const isActive = showMenu ? 'active' : '';
  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header__body">
            <button className={`header__burger burger ${isActive}`} onClick={clickHandler}>
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
