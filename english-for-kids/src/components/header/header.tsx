import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SideNav from './menu/menu';
import './header.scss';
import { toggleMenu, closeMenu } from '../../store/actionCreators';

const Header: React.FC = () => {
  const isMenuVisible = useSelector((s: AppState) => s.isMenuVisible);
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(false);

  const handleMenuToggle = useCallback(() => {
    dispatch(toggleMenu());
  }, [toggleMenu, dispatch]);

  const hideMenu = useCallback(() => {
    dispatch(closeMenu());
  }, [toggleMenu, dispatch]);

  const handleAppModeToggle: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleOutsideClick: React.MouseEventHandler = (e): void => {
    if ((e.target as HTMLElement).closest('.overlay')) hideMenu();
  };

  const isActive = isMenuVisible ? 'active' : '';
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
