import React from 'react';
import './Dashboard.scss';
import Nav from '../../shared/components/Nav/Nav';

export default function Dashboard({ user }){
  return(
    <div className='dashboard-container'>
      <Nav user={user}/>
      <div className='areas gym-section'>
      <h3 className='section-title'>Gym</h3>
      </div>
      <div className='areas finance-section'>
      <h3 className='section-title'>Finance</h3>
      </div>
      <div className='areas goals-section'>
      <h3 className='section-title'>Goals</h3>
      </div>
      <div className='areas dates-section'>
      <h3 className='section-title'>Important Dates</h3>
      </div>
      <div className='areas projects-section'>
        <h3 className='section-title'>Projects</h3>
        <div className='projects-wrapper'>

        </div>
      </div>
      <div className='areas meetings-section'>
      <h3 className='section-title'>Meetings</h3>
      </div>
      <div className='areas tasks-section'>
      <h3 className='section-title'>Tasks</h3>
      </div>
    </div>
  );
}