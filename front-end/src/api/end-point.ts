import axios from "axios";

export const endPoint = axios.create({
  /**
   * Base URL
   */
  // baseURL: "http://localhost:3000/api/v1",
  baseURL: "https://movie-back-end-three.vercel.app/api/v1",
});
