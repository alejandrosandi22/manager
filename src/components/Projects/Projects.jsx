import { useState, useEffect, useRef } from 'react';
import { collection, getDocs, getFirestore, query } from "firebase/firestore";
import './Projects.scss';
import Nav from '../../shared/components/Nav/Nav';
import ProjectsForm from '../../shared/components/ProjectsForm/ProjectsForm';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

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

function Card(props) {

  return(
    <div className='project'>
      <div className='check-completed'>
        <input type="checkbox" name="completed" id="completed" />
        <h3 className='title-project'>{ props.project.name }</h3>
      </div>
      <p className='project-description'>{ props.project.description }</p>
      <div className='details-project'>
        <div className='details'>
          <span>Link: <a href="https://chat-app.cf" target="_blank" rel='noreferrer'>{ props.project.link }</a></span>
          <span>Details: { props.project.details }</span>
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

export default function Projects() {

  const [ showAndHide, setShowAndHide ] = useState(false);
  let [ currentUser, setCurrentUser ] = useState()
  let allProjects = useRef([]);

  const formToggle = () => {
    showAndHide.showAndHide ? setShowAndHide({showAndHide: false}) : setShowAndHide({showAndHide: true});
  }

  useEffect(async () => {

    const db = getFirestore();
    const q = query(collection(db, 'projects'));
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => setCurrentUser( currentUser = user ))
  
    const querySnapchot = await getDocs(q);
    allProjects.current = []
    querySnapchot.forEach((doc) => {
      if (doc.data().id === currentUser.uid) {
        console.log('igual')
        allProjects.current.push(doc.data())
      }
    })
  
    console.log(allProjects.current)

  }, [allProjects])

  return(
    <div className='projects-container'>
      <ProjectsForm showAndHide={showAndHide.showAndHide} formToggle={formToggle} currentUser={currentUser} />
      <Nav/>
      <div className='projects-list'>
        <div className='actions-nav'>
          <button onClick={formToggle} className='add-project'><i className='fas fa-plus'></i> add project</button>
          <div className='search'>
            <input type="text" name="search" id="search" placeholder='Search project'/>
            <label htmlFor="search"><i className='fas fa-search'></i></label>
          </div>
        </div>
        <div className='list-container'>
          {
            allProjects.current.map((project, i) => <Card project={project} key={i}/>)
          }
        </div>
      </div>
      <Completedprojects/>
    </div>
  );
}