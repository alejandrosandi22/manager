import React from "react";
import './ThemeButton.scss';

export default function ThemeButton({ changeTheme, theme }) {

  return(
    <div className="theme-container">
      <input onChange={changeTheme} className={`fas fa-sun checkbox ${theme ? 'light-mode' : 'dark-mode'}`} type="checkbox" name="theme" id="theme" />
    </div>
  );
}
