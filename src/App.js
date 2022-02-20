import React, { createContext, useState } from 'react';
import Router from './routes/routes';
import { UserProvider } from './services/auth';
import { useLocalStorage } from './services/localStorage'
import ThemeButton from './shared/components/ThemeButton/ThemeButton';

export default function App() {

  const [ theme, setTheme ] = useLocalStorage('theme', false);

  const changeTheme = () => {
    if (theme) setTheme(false);
    else setTheme(true);
  }

  return(
    <UserProvider>
        <div className={`App ${!theme ? 'light-mode' : 'dark-mode'}`}>
          <Router/>
          <ThemeButton changeTheme={changeTheme}/>
        </div>
    </UserProvider>
  );
}
