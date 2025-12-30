import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8800/api",
  withCredentials: true,
});

export default api;


api.interceptors.response.use(
  (response) => response,
  (error) => {
    // console.log(error.response.data)
    if (error.response?.status === 401&&error.response?.data?.logout) {
       window.dispatchEvent(new Event("force-logout"));
    }
    return Promise.reject(error);
  }
);
