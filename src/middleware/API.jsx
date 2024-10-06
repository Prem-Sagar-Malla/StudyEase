import axios from "axios";

const API = axios.create({
  withCredentials:true,
  baseURL: "http://localhost:8080/api"
});

export default API;