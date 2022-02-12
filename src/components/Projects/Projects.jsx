import { Component } from 'react';
import './Projects.scss';
import Nav from '../../shared/components/Nav/Nav';
import ProjectsForm from '../../shared/components/ProjectsForm/ProjectsForm';

function CompletedCard(){
  return(
    <div className='completed-card'>
      <div className='title-wrapper'>
        <h4 className='card-title'>Chat</h4>
        <p>Link: <a href='https://chat-app.cf'>https://chat-app.cf</a></p>
      </div>
      <button className='see-button'>See</button>
    </div>
  );
}

function Card() {
  return(
    <div className={'project'}>
      <div className='check-completed'>
        <input type="checkbox" name="completed" id="completed" />
        <h3 className='title-project'>Chat</h3>
      </div>
      <p className='project-description'>This is a web app where you can chat with other people in real time.</p>
      <div className='details-project'>
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

function Completedprojects() {
  return(
    <div className='completed-container'>
      <div className='completed-wrapper'>
        <h3 className='completed-title'>Completed projects</h3>
        <div className='cards-wrapper'>
          <CompletedCard/>
        </div>
      </div>
    </div>
  );
}

export default class projects extends Component{

  constructor(){
    super();
    this.state = {
      showForm: false
    }
  }

  formToggle = () => {
    this.state.showForm ? this.setState({showForm: false}) : this.setState({showForm: true});
  }

  render(){
    return(
      <div className='projects-container'>
       <ProjectsForm showForm={this.state.showForm} formToggle={this.formToggle}/>
        <Nav/>
        <div className='projects-list'>
          <div className='actions-nav'>
            <button onClick={this.formToggle} className='add-project'><i className='fas fa-plus'></i> add project</button>
            <div className='search'>
              <input type="text" name="search" id="search" placeholder='Search project'/>
              <label htmlFor="search"><i className='fas fa-search'></i></label>
            </div>
          </div>
          <div className='list-container'>
            <Card/>
          </div>
        </div>
        <Completedprojects/>
      </div>
    );
  }
}