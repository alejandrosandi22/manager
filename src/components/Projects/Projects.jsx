import React, { useState, useEffect, useRef } from 'react';
import { collection, getFirestore, query, orderBy, onSnapshot, doc, updateDoc } from "firebase/firestore";
import './Projects.scss';
import Nav from '../../shared/components/Nav/Nav';
import ProjectsForm from '../../shared/components/ProjectsForm/ProjectsForm';

function CompletedCard({ project }){
console.log('=>', project)

  return(
    <div className='completed-card'>
      <div className='title-wrapper'>
        <h4 className='card-title'>{ project.name }</h4>
        <p>Link: <a href='https://chat-app.cf'>{ project.link }</a></p>
      </div>
    </div>
  );
}

function Card({ project, id, getListProjects }) {

  const db = getFirestore();
  let [ check, setCheck ] = useState(project.state);
  const checkRef = useRef(id)

  const handleCheck = async (e) => {
    const projectData = e.target;

    if (e.target.checked) setCheck(check = true);
    else setCheck(check = false);

    const projectRef = doc(db, 'projects', projectData.id);
    await updateDoc(projectRef, {
      createdAt: e.target.checked ? 0 : project.order,
      state: projectData.checked
    }).then(() => {
      getListProjects();
    })
  }

  useEffect(() => {
    if (project.state) checkRef.current.checked = true;
  }, [])

  return(
    <div className={`project ${check ? 'completed' : ''}`}>
      <div className='check-completed'>
        <input ref={checkRef} onLoad={(e) => console.log(e, 'LOADED')} id={`${id}`} onChange={(e) => handleCheck(e)} type="checkbox" name="completed" />
        <h3 className='title-project'>{ project.name }</h3>
      </div>
      <p className='project-description'>{ project.description + id + project.state }</p>
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

function Completedprojects({ projects }) {

  var [ completedProjects, setCompletedProjects ] = useState();
  var [ listProjects, setListProjects ] = useState();

  const getCompletedProjects = () => {
    setCompletedProjects(
      completedProjects = projects.filter((project) => {
        return project.state;
      })
    );
    setListProjects(listProjects = completedProjects.map((project, i) => <CompletedCard key={i} project={project}/>));
  }
  useEffect(() => {
    getCompletedProjects();
  }, [projects])

  return(
    <div className='completed-container'>
      <div className='completed-wrapper'>
        <h3 className='completed-title'>Completed projects</h3>
        <div className='cards-wrapper'>
          { listProjects }
        </div>
      </div>
    </div>
  );
}

export default function Projects({ user }) {
  const db = getFirestore();

  var [ loadProjects, setLoadProjects ] = useState(null);
  
  let [ projects, setProjects ] = useState([]);
  let [ showAndHide, setShowAndHide ] = useState(false);
  let [ isOpen, setIsOpen ] = useState(false);

  const getListProjects = () => {

    new Promise((res, req) => {
      const queryCollection = query(collection(db, 'projects'));
      const q = query(queryCollection, orderBy('createdAt', 'desc'));

      onSnapshot(q, (snapchot) => {
        setProjects(
          projects = snapchot.docs.filter((doc) => {
            return doc.data().id === user.uid;
          })
        );
        if (projects.length === 0) {
          req('Filed to get projects')
        } else {
          return res(projects);
        }
      })
    }).then(() => {
      setLoadProjects(loadProjects = projects.map(project =>  <Card getListProjects={getListProjects} key={project.id} project={project.data()} id={project.id} />));
    })
  }

  useEffect(() => {
    if (user) {
      getListProjects();
    }
  }, [user])

  const formToggle = () => {
    setIsOpen(isOpen = true);
    showAndHide ? setShowAndHide(showAndHide = false) : setShowAndHide(showAndHide = true);
  }

  return(
    <div className='projects-container'>
      <ProjectsForm getListProjects={getListProjects} user={user} showAndHide={showAndHide} formToggle={formToggle} isOpen={isOpen} />
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
      <Completedprojects projects={projects.map(project => {return project.data()})} user={user} />
    </div>
  );
}