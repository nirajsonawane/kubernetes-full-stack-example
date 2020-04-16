import React, { useState, useEffect } from "react";
import TutorialDataService from "../services/StudentService";

const Students = props => {
  const initialTutorialState = {
    id: null,
    title: "",
    description: "",
    published: false
  };
  const [currentStudent, setCurrentStudent] = useState(initialTutorialState);
  const [message, setMessage] = useState("");

  const getStudent = id => {
    TutorialDataService.get(id)
      .then(response => {
        setCurrentStudent(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getStudent(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentStudent({ ...currentStudent, [name]: value });
  };

  const updatePublished = status => {
    var data = {
      id: currentStudent.id,
      title: currentStudent.title,
      description: currentStudent.description,
      published: status
    };

    TutorialDataService.update(currentStudent.id, data)
      .then(response => {
        setCurrentStudent({ ...currentStudent, published: status });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateStudent = () => {
    TutorialDataService.update(currentStudent.id, currentStudent)
      .then(response => {
        console.log(response.data);
        setMessage("Student was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteStudent = () => {
    TutorialDataService.remove(currentStudent.id)
      .then(response => {
        console.log(response.data);
        props.history.push("/students");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentStudent ? (
        <div className="edit-form">
          <h4>Students</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">First Name</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentStudent.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentStudent.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentStudent.published ? "Published" : "Pending"}
            </div>
          </form>

          {currentStudent.published ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(true)}
            >
              Publish
            </button>
          )}

          <button className="badge badge-danger mr-2" onClick={deleteStudent}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateStudent}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Student...</p>
        </div>
      )}
    </div>
  );
};

export default Students;
