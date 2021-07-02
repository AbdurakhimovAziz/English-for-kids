import React from 'react';
import SideNav from './menu/menu';
import useActions from '../../hooks/useActions';
import useTypeSelector from '../../hooks/useTypeSelector';
import './header.scss';

const Header: React.FC = () => {
  const { isMenuVisible, isPlayMode } = useTypeSelector((state) => state.global);
  const { toggleMenu, closeMenu, toggleAppMode, stopGame } = useActions();

  const appModeHandler = () => {
    toggleAppMode();
    if (!isPlayMode) stopGame();
  };

  const handleOutsideClick: React.MouseEventHandler = (e): void => {
    if ((e.target as HTMLElement).closest('.overlay')) closeMenu();
  };

  const isActive = isMenuVisible ? 'active' : '';
  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header__body">
            <button className={`header__burger burger ${isActive}`} onClick={toggleMenu}>
              <span className="burger__line"></span>
            </button>
            <label className="header__toggle">
              <input type="checkbox" onChange={appModeHandler} />
              <span className="header__toggle-text">
                <span>{isPlayMode ? 'Play' : 'Train'}</span>
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
