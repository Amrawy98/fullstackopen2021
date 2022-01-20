import axios from "axios";

const baseURL = "http://localhost:3001/persons";

const getAll = () => axios.get(baseURL).then((response) => response.data);

const create = (newObject) =>
  axios.post(baseURL, newObject).then((res) => res.data);

const update = (id, newObject) =>
  axios.put(`${baseURL}/${id}`, newObject).then((res) => res.data);

const remove = (id) => axios.delete(`${baseURL}/${id}`).then((res) => res.data);

export default {
  getAll,
  create,
  update,
  remove,
};
