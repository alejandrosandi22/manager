import React, { useState, useEffect, useRef } from 'react';
import { collection, getFirestore, query, orderBy, onSnapshot } from "firebase/firestore";
import './Projects.scss';
import Card from './Card/Card';
import Nav from '../../shared/components/Nav/Nav';
import ProjectsForm from './ProjectsForm/ProjectsForm';
import { useUser } from '../../services/auth';

function CompletedCard({ project }){
  return(
    <div className='completed-card'>
      <div className='title-wrapper'>
        <h4 className='card-title'>{project.name}</h4>
        <p>Link: <a href={project.link} target='_blank' rel="noreferrer">{project.link}</a></p>
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

export default function Projects() {

  const { user } = useUser();
  const db = getFirestore();
  const inputSearch = useRef('');
  
  var [ loadProjects, setLoadProjects ] = useState(null);
  var [ search, setSearch ] = useState(null);
  var [ found, setFound ] = useState([]);
  
  let projectToEdit = useRef();
  let [ projects, setProjects ] = useState([]);
  let [ showAndHide, setShowAndHide ] = useState(false);
  let [ isOpen, setIsOpen ] = useState(false);
  let [ isEdit , setIsEdit ] = useState(false);

  const editProject = () => {
    setIsEdit(isEdit = true);
  }

  const handleEditProject = async (e) => {
    projectToEdit.current = e.target.id;
    editProject();
    setShowAndHide(showAndHide = true);
  }

  const handleCancel = () => {
    setIsEdit(isEdit = false);
    formToggle();
  }

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
        if (projects.length !== 0) return res(projects);
      })
    }).then(() => {
      setLoadProjects(loadProjects = projects.map(project => <Card handleEditProject={handleEditProject} getListProjects={getListProjects} key={project.id} project={project.data()} id={project.id} />));
    })
  }

  useEffect(() => {
    if (user) {
      getListProjects();
    }
  }, [user])

  const formToggle = () => {
    setIsEdit(isEdit = false);
    setIsOpen(isOpen = true);
    showAndHide ? setShowAndHide(showAndHide = false) : setShowAndHide(showAndHide = true);
  }

  const searchProject = () => {
    new Promise((res) => {
      setFound(
        found = projects.filter((project) => {
          let foundName = project.data().name.toLowerCase();
          let foundDescription = project.data().description.toLowerCase();
          let foundLink = project.data().link.toLowerCase();
          let foundDetail = project.data().details.toLowerCase();
          let searchText = inputSearch.current.value.toLowerCase();
          return foundName.includes(searchText)  || foundDescription.includes(searchText) || foundLink.includes(searchText) || foundDetail.includes(searchText);
        })
      );
      return res(found);
    }).then(() => {
      setSearch(search = found.map(project => <Card handleEditProject={handleEditProject} getListProjects={getListProjects} key={project.id} project={project.data()} id={project.id} />));
    })
  }

  return(
    <div className='projects-container'>
      <ProjectsForm handleCancel={handleCancel} projectToEdit={projectToEdit.current} editProject={editProject} isEdit={isEdit} getListProjects={getListProjects} user={user} showAndHide={showAndHide} formToggle={formToggle} isOpen={isOpen} />
      <Nav user={user} />
      <div className='projects-list'>
        <div className='actions-nav'>
          <button onClick={formToggle} className='add-project'><i className='fas fa-plus'></i> add project</button>
          <div className='search'>
            <input onChange={searchProject} ref={inputSearch} type="text" name="search" id="search" placeholder='Search project'/>
            <label onClick={searchProject} htmlFor="search"><i className='fas fa-search'></i></label>
          </div>
        </div>
        <div className='list-container'>
          { !loadProjects ? <h4 className='empty-projects-messege'>You have not created any project</h4> : ''}
          { inputSearch.current.value !== '' && found.length !== 0 ? search : loadProjects}
        </div>
      </div>
      <Completedprojects projects={projects.map(project => {return project.data()})} user={user} />
    </div>
  );
}
