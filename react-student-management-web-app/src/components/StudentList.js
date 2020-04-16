import React, { useState, useEffect } from "react";
import TutorialDataService from "../services/StudentService";
import { Link } from "react-router-dom";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchFirstName, setSearchFirstName] = useState("");

  useEffect(() => {
    retrieveStudents();
  }, []);

  const onChangeSearchFirstName = e => {
    const searchTitle = e.target.value;
    setSearchFirstName(searchTitle);
  };

  const retrieveStudents = () => {
    TutorialDataService.getAll()
      .then(response => {
        setStudents(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveStudents();
    setCurrentStudent(null);
    setCurrentIndex(-1);
  };

  const setActiveStudent = (student, index) => {
    setCurrentStudent(student);
    setCurrentIndex(index);
  };

  const removeAllStudents = () => {
    TutorialDataService.removeAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByFirstName = () => {
    TutorialDataService.findByFirstName(searchFirstName)
      .then(response => {
        setStudents(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by First Name"
            value={searchFirstName}
            onChange={onChangeSearchFirstName}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByFirstName}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Student List</h4>

        <ul className="list-group">
          {students &&
            students.map((student, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveStudent(student, index)}
                key={index}
              >
                {student.firstName}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllStudents}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentStudent ? (
          <div>
            <h4>Student</h4>
            <div>
              <label>
                <strong>First Name:</strong>
              </label>{" "}
              {currentStudent.firstName}
            </div>
            <div>
              <label>
                <strong>Last Name:</strong>
              </label>{" "}
              {currentStudent.lastName}
            </div>

            <Link
              to={"/students/" + currentStudent.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Student...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentList;
