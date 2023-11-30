import React, { useState } from 'react';

const NavBar = () => {
  const [theme, setTheme] = useState('light'); 

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'; 
    setTheme(newTheme); 
    document.documentElement.setAttribute('data-theme', newTheme);
  }

  return (
    <nav>
      <h2>Logo</h2>
      <button onClick={toggleTheme}>{theme === 'light' ? <>&#9728;</> : <>&#9790;</> }</button>
    </nav>
  );
};

export default NavBar;
