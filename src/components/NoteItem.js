import React from 'react'

const NoteItem = (props) => {
  return (
    <div className="col-md-3">
      <div className="card my-3 text-center mb-3">
          <div className="card-body">
              <h5 className="card-title">{props.note.title}</h5>
              <p className="card-text">{props.note.description} Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque veritatis officia impedit voluptas corporis nisi similique veniam tempore molestias eligendi, culpa temporibus doloribus quo odit tenetur omnis. Et quam ipsum odit fugiat voluptates ullam!</p>
              <a href="/" className="btn btn-success mx-2 my-2">Edit <i className="bi bi-pencil-square"></i></a>
              <a href="/" className="btn btn-danger mx-2 my-2">Delete <i className="bi bi-x-octagon"></i></a>
          </div>
      </div>
    </div>
  )
}

export default NoteItem
