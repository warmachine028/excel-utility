import axios from 'axios'

const apiURL = import.meta.env.VITE_SERVER_URL
const API = axios.create({
    baseURL: apiURL,
    headers: {
        'Content-Type': 'multipart/form-data'
    },
    maxBodyLength: 50 * 1024 * 1024 // 50mb
})

export const uploadFile = (file) => API.post('/', file)

export default { uploadFile }
