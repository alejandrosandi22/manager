import { getAuth } from "firebase/auth";

function App() {
  const auth = getAuth();
  const user = auth.currentUser;
  const getCurrentUser = () => {
    if (user) {
      console.log(user);
    } else {
      console.log('No user is signed in.');
    }
  }
  return (
    <div className="App">
      <button onClick={getCurrentUser}>Get curent user</button>
    </div>
  );
}

export default App;
