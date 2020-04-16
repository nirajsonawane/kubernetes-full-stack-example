import React, { useState } from "react";
import TutorialDataService from "../services/StudentService";

const AddStudent = () => {
  const initialStudentState = {
    id: null,
    firstName: "",
    lastName: ""
  };
  const [student, setStudent] = useState(initialStudentState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setStudent({ ...student, [name]: value });
  };

  const saveStudent = () => {
    var data = {
      firstName: student.firstName,
      lastName: student.lastName
    };

    TutorialDataService.create(data)
      .then(response => {
        setStudent({
          id: response.data.id,
          firstName: response.data.firstName,
          lastName: response.data.lastName
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
              id="firstName"
              required
              value={student.firstName}
              onChange={handleInputChange}
              name="firstName"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              required
              value={student.lastName}
              onChange={handleInputChange}
              name="lastName"
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
