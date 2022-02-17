import React from "react";
import { useRef, useState } from "react";
import SignInButtons from "../../shared/components/SignInButtons/SignInButtons";
import accessAccount from '../../assets/access_account.svg';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import 'firebase/compat/storage';
import { Link } from "react-router-dom";
import firebase from "firebase/compat/app";
import './SignUp.scss';


export default function SignUp() {

  const [ name, setName ] = useState('');
  const [ lastName, setLastName] = useState('');
  const [ email, setEmail ] = useState('');
  const [ avatar, setAvatar] = useState({
    avatar: {
      name: 'selected item'
    }
  });
  const [ password, setPassword ] = useState('');
  const [ requestPassword, setRequestPassword ] = useState('');

  
  const form = useRef();

  const signingUp = (e) => {
    e.preventDefault();
    const storageRef = firebase.storage().ref();
    let photoURL = '';

    if (password.password === requestPassword.requestPassword) {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email.email, password.password)
        .then( async (user_data) => {

          if (avatar.avatar.name !== 'selected item') {
            await storageRef.child(`/photos/${user_data.user.uid}`).put(avatar.avatar)
              .then( async () => {
                await storageRef.child(`/photos/${user_data.user.uid}`).getDownloadURL()
                  .then((url) => photoURL = url)
              })
          }
          updateProfile(auth.currentUser, {
            displayName: `${name.name} ${lastName.lastName}`,
            photoURL: photoURL
          })
          .then(() => {
            console.log('Registro Exitoso');
            setAvatar({avatar: {name: 'selected item'}});
            form.current.reset();
          })
        })
    } else console.log('la contraseña no coincide')


  }

  return(
    <div className="sign-up-container">
      <div className="sign-up">
        <h1 className="sign-up-title">Sign Up</h1>
        <form ref={form} onSubmit={signingUp} className="sign-up-form">
          <div className="name">
            <label htmlFor="name">Name</label>
            <input onChange={(e) => setName({name: e.target.value})} type="text" name="name" id="name" />
          </div>
          <div className="last-name">
            <label htmlFor="last-name">Last Name</label>
            <input onChange={(e) => setLastName({lastName: e.target.value})}  type="text" name="last-name" id="last-name" />
          </div>
          <div className="email">
            <label htmlFor="email">Email</label>
            <input onChange={(e) => setEmail({email: e.target.value})} type="email" name="email" id="email" />
          </div>
          <div className="avatar">
              <input onChange={(e) => {setAvatar({avatar: e.target.files[0]})}} type="file" name="avatar" id="avatar" accept="image/png, image/gif, image/jpeg"/>
            <label htmlFor="avatar">Choose avatar</label>
            <span>{ avatar.avatar.name }</span>
          </div>
          <div className="password">
            <label htmlFor="password">Password</label>
            <input onChange={(e) => setPassword({password: e.target.value})} type="password" name="password" id="password" />
          </div>
          <div className="request-password">
            <label htmlFor="request-password">Request Password</label>
            <input onChange={(e) => setRequestPassword({requestPassword: e.target.value})} type="password" name="request-password" id="request-password" />
          </div>
        <button onSubmit={signingUp} className="sign-up-button">Sign In</button>
        </form>
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
