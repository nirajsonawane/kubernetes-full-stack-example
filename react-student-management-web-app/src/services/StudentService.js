import http from "../http-common";

const getAll = () => {
  console.log("#############################################")
  console.log(process.env.REACT_APP_STUDENT_APP_API_URL);
  return http.get("/students");
};

const get = id => {
  return http.get(`/students/${id}`);
};

const create = data => {
  return http.post("/students", data);
};

const update = (id, data) => {

  return http.put(`/students/${id}`, data);
};

const remove = id => {
  return http.delete(`/students/${id}`);
};

const removeAll = () => {
  return http.delete(`/students`);
};

const findByFirstName = firstName => {
  return http.get(`/students?firstName=${firstName}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByFirstName: findByFirstName
};
