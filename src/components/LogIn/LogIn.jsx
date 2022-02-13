import { Component } from 'react';
import SignInButtons from '../../shared/components/SignInButtons/SignInButtons';
import './LogIn.scss';
import personalSettings from '../../assets/personal_settings.svg';

import { Link } from 'react-router-dom';

export default class LogIn extends Component {
  render(){
    return(
      <div className='log-in-container'>
        <div className='log-in-wrapper'>
          <h1 className='log-in-title'>Log In</h1>
          <form className='log-in-form'>
            <div className='email'>
              <label htmlFor='email'>Email</label>
              <input type='email' name='email' id='email' />
            </div>
            <div className='password'>
              <label htmlFor='password'>Password</label>
              <input type='password' name='password' id='pasword'/>
            </div>
          </form>
          <button className='log-in-button'>Log In</button>
          <div className='account-suggestions'>
            <Link to="/recovery">Forget your password?</Link>
            <Link to="/signup">You do not have an account?</Link>
          </div>
          <span>or</span>
          <SignInButtons/>
        </div>
        <div className='image-wrapper'>
          <div className="img-wrapper">
            <span className="t-over"></span>
            <span className="t-over"></span>
            <span className="t-over"></span>
            <span className="t-over"></span>
            <span className="t-over"></span>
            <span className="t-over"></span>
            <span className="t-over"></span>
            <span className="t-over"></span>
            <span className="t-over"></span>
            <img className="front-image" src={personalSettings} alt="access-account" />
          </div>
        </div>
      </div>
    );
  }
}
