import axios from 'axios'

const url = 'http://localhost:5032/api/v1'

const axiosInstance = axios.create()
axiosInstance.defaults.baseURL = url
axiosInstance.defaults.withCredentials = true

export default axiosInstance;