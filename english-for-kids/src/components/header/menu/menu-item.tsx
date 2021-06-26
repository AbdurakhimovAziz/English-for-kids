import React from 'react';

const MenuItem: React.FC<{ children: string }> = ({ children }) => {
  return (
    <li className="menu__list-item">
      <a href="#" className="menu__link">
        {children}
      </a>
    </li>
  );
};

export default MenuItem;
