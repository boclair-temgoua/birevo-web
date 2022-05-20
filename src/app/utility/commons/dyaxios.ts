import axios from 'axios'

const user = JSON.parse(String(localStorage.getItem(String(process.env.REACT_APP_BASE_NAME_TOKEN))))
export default axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}`,
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json',
    Authorization: `${user && user ? user : {}}`,
  },
})
