import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React from 'react';
import Router from './routes/routes';


export default class App extends React.Component {

  constructor(){
    super();
    this.state = {
      user: null
    }
    console.log('esto sucede primero')
  }

  componentDidMount(){
    console.log('esto sucede segundo')
    const auth = getAuth();
    onAuthStateChanged(auth, current_user => {
      this.setState({user: current_user})
    })
  }

  render() {
    return(
      <div className='App'>
          <Router user={this.state.user} />
    </div>
    );
  }
}