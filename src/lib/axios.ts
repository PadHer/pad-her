import axios from "axios";

export const api = axios.create({
  baseURL: "/api/admin",
});

export const publicApi = axios.create({
  baseURL: "/api",
});