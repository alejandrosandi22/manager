import { Component } from 'react';
import './Recovery.scss';

import { Link } from 'react-router-dom';

export default class Recovery extends Component {
  render(){
    return(
      <div className='recovery-container'>
        <h1 className='recovery-title'>Enter your email to reset your password</h1>
        <input type="email" name="email" id="email" placeholder='Enter your email'/>
        <button className='send-button'>Send</button>
        <Link to="/login">Back to login</Link>
      </div>
    );
  }
}