import axios from "axios";

export const api = axios.create({
    baseURL: 'https://my-games-backend.vercel.app/api',
    headers: {
      'Content-Type': 'application/json',
    }
})