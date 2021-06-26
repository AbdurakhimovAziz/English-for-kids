import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from '../header/header';

export const App = (): JSX.Element => {
  const [showMenu, setShowMenu] = useState(false);
  const handleMenuToggle: React.MouseEventHandler = () => {
    setShowMenu((prev) => !prev);
  };
  const handleOutsideClick: React.MouseEventHandler = (e): void => {
    if ((e.target as HTMLElement).closest('.overlay')) setShowMenu(false);
  };

  const isActive = showMenu ? 'active' : '';
  return (
    <>
      <Header handleMenuToggle={handleMenuToggle} isActive={isActive} handleOutsideClick={handleOutsideClick} />
    </>
  );
};
