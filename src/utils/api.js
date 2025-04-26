import axios from "axios";

const api = axios.create({
  baseURL: "https://flight-radar1.p.rapidapi.com",
  headers: {
    "x-rapidapi-key": "495e1d699fmshde1c47836a418bcp104d4fjsnfb5adb65e69c",
    "x-rapidapi-host": "flight-radar1.p.rapidapi.com",
  },
});
export default api;
