import React, { useEffect, useRef, useState } from 'react';
import { collection, doc, getDoc, getFirestore, setDoc, updateDoc } from "firebase/firestore";
import './ProjectsForm.scss';
import { useUser } from '../../../services/auth';


export default function ProjectsForm(props) {

  const { user } = useUser();
  const form = useRef();
  const db = getFirestore();

  const inputName = useRef('');
  const inputDescription = useRef('');
  const inputLink = useRef('');
  const inputDetails = useRef('');

  let [ name, setName ] = useState();
  let [ description, setDescription ] = useState();
  let [ link, setLink ] = useState();
  let [ details, setDetails ]= useState();
  let [ currentProjectData, setCurrentProjectData ] = useState();

  useEffect(() => {
    console.log(props.isEdit)
    new Promise( async (res, req) => {
      if (props.isEdit) {
        const docRef = doc(db, 'projects', props.projectToEdit);
        const docSnap = await getDoc(docRef);
        setCurrentProjectData(currentProjectData = docSnap.data())
        if (docSnap.exists()) return res(docSnap.data());
      }
    }).then((data) => {
      inputName.current.value = data.name;
      inputDescription.current.value = data.description;
      inputLink.current.value = data.link;
      inputDetails.current.value = data.details;
    })
  }, [props.showAndHide])
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    let PROJECT_DATA = {};

    if (!props.isEdit) {
      PROJECT_DATA = {
        name: name,
        description: description,
        link: link,
        details: details,
        id: user.uid,
        state: false,
        order: Date.now(),
        createdAt: Date.now()
      }
      console.log(PROJECT_DATA)
      const docRef = doc(collection(db, 'projects'));
      await setDoc(docRef, PROJECT_DATA)
        .then(() => console.log('guardado correctamente'))
        .catch((error) => console.log(error))

    } else {
      PROJECT_DATA = {
        name: inputName.current.value,
        description: inputDescription.current.value,
        link: inputLink.current.value,
        details: inputDetails.current.value,
        id: currentProjectData.id,
        state: currentProjectData.state,
        order: currentProjectData.order,
        createdAt: currentProjectData.createdAt
      }

      await setDoc(doc(db, 'projects', props.projectToEdit), PROJECT_DATA)
        .then(() => console.log('actualización correcta'))
    }
    
      PROJECT_DATA = {};
      form.current.reset();

      props.getListProjects();
      props.formToggle();
  }

  return(
    <div className={`projects-form-container ${props.showAndHide ? 'show-bg-form' : props.isOpen ? 'hide-bg-form' : ''}`}>
      <div className={`projects-form ${props.showAndHide ? 'show-form' : 'hide-form'}`}>
        <h2 className='new-project-title'>{!props.isEdit ? 'New Project' : 'Edit Proejct'}</h2>
        <form ref={form} onSubmit={handleSubmit} className='form'>
          <div className='input-wrapper'>
            <label htmlFor="name">Name:</label>
            <input ref={inputName} onChange={(e) =>  setName( name = e.target.value )} type="text" name="name" id="name" placeholder='Project name'/>
          </div>
          <div className='input-wrapper'>
            <label htmlFor="description">Description:</label>
            <input ref={inputDescription} onChange={(e) => setDescription( description = e.target.value )} type="text" name="description" id="description" placeholder='This project is about ...'/>
          </div>
          <div className='input-wrapper'>
            <label htmlFor="Link">Link:</label>
            <input ref={inputLink} onChange={(e) => setLink( link = e.target.value )} type="url" name="link" id="link" placeholder='https://www.example.com'/>
          </div>
          <div className='input-wrapper'>
            <label htmlFor="details">Details:</label>
            <input ref={inputDetails} onChange={(e) => setDetails( details = e.target.value )} type="text" name="details" id="details" placeholder='Created with ...'/>
          </div>
          <div className='actions-buttons'>
            <button type="button" onClick={() => {props.handleCancel(); form.current.reset();}} className='cancel'>Cancel</button>
            <button onSubmit={handleSubmit} className='save'>Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}