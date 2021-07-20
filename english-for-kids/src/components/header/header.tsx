import React, { useState } from 'react';
import SideNav from './menu/menu';
import useActions from '../../hooks/useActions';
import useTypeSelector from '../../hooks/useTypeSelector';
import './header.scss';
import Login from '../login/login';

const Header: React.FC = () => {
  const { isMenuVisible, isPlayMode } = useTypeSelector((state) => state.global);
  const { gameStarted } = useTypeSelector((state) => state.game);
  const { toggleMenu, closeMenu, toggleAppMode, stopGame } = useActions();
  const [loginShow, setLoginShow] = useState(false);

  const appModeHandler = () => {
    if (gameStarted) stopGame();
    toggleAppMode();
  };

  const handleOutsideClick: React.MouseEventHandler = (e): void => {
    if ((e.target as HTMLElement).closest('.overlay')) closeMenu();
  };

  const active = isMenuVisible ? 'active' : '';
  const isLoginVisible = loginShow ? 'active' : '';

  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header__body">
            <button className={`header__burger burger ${active}`} onClick={toggleMenu}>
              <span className="burger__line"></span>
            </button>
            <label className="header__toggle">
              <input type="checkbox" onChange={appModeHandler} />
              <span className="header__toggle-text">
                <span>{isPlayMode ? 'Play' : 'Train'}</span>
              </span>
            </label>
            <button className="login__btn" onClick={() => setLoginShow(true)}>
              login
            </button>
            <Login className={isLoginVisible} hideForm={() => setLoginShow(false)} />
          </div>
        </div>
      </header>
      <SideNav className={active} />

      <div className={`overlay ${active}`} onClick={handleOutsideClick}></div>
    </>
  );
};

export default Header;
