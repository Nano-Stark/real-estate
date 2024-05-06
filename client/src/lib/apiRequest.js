import axios from "axios";

const apiRequest = axios.create({
  baseURL: `${process.env.REACT_API_URL}/api`,
  withCredentials: true,
});

export default apiRequest;