import React from "react";
import './ThemeButton.scss';

export default function ThemeButton({ changeTheme }) {
  return(
    <div className="theme-container">
      <button onClick={changeTheme}>cambiar</button>
    </div>
  );
}