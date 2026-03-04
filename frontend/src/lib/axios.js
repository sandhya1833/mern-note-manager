import axios from "axios"

const api = axios.create({
    baseURL:"https://mern-note-manager.onrender.com"
})

export default api;