import './Dashboard.scss';
import Nav from '../../shared/components/Nav/Nav';
import { useEffect, useRef, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default function Dashboard(){

  let currentUser = useRef();

  useEffect( async () => {
    const auth = getAuth();
    await onAuthStateChanged(auth, user => {
      if (user) {
        currentUser.current = user;
        return <Nav currentUser={currentUser} />
      }
    })
    
  }, [currentUser.current])

  return(
    <div className='dashboard-container'>
      <Nav currentUser={currentUser}/>
      <div className='areas gym-section'></div>
      <div className='areas finance-section'></div>
      <div className='areas goals-section'></div>
      <div className='areas dates-section'></div>
      <div className='areas projects-section'></div>
    </div>
  );
}