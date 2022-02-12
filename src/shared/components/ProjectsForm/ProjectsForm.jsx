import './ProjectsForm.scss';

export default function ProjectsForm(props) {
  return(
    <div className={`projects-form-container ${props.showForm ? 'show-bg-form' : 'hide-bg-form'}`}>
      <div className={`projects-form ${props.showForm ? 'show-form' : 'hide-form'}`}>
        <h2 className='new-project-title'>New Project</h2>
        <form className='form'>
          <div className='input-wrapper'>
            <label htmlFor="name">Name:</label>
            <input type="text" name="name" ide="name" placeholder='Project name'/>
          </div>
          <div className='input-wrapper'>
            <label htmlFor="description">Description:</label>
            <input type="text" name="description" id="description" placeholder='This project is about ...'/>
          </div>
          <div className='input-wrapper'>
            <label htmlFor="Link">Link:</label>
            <input type="url" name="link" id="link" placeholder='https://www.example.com'/>
          </div>
          <div className='input-wrapper'>
            <label htmlFor="details">Details:</label>
            <input type="text" name="details" id="details" placeholder='Created with ...'/>
          </div>
        </form>
        <div className='actions-buttons'>
          <button  onClick={props.formToggle} className='cancel'>Cancel</button>
          <button className='save'>Save</button>
        </div>
      </div>
    </div>
  );
}