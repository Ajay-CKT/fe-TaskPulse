import axios from "axios";
import BACKEND_URL from "../utils/config";

const BASE_URL = BACKEND_URL;

const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 3000,
});

export default instance;
