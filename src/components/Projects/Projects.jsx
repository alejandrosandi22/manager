import React, { useState, useEffect, useRef } from 'react';
import { collection, getFirestore, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from "firebase/firestore";
import './Projects.scss';
import Nav from '../../shared/components/Nav/Nav';
import ProjectsForm from '../../shared/components/ProjectsForm/ProjectsForm';

function CompletedCard({ project }){
  return(
    <div className='completed-card'>
      <div className='title-wrapper'>
        <h4 className='card-title'>{project.name}</h4>
        <p>Link: <a href={project.link} target='_blank'>{project.link}</a></p>
      </div>
    </div>
  );
}

function Card({ project, id, getListProjects, handleEditProject }) {

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

  const deleteProject = async (e) => {
    await deleteDoc(doc(db, 'projects', e.target.id)).then(() => getListProjects())
  }



  useEffect(() => {
    if (project.state) checkRef.current.checked = true;
  }, [])

  return(
    <div className={`project ${check ? 'completed' : ''}`}>
      <div className='check-completed'>
        <input ref={checkRef} id={`${id}`} onChange={(e) => handleCheck(e)} type="checkbox" name="completed" />
        <h3 className='title-project'>{ project.name }</h3>
      </div>
      <p className='project-description'>{ project.description }</p>
      <div className='details-project'>
        <div className='details'>
          <span>Link: <a href={project.link} target="_blank" rel='noreferrer'>{ project.link }</a></span>
          <span>Details: { project.details }</span>
        </div>
        <div className='actions'>
          <button><i id={`${id}`} onClick={(e) => handleEditProject(e)} className='fas fa-pen'></i></button>
          <button><i id={`${id}`} onClick={(e) => deleteProject(e)} className='fas fa-trash'></i></button>
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
        if (projects.length === 0) req('Filed to get projects');
        else return res(projects);
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
            { inputSearch.current.value !== '' && found.length !== 0 ? search : loadProjects}
        </div>
      </div>
      <Completedprojects projects={projects.map(project => {return project.data()})} user={user} />
    </div>
  );
}
