import axios from "axios";

export const endPoint = axios.create({
  /**
   * Base URL
   */
  baseURL: "http://localhost:3000/api/v1",
});
