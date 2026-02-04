import axios from "axios";

const api = axios.create({
  baseURL: "https://to-do-app-pwpc.onrender.com/api",
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
