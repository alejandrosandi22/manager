import { useState } from 'react';
import './Nav.scss';

export default function Nav(){
  var [navToggle, setNavToggle] = useState(true);

  const navToggleChange = () => {
    navToggle ? setNavToggle(false) : setNavToggle(true);
    console.log(navToggle);
  }

  return(
    <div className="nav-container">
      <h1 className='title'>Manager</h1>
      <nav className={`nav ${!navToggle ? 'nav-toggle' : ''}`}>
        <ul className='services-wrapper'>
          <li className='list'>Manages
            <ul className='sublist'>
              <li><a href="https://alejandrosandi.ml">Goals</a></li>
              <li><a href="https://alejandrosandi.ml">Projects</a></li>
              <li><a href="https://alejandrosandi.ml">Finance</a></li>
              <li><a href="https://alejandrosandi.ml">Gym</a></li>
            </ul>
          </li>
          <li className='list'>Services
            <ul className='sublist'>
              <li><a href="https://alejandrosandi.ml">Calendar</a></li>
              <li><a href="https://alejandrosandi.ml">Meetings</a></li>
              <li><a href="https://alejandrosandi.ml">Tasks</a></li>
            </ul>
          </li>
          <li className='list'><a href="https://alejandrosandi.ml">Support</a></li>
        </ul>
        <ul className='auth-user-wrapper'>
          <li className='list'>
            <img src="https://simgbb.com/avatar/v68pcQbsbPNH.png" alt="user" />
            <i className='fas fa-angle-down'></i>
            <ul className='sublist'>
              <li><a href="https://alejandrosandi.ml">Settings</a></li>
              <li><a href="https://alejandrosandi.ml">Help</a></li>
              <li><a href='https://alejandrosandi.ml'>Logout</a></li>
            </ul>
          </li>
        </ul>
      </nav>
      <div className='bars-wrapper'>
        <i onClick={navToggleChange} className={`bars fas ${navToggle ? 'fa-bars' : 'fa-times'}`}></i>
      </div>
    </div>
  );
}