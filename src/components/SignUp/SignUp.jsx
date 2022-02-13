import { Component } from "react";
import './SignUp.scss';
import SignInButtons from "../../shared/components/SignInButtons/SignInButtons";
import accessAccount from '../../assets/access_account.svg';
import { Link } from "react-router-dom";


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
          <Link className="have-account" to="/login">Do you already have an account?</Link>
          <span>or</span>
          <SignInButtons/>
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
            <img className="front-image" src={accessAccount} alt="access-account" />
          </div>
        </div>
      </div>
    );
  }
}
