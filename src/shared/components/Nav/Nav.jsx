import { useState } from 'react';
import './Nav.scss';

import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';

export default function Nav(){
  var [navToggle, setNavToggle] = useState(true);
  const navigate = useNavigate();

  const navToggleChange = () => {
    navToggle ? setNavToggle(false) : setNavToggle(true);
    console.log(navToggle);
  }

  const signInOut = async () => {
    const auth = getAuth();
    await signOut(auth).then(() =>{
      navigate('/login')
        console.log('signed out')
      }).catch(error => console.log(error))
  }

  return(
    <div className="nav-container">
      <h1 className='title'><Link to='/'>Manager</Link></h1>
      <nav className={`nav ${!navToggle ? 'nav-toggle' : ''}`}>
        <ul className='services-wrapper'>
          <li className='list'>Manages
            <ul className='sublist'>
              <li><Link to='/dashboard'>Dashboard</Link></li>
              <li><Link to='/goals'>Goals</Link></li>
              <li><Link to='/projects'>Projects</Link></li>
              <li><Link to='/finance'>Finance</Link></li>
              <li><Link to='/gym'>Gym</Link></li>
            </ul>
          </li>
          <li className='list'>Services
            <ul className='sublist'>
              <li><Link to='/calendar'>Calendar</Link></li>
              <li><Link to='/meetings'>Meetings</Link></li>
              <li><Link to='/tasks'>Tasks</Link></li>
            </ul>
          </li>
          <li className='list'><Link to='/support'>Support</Link></li>
        </ul>
        <ul className='auth-user-wrapper'>
          <li className='list'>
            <img src="https://simgbb.com/avatar/v68pcQbsbPNH.png" alt="user" />
            <i className='fas fa-angle-down'></i>
            <ul className='sublist'>
              <li><a href="https://alejandrosandi.ml">Settings</a></li>
              <li><a href="https://alejandrosandi.ml">Help</a></li>
              <li onClick={signInOut}>Logout</li>
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
