import React, { useRef, useState } from 'react';
import SideNav from './menu/menu';
import './header.scss';

interface HeaderProps {
  isActive: string;
  handleMenuToggle: React.MouseEventHandler;
  handleOutsideClick: React.MouseEventHandler;
}

const Header: React.FC<HeaderProps> = ({ isActive, handleMenuToggle, handleOutsideClick }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleAppModeToggle: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setIsChecked(e.target.checked);
  };

  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header__body">
            <button className={`header__burger burger ${isActive}`} onClick={handleMenuToggle}>
              <span className="burger__line"></span>
            </button>
            <label className="header__toggle">
              <input type="checkbox" onChange={handleAppModeToggle} />
              <span className="header__toggle-text">
                <span>{isChecked ? 'Play' : 'Train'}</span>
              </span>
            </label>
          </div>
        </div>
      </header>
      <SideNav className={isActive} />

      <div className={`overlay ${isActive}`} onClick={handleOutsideClick}></div>
    </>
  );
};

export default Header;
