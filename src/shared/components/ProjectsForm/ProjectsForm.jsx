import { collection, doc, getFirestore, setDoc } from "firebase/firestore";
import { useRef, useState } from 'react';
import './ProjectsForm.scss';

export default function ProjectsForm(props) {
  
  const form = useRef();

  let [ name, setName ] = useState();
  let [ description, setDescription ] = useState();
  let [ link, setLink ] = useState();
  let [ details, setDetails ]= useState();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(name, description, link, details)
    const db = getFirestore();
    
    console.log(props.currentUser, props.currentUser.uid)
    let PROJECT_DATA = {
      name: name,
      description: description,
      link: link,
      details: details,
      id: props.currentUser.uid
    }
    const docRef = doc(collection(db, 'projects'))
    await setDoc(docRef, PROJECT_DATA)
      .then(() => console.log('guardado correctamente'))
      .catch((error) => console.log(error))

      PROJECT_DATA = {};
      form.current.reset();
  }


  return(
    <div className={`projects-form-container ${props.showAndHide ? 'show-bg-form' : 'hide-bg-form'}`}>
      <div className={`projects-form ${props.showAndHide ? 'show-form' : 'hide-form'}`}>
        <h2 className='new-project-title'>New Project</h2>
        <form ref={form} onSubmit={handleSubmit} className='form'>
          <div className='input-wrapper'>
            <label htmlFor="name">Name:</label>
            <input onChange={(e) => setName( name = e.target.value )} type="text" name="name" ide="name" placeholder='Project name'/>
          </div>
          <div className='input-wrapper'>
            <label htmlFor="description">Description:</label>
            <input onChange={(e) => setDescription( description = e.target.value )} type="text" name="description" id="description" placeholder='This project is about ...'/>
          </div>
          <div className='input-wrapper'>
            <label htmlFor="Link">Link:</label>
            <input  onChange={(e) => setLink( link = e.target.value )} type="url" name="link" id="link" placeholder='https://www.example.com'/>
          </div>
          <div className='input-wrapper'>
            <label htmlFor="details">Details:</label>
            <input onChange={(e) => setDetails( details = e.target.value )} type="text" name="details" id="details" placeholder='Created with ...'/>
          </div>
          <div className='actions-buttons'>
            <button type="button" onClick={props.formToggle} className='cancel'>Cancel</button>
            <button onSubmit={handleSubmit} className='save'>Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}