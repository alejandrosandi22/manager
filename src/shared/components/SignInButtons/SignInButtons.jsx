import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import './SignInButtons.scss';
import { useNavigate } from 'react-router-dom';

export default function SignInButtons() {
  
  const navigate = useNavigate();

  const signInWithGoogle =  () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

     signInWithPopup(auth, provider).then(user => {
      console.log(user)
      navigate('/');
    })


  }

  return(
    <div className="sign-in-buttons">
    <button onClick={signInWithGoogle} className="google"><i className="fab fa-google"></i></button>
    <button className="facebook"><i className="fab fa-facebook-f"></i></button>
    <button className="github"><i className="fab fa-github"></i></button>
  </div>
  );
}
