import { Component } from 'react';
import './Dashboard.scss';
import Nav from '../../shared/components/Nav/Nav';

export default class Dashboard extends Component{
  render(){
    return(
      <div className='dashboard-container'>
        <Nav/>
        <div className='areas gym-section'></div>
        <div className='areas finance-section'></div>
        <div className='areas goals-section'></div>
        <div className='areas dates-section'></div>
        <div className='areas projects-section'></div>
      </div>
    );
  }
}