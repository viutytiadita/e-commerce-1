import axios from 'axios'

let ax = axios.create({
  baseURL: 'http://localhost:3002'
})

export default ax