import React from 'react';
import './menu.scss';

const SideNav: React.FC<{ className: string }> = ({ className }) => {
  return (
    <nav id="sideNav" className={`menu bg-info ${className}`}>
      <ul className="menu__list">
        <li className="menu__list-item">
          <a href="#" className="menu__link">
            1
          </a>
        </li>
        <li className="menu__list-item">
          <a href="#" className="menu__link">
            2
          </a>
        </li>
        <li className="menu__list-item">
          <a href="#" className="menu__link">
            3
          </a>
        </li>
        <li className="menu__list-item">
          <a href="#" className="menu__link">
            4
          </a>
        </li>
        <li className="menu__list-item">
          <a href="#" className="menu__link">
            5
          </a>
        </li>
        <li className="menu__list-item">
          <a href="#" className="menu__link">
            6
          </a>
        </li>
        <li className="menu__list-item">
          <a href="#" className="menu__link">
            7
          </a>
        </li>
        <li className="menu__list-item">
          <a href="#" className="menu__link">
            8
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default SideNav;
