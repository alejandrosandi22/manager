import SignInButtons from '../../shared/components/SignInButtons/SignInButtons';
import './LogIn.scss';
import personalSettings from '../../assets/personal_settings.svg';
import { getAuth, signInWithEmailAndPassword,onAuthStateChanged } from "firebase/auth";

import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function LogIn() {
  let [ email, setEmail ] = useState();
  let [ password, setPassword ] = useState();

  useEffect( () => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
      } else {
      }
    })
  }, [])


  const logIn = async (e) => {
    e.preventDefault();

    const auth = getAuth();
    await signInWithEmailAndPassword(auth, email, password)
      .then(data => alert('Sucessfully', data))
      .catch(error => alert(error))
  }

  return(
    <div className='log-in-container'>
      <div className='log-in-wrapper'>
        <h1 className='log-in-title'>Log In</h1>
        <form onSubmit={logIn} className='log-in-form'>
          <div className='email'>
            <label htmlFor='email'>Email</label>
            <input onChange={(e) => setEmail(email = e.target.value)} type='email' name='email' id='email' />
          </div>
          <div className='password'>
            <label htmlFor='password'>Password</label>
            <input onChange={(e) => setPassword(password = e.target.value)} type='password' name='password' id='pasword'/>
          </div>
          <button onSubmit={logIn} className='log-in-button'>Log In</button>
        </form>
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
