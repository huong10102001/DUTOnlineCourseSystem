import axios, { AxiosInstance } from "axios";
import env from '../../env'

const apiClient: AxiosInstance = axios.create({
  baseURL: env.API_URL ? `${env.API_URL}` : "/api/v1",
  headers: {
    "Content-type": "application/json",
  },
});

export default apiClient;