import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
const axiosApi = axios.create({
  baseURL: "https://note-app-backend-liart.vercel.app/api/v1",
  timeout: 9000,
  headers: { "X-Custom-Header": "foobar" },
});
// Add a request interceptor
axiosApi.interceptors.request.use(
  async function (config) {
    // Do something before request is sent
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosApi.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosApi;
// const accessToken = await AsyncStorage.getItem("token");
// if (accessToken) {
//   config.headers.Authorization = accessToken;
// }
