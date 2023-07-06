import axios from "axios";

const token = localStorage.getItem("userToken");

const Axios = axios.create({
  baseURL: "http://localhost:3001/api/v1",
  headers: { Authorization: `Bearer ${token}` },
});

export default Axios;
