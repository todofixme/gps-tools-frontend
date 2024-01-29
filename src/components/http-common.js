import axios from 'axios'

export default axios.create({
  // baseURL: 'http://localhost:7001',
  baseURL: 'https://gps-backend.tigerflanke.de',
  headers: {
    'Content-type': 'application/json',
  },
})
