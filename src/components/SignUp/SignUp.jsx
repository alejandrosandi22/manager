import { Component } from "react";
import './SignUp.scss';
import accessAccount from '../../assets/access_account.svg';

export default class SignUp extends Component {
  render(){
    return(
      <div className="sign-up-container">
        <div className="sign-up">
          <h1 className="sign-up-title">Sign Up</h1>
          <form className="sign-up-form">
            <div className="name">
              <label htmlFor="name">Name</label>
              <input type="text" name="name" id="name" />
            </div>
            <div className="last-name">
              <label htmlFor="last-name">Last Name</label>
              <input type="text" name="last-name" id="last-name" />
            </div>
            <div className="email">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" />
            </div>
            <div className="avatar">
                <input type="file" name="avatar" id="avatar" accept="image/png, image/gif, image/jpeg"/>
              <label htmlFor="avatar">Choose avatar</label>
              <span>Selected file</span>
            </div>
            <div className="password">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password" />
            </div>
            <div className="request-password">
              <label htmlFor="request-password">Request Password</label>
              <input type="password" name="request-password" id="request-password" />
            </div>
          </form>
          <button className="sign-up-button">Sign In</button>
          <span>or</span>
          <div className="sign-up-alternatives">
            <button className="google"><i className="fab fa-google"></i></button>
            <button className="facebook"><i className="fab fa-facebook-f"></i></button>
            <button className="github"><i className="fab fa-github"></i></button>
          </div>
        </div>
        <div className="welcome-wrapper">
          <h1 className="welcome-title">Welcome!</h1>
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
            <img className="access-account-img" src={accessAccount} alt="access-account" />
          </div>
        </div>
      </div>
    );
  }
}