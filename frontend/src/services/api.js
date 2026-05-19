import axios from "axios";

const API = axios.create({
  baseURL: "https://auction-backend-09hk.onrender.com/api"
});

export default API;