// api/publicAxios.ts
import axios from "axios";

const publicAxios = axios.create({
  baseURL: "https://shortit-6b2j.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default publicAxios;
