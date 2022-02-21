import React from 'react';
import Router from './routes/routes';
import { UserProvider } from './services/auth';
import ThemeButton from './shared/components/ThemeButton/ThemeButton';
import { useLocalStorage } from './services/localStorage';

export default function App() {
  const [ theme, setTheme ] = useLocalStorage('theme', false);

  const changeTheme = () => {
    if (theme) setTheme(false);
    else setTheme(true);
  }

  return(
    <UserProvider>
      <div className={`App ${!theme ? 'light-mode' : ''}`}>
        <Router/>
        <ThemeButton changeTheme={changeTheme} theme={theme} />
      </div>
    </UserProvider>
  );
}
