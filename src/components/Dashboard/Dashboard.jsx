import React from 'react';
import './Dashboard.scss';
import Nav from '../../shared/components/Nav/Nav';

export default function Dashboard({ user }){
  return(
    <div className='dashboard-container'>
      <Nav user={user}/>
      <div className='areas gym-section'></div>
      <div className='areas finance-section'></div>
      <div className='areas goals-section'></div>
      <div className='areas dates-section'></div>
      <div className='areas projects-section'></div>
    </div>
  );
}