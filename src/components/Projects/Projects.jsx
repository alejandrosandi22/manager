import React, { useState, useEffect, useRef } from 'react';
import { collection, docs, getFirestore, query, orderBy, onSnapshot } from "firebase/firestore";
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

function Card({ project }) {
  return(
    <div className='project'>
      <div className='check-completed'>
        <input type="checkbox" name="completed" id="completed" />
        <h3 className='title-project'>{ project.name }</h3>
      </div>
      <p className='project-description'>{ project.description }</p>
      <div className='details-project'>
        <div className='details'>
          <span>Link: <a href="https://chat-app.cf" target="_blank" rel='noreferrer'>{ project.link }</a></span>
          <span>Details: { project.details }</span>
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

export default function Projects({ user }) {
  const db = getFirestore();

  var [ loadProjects, setLoadProjects ] = useState();
  
  let [ projects, setProjects ] = useState([]);
  let [ showAndHide, setShowAndHide ] = useState(false);
  let [ isOpen, setIsOpen ] = useState(false);

  const getProyects = async () => {
    const queryCollection = query(collection(db, 'projects'));
    const q = query(queryCollection, orderBy('createdAt', 'desc'));

    onSnapshot(q, (snapchot) => {
      setProjects(projects = []);
      snapchot.docs.forEach((doc) => {
        if (doc.data().id === user.uid) {
          projects.push(doc.data());
        }
      })
    })
    setLoadProjects(loadProjects = projects.map(project =>  <Card key={project.createdAt} project={project} />));
  }

  useEffect(() => {
    if (user) {
      getProyects();
    }
  }, [user])

  const formToggle = () => {
    setIsOpen(isOpen = true);
    showAndHide ? setShowAndHide(showAndHide = false) : setShowAndHide(showAndHide = true);
  }

  return(
    <div className='projects-container'>
      <ProjectsForm getProyects={getProyects} user={user} showAndHide={showAndHide} formToggle={formToggle} isOpen={isOpen} />
      <Nav user={user} />
      <div className='projects-list'>
        <div className='actions-nav'>
          <button onClick={formToggle} className='add-project'><i className='fas fa-plus'></i> add project</button>
          <div className='search'>
            <input type="text" name="search" id="search" placeholder='Search project'/>
            <label htmlFor="search"><i className='fas fa-search'></i></label>
          </div>
        </div>
        <div className='list-container'>
            { loadProjects }
        </div>
      </div>
      <Completedprojects/>
    </div>
  );
}