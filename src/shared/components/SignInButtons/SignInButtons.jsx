import { FacebookAuthProvider, getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import './SignInButtons.scss';
import { useNavigate } from 'react-router-dom';

export default function SignInButtons() {
  
  const navigate = useNavigate();
  const auth = getAuth();

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then(user => {
        console.log(user)
        navigate('/');
      })
      .catch(error => console.log(error))
  }

  const signInWithFacebook = () => {
    const provider = new FacebookAuthProvider();

    signInWithPopup(auth, provider)
      .then(user => {
        console.log(user);
        navigate('/');
      })
      .catch(error => console.log(error))
  }

  const signInWithGithub = () => {
    const provider = new GithubAuthProvider();

    signInWithPopup(auth, provider)
      .then(user => {
        console.log(user)
        navigate('/');
      })
      .catch(error => console.log(error))
  }

  return(
    <div className="sign-in-buttons">
    <button onClick={signInWithGoogle} className="google"><i className="fab fa-google"></i></button>
    <button onClick={signInWithFacebook} className="facebook"><i className="fab fa-facebook-f"></i></button>
    <button onClick={signInWithGithub} className="github"><i className="fab fa-github"></i></button>
  </div>
  );
}
