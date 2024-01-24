import React from 'react'
import Notes from './Notes';

const Home = () => {

  return (
    <div>
        <div className="container my-3">
          <h1>Add a note</h1>
          <form>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title</label>
              <input type="text" className="form-control" id="title" aria-describedby="title1"/>
              <div id="title1" className="form-text">Enter Your Title</div>
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <input type="text" className="form-control" id="description" aria-describedby="description1"/>
              <div id="desciption1" className="form-text">Enter Your Description</div>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
        <Notes/>
    </div>
  )
}

export default Home
