import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState, useMemo } from 'react';

const UserContext = React.createContext();

export function UserProvider(props) {
  const [ user, setUser ] = useState(null);
  const [ loadingUser, setLoadingUser ] = useState(null);

  useEffect(() => {
    async function loadUser() {
      const auth = getAuth();
      onAuthStateChanged(auth, current_user => {
        if (!current_user) {
          setLoadingUser(false);
          return;
        }
        try {
          setUser(current_user);
        } catch (error) {
          console.log(error);
        }
      })
    }
    loadUser();
  }, [])

   const value = useMemo(() => {
    return({
      user,
      loadingUser
    })
  }, [user, loadingUser])

  console.log(user)
  return <UserContext.Provider value={value} {...props} />
}

export function useUser() {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be within the supplier UserContext')
  }
  
  return context;
}
