import { Component } from 'react';
import './Proyects.scss';

function CompletedCard(){
  return(
    <div className='completed-card'>
      <div className='title-wrapper'>
        <h4 className='card-title'>Chat</h4>
        <p>Link: <a>https://chat-app.cf</a>a</p>
      </div>
      <button className='see-button'>See</button>
    </div>
  );
}

function Card() {
  return(
    <div className={'proyect'}>
      <div className='check-completed'>
        <input type="checkbox" name="completed" id="completed" />
        <h3 className='title-proyect'>Chat</h3>
      </div>
      <p className='proyect-description'>This is a web app where you can chat with other people in real time.</p>
      <div className='details-proyect'>
        <div className='details'>
          <span>Link: <a href="https://chat-app.cf" target="_blank" rel='noreferrer'>https://chat-app.cf</a></span>
          <span>Details: Created with vue and firebase.</span>
        </div>
        <div className='actions'>
          <button><i className='fas fa-pen'></i></button>
          <button><i className='fas fa-trash'></i></button>
        </div>
      </div>
    </div>
  );
}

function CompletedProyects() {
  return(
    <div className='completed-container'>
      <div className='completed-wrapper'>
        <h3 className='completed-title'>Completed Proyects</h3>
        <div className='cards-wrapper'>
          <CompletedCard/>
        </div>
      </div>
    </div>
  );
}

export default class Proyects extends Component{
  render(){
    return(
      <div className='proyects-container'>
        <div className='proyects-list'>
          <div className='actions-nav'>
            <button className='add-proyect'><i className='fas fa-plus'></i> add proyect</button>
            <div className='search'>
              <input type="text" name="search" id="search" placeholder='Search proyect'/>
              <label htmlFor="search"><i className='fas fa-search'></i></label>
            </div>
          </div>
          <div className='list-container'>
            <Card/>
          </div>
        </div>
        <CompletedProyects/>
      </div>
    );
  }
}