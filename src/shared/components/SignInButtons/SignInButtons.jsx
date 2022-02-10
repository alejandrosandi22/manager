import './SignInButtons.scss';

export default function SignInButtons() {
  return(
    <div className="sign-in-buttons">
    <button className="google"><i className="fab fa-google"></i></button>
    <button className="facebook"><i className="fab fa-facebook-f"></i></button>
    <button className="github"><i className="fab fa-github"></i></button>
  </div>
  );
}
