import React, { useState } from "react";
import TutorialDataService from "../services/StudentService";

const AddStudent = () => {
  const initialStudentState = {
    id: null,
    title: "",
    description: "",
    published: false
  };
  const [student, setStudent] = useState(initialStudentState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setStudent({ ...student, [name]: value });
  };

  const saveStudent = () => {
    var data = {
      title: student.title,
      description: student.description
    };

    TutorialDataService.create(data)
      .then(response => {
        setStudent({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          published: response.data.published
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newStudent = () => {
    setStudent(initialStudentState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newStudent}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">First Name</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={student.title}
              onChange={handleInputChange}
              name="title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={student.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <button onClick={saveStudent} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddStudent;
